import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { usePlanner } from '../state/PlannerContext';
import { colors, subjectColor } from '../theme';
import { pointsForTask } from '../data/rewards';
import { Card, SectionTitle, Chip, GhostButton, EmptyState } from '../components/common';
import {
  todayStr,
  addDays,
  mondayOf,
  weekDates,
  formatDayLabel,
  formatMonthLabel,
  buildMonthGrid,
} from '../logic/calendar';

const VIEW = { WEEK: 'week', MONTH: 'month' };
const WEEKDAY_INITIAL = ['P', 'P', 'S', 'Ç', 'P', 'C', 'C'];

export default function CalendarScreen() {
  const planner = usePlanner();
  const today = todayStr();
  const [view, setView] = useState(VIEW.WEEK);
  const [weekStart, setWeekStart] = useState(mondayOf(today));
  const [monthCursor, setMonthCursor] = useState({ year: Number(today.slice(0, 4)), month: Number(today.slice(5, 7)) });
  const [selectedDate, setSelectedDate] = useState(today);

  const tasksByDate = useMemo(() => {
    const map = {};
    planner.tasks.forEach((t) => {
      if (!t.dueDate) return;
      if (!map[t.dueDate]) map[t.dueDate] = [];
      map[t.dueDate].push(t);
    });
    return map;
  }, [planner.tasks]);

  const shiftMonth = (delta) => {
    let { year, month } = monthCursor;
    month += delta;
    if (month > 12) {
      month = 1;
      year += 1;
    } else if (month < 1) {
      month = 12;
      year -= 1;
    }
    setMonthCursor({ year, month });
  };

  const renderDayTasks = (dateStr) => {
    const dayTasks = tasksByDate[dateStr] || [];
    if (dayTasks.length === 0) return <EmptyState text="Bu gün için görev yok." />;
    return dayTasks.map((task) => (
      <Card key={task.id} style={styles.taskCard}>
        <View style={styles.taskRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.taskTitle, task.done && styles.doneText]}>{task.title}</Text>
            <View style={styles.chipRow}>
              <Chip label={task.subject} color={subjectColor(task.subject)} />
              <Text style={styles.mutedText}>
                {task.estMinutes} dk · +{pointsForTask(task.estMinutes)} puan
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => planner.toggleTaskDone(task.id)}>
            <Text style={styles.toggleText}>{task.done ? 'geri al' : 'tamamla'}</Text>
          </TouchableOpacity>
        </View>
      </Card>
    ));
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.viewToggleRow}>
        <TouchableOpacity
          style={[styles.viewBtn, view === VIEW.WEEK && styles.viewBtnActive]}
          onPress={() => setView(VIEW.WEEK)}
        >
          <Text style={[styles.viewBtnText, view === VIEW.WEEK && styles.viewBtnTextActive]}>Haftalık</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewBtn, view === VIEW.MONTH && styles.viewBtnActive]}
          onPress={() => setView(VIEW.MONTH)}
        >
          <Text style={[styles.viewBtnText, view === VIEW.MONTH && styles.viewBtnTextActive]}>Aylık</Text>
        </TouchableOpacity>
      </View>

      {view === VIEW.WEEK ? (
        <>
          <View style={styles.navRow}>
            <GhostButton label="‹ Önceki hafta" onPress={() => setWeekStart(addDays(weekStart, -7))} />
            <GhostButton label="Sonraki hafta ›" onPress={() => setWeekStart(addDays(weekStart, 7))} />
          </View>
          {weekDates(weekStart).map((dateStr) => {
            const count = (tasksByDate[dateStr] || []).length;
            const isToday = dateStr === today;
            return (
              <Card key={dateStr} style={isToday && styles.todayCard}>
                <View style={styles.dayHeaderRow}>
                  <Text style={[styles.dayLabel, isToday && styles.todayLabel]}>
                    {formatDayLabel(dateStr)}
                    {isToday ? ' · bugün' : ''}
                  </Text>
                  <Text style={styles.mutedText}>{count} görev</Text>
                </View>
                {renderDayTasks(dateStr)}
              </Card>
            );
          })}
        </>
      ) : (
        <>
          <View style={styles.navRow}>
            <GhostButton label="‹" onPress={() => shiftMonth(-1)} />
            <Text style={styles.monthLabel}>{formatMonthLabel(monthCursor.year, monthCursor.month)}</Text>
            <GhostButton label="›" onPress={() => shiftMonth(1)} />
          </View>

          <View style={styles.weekdayHeaderRow}>
            {WEEKDAY_INITIAL.map((w, i) => (
              <Text key={i} style={styles.weekdayHeaderText}>{w}</Text>
            ))}
          </View>

          {buildMonthGrid(monthCursor.year, monthCursor.month).map((week, wi) => (
            <View key={wi} style={styles.gridRow}>
              {week.map((dateStr, di) => {
                const dayTasks = dateStr ? tasksByDate[dateStr] || [] : [];
                const isSelected = dateStr === selectedDate;
                const isToday = dateStr === today;
                return (
                  <TouchableOpacity
                    key={di}
                    disabled={!dateStr}
                    style={[styles.gridCell, isSelected && styles.gridCellSelected, isToday && styles.gridCellToday]}
                    onPress={() => dateStr && setSelectedDate(dateStr)}
                  >
                    {!!dateStr && (
                      <>
                        <Text style={styles.gridDayNum}>{Number(dateStr.slice(8, 10))}</Text>
                        <View style={styles.dotRow}>
                          {dayTasks.slice(0, 3).map((t) => (
                            <View key={t.id} style={[styles.dot, { backgroundColor: subjectColor(t.subject) }]} />
                          ))}
                        </View>
                      </>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          <SectionTitle>{formatDayLabel(selectedDate)}</SectionTitle>
          {renderDayTasks(selectedDate)}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  viewToggleRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  viewBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  viewBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  viewBtnText: { color: colors.text, fontWeight: '700', fontSize: 13 },
  viewBtnTextActive: { color: '#0f172a' },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  monthLabel: { color: colors.text, fontSize: 15, fontWeight: '700' },
  dayHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  dayLabel: { color: colors.text, fontSize: 14, fontWeight: '700' },
  todayCard: { borderColor: colors.pink },
  todayLabel: { color: colors.pink },
  taskCard: { marginBottom: 8, backgroundColor: colors.surfaceAlt },
  taskRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  taskTitle: { color: colors.text, fontSize: 13, fontWeight: '600', marginBottom: 4 },
  doneText: { textDecorationLine: 'line-through', color: colors.textMuted },
  chipRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  mutedText: { color: colors.textMuted, fontSize: 11 },
  toggleText: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  weekdayHeaderRow: { flexDirection: 'row', marginBottom: 4 },
  weekdayHeaderText: { flex: 1, textAlign: 'center', color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  gridRow: { flexDirection: 'row', marginBottom: 4, gap: 4 },
  gridCell: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  gridCellSelected: { borderColor: colors.primary, borderWidth: 2 },
  gridCellToday: { backgroundColor: colors.surfaceAlt },
  gridDayNum: { color: colors.text, fontSize: 12, fontWeight: '700' },
  dotRow: { flexDirection: 'row', gap: 2, marginTop: 2, height: 6 },
  dot: { width: 5, height: 5, borderRadius: 2.5 },
});
