import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildInitialCurriculum } from '../data/curriculum';
import { pointsForTask, levelForPoints, evaluateBadges } from '../data/rewards';
import { AVATARS, defaultAvatarId, avatarById, evaluateAvatarUnlocks } from '../data/avatars';
import { computeStreaks } from '../logic/streak';
import { todayStr, weekdayOfDateStr, datesInMonth } from '../logic/calendar';

const STORAGE_KEY = '@lgs_planlayici_v1';
const PlannerContext = createContext(null);

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

const STARTER_AVATARS = AVATARS.filter((a) => !a.requiredBadgeId).map((a) => ({ id: a.id, unlockedAt: null }));

const initialState = {
  loaded: false,
  gradeLevel: 8,
  yearGoal: null,
  monthGoals: [],
  tasks: [],
  recurringTasks: [],
  examResults: [],
  curriculum: [],
  badges: [],
  selectedAvatarId: defaultAvatarId(),
  unlockedAvatars: STARTER_AVATARS,
  parentPinHash: null,
};

function freshState() {
  return { ...initialState, curriculum: buildInitialCurriculum() };
}

// Eski hafta tabanlı model (weekGoals + task.weekId) kalıcı depoda varsa,
// yeni ay tabanlı modele (task.monthId) geçiş yapılır — hiçbir görev kaybolmaz,
// yalnızca bağlı olduğu haftanın üst aylık hedefine yeniden bağlanır.
function migrateLegacyWeeks(payload) {
  if (!Array.isArray(payload.weekGoals)) return payload;
  const weekById = {};
  payload.weekGoals.forEach((w) => {
    weekById[w.id] = w;
  });
  const migratedTasks = (payload.tasks || []).map((t) => {
    const { weekId, ...rest } = t;
    if (weekId == null) return { ...rest, monthId: t.monthId || null };
    const week = weekById[weekId];
    return { ...rest, monthId: week ? week.monthId : t.monthId || null };
  });
  const { weekGoals, ...restPayload } = payload;
  return { ...restPayload, tasks: migratedTasks };
}

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE': {
      if (!action.payload) return { ...freshState(), loaded: true };
      return { ...migrateLegacyWeeks(action.payload), loaded: true };
    }

    case 'SET_GRADE':
      return { ...state, gradeLevel: action.gradeLevel };

    case 'SET_YEAR_GOAL':
      return { ...state, yearGoal: { ...(state.yearGoal || {}), ...action.patch } };

    case 'ADD_MONTH_GOAL': {
      const id = action.data.id || uid('month');
      const month = { gradeLevel: state.gradeLevel, ...action.data, id };
      return { ...state, monthGoals: [...state.monthGoals, month] };
    }
    case 'UPDATE_MONTH_GOAL':
      return {
        ...state,
        monthGoals: state.monthGoals.map((m) => (m.id === action.id ? { ...m, ...action.patch } : m)),
      };
    case 'DELETE_MONTH_GOAL':
      return {
        ...state,
        monthGoals: state.monthGoals.filter((m) => m.id !== action.id),
        tasks: state.tasks.filter((t) => t.monthId !== action.id),
      };

    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: uid('task'),
            monthId: action.monthId || null,
            done: false,
            completedAt: null,
            ...action.data,
          },
        ],
      };
    case 'UPDATE_TASK':
      return { ...state, tasks: state.tasks.map((t) => (t.id === action.id ? { ...t, ...action.patch } : t)) };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.id) };
    case 'TOGGLE_TASK_DONE':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, done: !t.done, completedAt: !t.done ? todayStr() : null } : t
        ),
      };

    case 'ADD_RECURRING_TASK':
      return {
        ...state,
        recurringTasks: [...state.recurringTasks, { id: uid('recur'), active: true, ...action.data }],
      };
    case 'UPDATE_RECURRING_TASK':
      return {
        ...state,
        recurringTasks: state.recurringTasks.map((r) => (r.id === action.id ? { ...r, ...action.patch } : r)),
      };
    case 'SET_RECURRING_ACTIVE':
      return {
        ...state,
        recurringTasks: state.recurringTasks.map((r) => (r.id === action.id ? { ...r, active: action.active } : r)),
      };

    case 'ADD_EXAM_RESULT':
      return { ...state, examResults: [...state.examResults, { id: uid('exam'), ...action.data }] };
    case 'DELETE_EXAM_RESULT':
      return { ...state, examResults: state.examResults.filter((e) => e.id !== action.id) };

    case 'ADD_TOPIC':
      return {
        ...state,
        curriculum: [...state.curriculum, { id: uid('utopic'), custom: true, ...action.data }],
      };
    case 'UPDATE_TOPIC':
      return {
        ...state,
        curriculum: state.curriculum.map((t) => (t.id === action.id ? { ...t, ...action.patch } : t)),
      };
    case 'DELETE_TOPIC':
      return { ...state, curriculum: state.curriculum.filter((t) => t.id !== action.id) };

    case 'UNLOCK_BADGES':
      return { ...state, badges: [...state.badges, ...action.badges] };

    case 'UNLOCK_AVATARS':
      return { ...state, unlockedAvatars: [...state.unlockedAvatars, ...action.avatars] };
    case 'SET_AVATAR':
      return { ...state, selectedAvatarId: action.avatarId };

    case 'SET_PARENT_PIN':
      return { ...state, parentPinHash: action.hash };

    case 'RESET':
      return { ...freshState(), loaded: true };

    default:
      return state;
  }
}

