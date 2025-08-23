'use client';
import { MiniCalendar, MiniCalendarDay, MiniCalendarDays, MiniCalendarNavigation } from '@/components/ui/shadcn-io/mini-calendar';
const Calendar = () => (
  <MiniCalendar onValueChange={(date) => console.log(date)}>
    <MiniCalendarNavigation direction='prev' />
    <MiniCalendarDays>{(date) => <MiniCalendarDay date={date} key={date.toISOString()} />}</MiniCalendarDays>
    <MiniCalendarNavigation direction='next' />
  </MiniCalendar>
);
export default Calendar;