export function PlannerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        dispatch({ type: 'HYDRATE', payload: raw ? JSON.parse(raw) : null });
      } catch (e) {
        dispatch({ type: 'HYDRATE', payload: null });
      }
    })();
  }, []);

  useEffect(() => {
    if (!state.loaded) return;
    const { loaded, ...persisted } = state;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(persisted)).catch(() => {});
  }, [state]);

  // Rozetleri ve avatarları türet, yeni kazanılanları kalıcı listeye ekle.
  useEffect(() => {
    if (!state.loaded) return;
    const stats = computeStats(state);
    const unlockedBadgeIds = state.badges.map((b) => b.id);
    const newlyBadges = evaluateBadges(stats, unlockedBadgeIds);
    if (newlyBadges.length > 0) {
      dispatch({ type: 'UNLOCK_BADGES', badges: newlyBadges.map((id) => ({ id, unlockedAt: todayStr() })) });
    }

    const allBadgeIds = [...unlockedBadgeIds, ...newlyBadges];
    const unlockedAvatarIds = state.unlockedAvatars.map((a) => a.id);
    const newlyAvatars = evaluateAvatarUnlocks(allBadgeIds, unlockedAvatarIds);
    if (newlyAvatars.length > 0) {
      dispatch({ type: 'UNLOCK_AVATARS', avatars: newlyAvatars.map((id) => ({ id, unlockedAt: todayStr() })) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loaded, state.tasks, state.examResults, state.curriculum]);

  // Aktif tekrarlayan görevlerden üretilmesi gerekenleri, henüz oluşturulmadıysa üret.
  // Bir aylık hedefe bağlı olan periyodik görevler, o hedefin TÜM günlerine (son
  // tekrar tarihine kadar) dağıtılır — hafta hafta görünüm, bu görevlerin
  // dueDate'lerine göre ekranda otomatik hesaplanır, ayrı bir hafta nesnesi yoktur.
  // Aya bağlı olmayanlar ise eskisi gibi yalnızca bugün için üretilir.
  useEffect(() => {
    if (!state.loaded) return;
    const today = todayStr();
    const todayWeekday = new Date().getDay();
    const existingKeys = new Set(
      state.tasks.filter((t) => t.recurringId).map((t) => `${t.recurringId}__${t.dueDate}`)
    );

    const addRecurringInstance = (r, monthId, dueDate) => {
      const key = `${r.id}__${dueDate}`;
      if (existingKeys.has(key)) return;
      existingKeys.add(key);
      dispatch({
        type: 'ADD_TASK',
        monthId,
        data: {
          title: r.title,
          subject: r.subject,
          topicId: r.topicId || null,
          estMinutes: r.estMinutes,
          recurringId: r.id,
          dueDate,
        },
      });
    };

    state.recurringTasks.forEach((r) => {
      if (!r.active) return;

      if (r.monthId) {
        const month = state.monthGoals.find((m) => m.id === r.monthId);
        if (!month || !month.year || !month.month) return;
        datesInMonth(month.year, month.month).forEach((dateStr) => {
          // Geçmiş tarihler için görev üretilmez — görev oluştuğu tarihten itibaren başlar.
          if (dateStr < today) return;
          if (r.endDate && dateStr > r.endDate) return;
          if (!r.daysOfWeek.includes(weekdayOfDateStr(dateStr))) return;
          addRecurringInstance(r, month.id, dateStr);
        });
        return;
      }

      if (!r.daysOfWeek.includes(todayWeekday)) return;
      addRecurringInstance(r, null, today);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loaded, state.recurringTasks, state.tasks, state.monthGoals]);

  const value = useMemo(() => {
    const stats = computeStats(state);
    const level = levelForPoints(stats.totalPoints);

    return {
      ...state,
      stats,
      level,
      avatar: avatarById(state.selectedAvatarId),
      unlockedAvatarIds: state.unlockedAvatars.map((a) => a.id),
      setAvatar: (avatarId) => dispatch({ type: 'SET_AVATAR', avatarId }),
      setGrade: (gradeLevel) => dispatch({ type: 'SET_GRADE', gradeLevel }),
      setYearGoal: (patch) => dispatch({ type: 'SET_YEAR_GOAL', patch }),
      addMonthGoal: (data) => dispatch({ type: 'ADD_MONTH_GOAL', data }),
      updateMonthGoal: (id, patch) => dispatch({ type: 'UPDATE_MONTH_GOAL', id, patch }),
      deleteMonthGoal: (id) => dispatch({ type: 'DELETE_MONTH_GOAL', id }),
      addTask: (monthId, data) => dispatch({ type: 'ADD_TASK', monthId, data }),
      updateTask: (id, patch) => dispatch({ type: 'UPDATE_TASK', id, patch }),
      deleteTask: (id) => dispatch({ type: 'DELETE_TASK', id }),
      toggleTaskDone: (id) => dispatch({ type: 'TOGGLE_TASK_DONE', id }),
      addRecurringTask: (data) => dispatch({ type: 'ADD_RECURRING_TASK', data }),
      updateRecurringTask: (id, patch) => dispatch({ type: 'UPDATE_RECURRING_TASK', id, patch }),
      setRecurringActive: (id, active) => dispatch({ type: 'SET_RECURRING_ACTIVE', id, active }),
      addExamResult: (data) => dispatch({ type: 'ADD_EXAM_RESULT', data }),
      deleteExamResult: (id) => dispatch({ type: 'DELETE_EXAM_RESULT', id }),
      addTopic: (data) => dispatch({ type: 'ADD_TOPIC', data }),
      updateTopic: (id, patch) => dispatch({ type: 'UPDATE_TOPIC', id, patch }),
      deleteTopic: (id) => dispatch({ type: 'DELETE_TOPIC', id }),
      setParentPinHash: (hash) => dispatch({ type: 'SET_PARENT_PIN', hash }),
      reset: () => dispatch({ type: 'RESET' }),
    };
  }, [state]);

  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>;
}

function computeStats(state) {
  const completedTasks = state.tasks.filter((t) => t.done);
  const totalPoints = completedTasks.reduce((sum, t) => sum + pointsForTask(t.estMinutes), 0);
  const { current, longest } = computeStreaks(completedTasks.map((t) => t.completedAt).filter(Boolean));
  return {
    totalTasksCompleted: completedTasks.length,
    totalPoints,
    streakCurrent: current,
    longestStreak: longest,
    examResultsCount: state.examResults.length,
    customTopicsCount: state.curriculum.filter((t) => t.custom).length,
  };
}

export function usePlanner() {
  const ctx = useContext(PlannerContext);
  if (!ctx) throw new Error('usePlanner must be used within PlannerProvider');
  return ctx;
}
