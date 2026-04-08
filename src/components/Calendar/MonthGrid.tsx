import React, { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays,
  isAfter,
  isBefore
} from 'date-fns';
import styles from './calendar.module.css';

interface SelectionRange {
  start: Date | null;
  end: Date | null;
}

interface Props {
  currentDate: Date;
  selectionRange: SelectionRange;
  setSelectionRange: React.Dispatch<React.SetStateAction<SelectionRange>>;
}

export default function MonthGrid({ currentDate, selectionRange, setSelectionRange }: Props) {
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const handleDateClick = (day: Date) => {
    if (!selectionRange.start || (selectionRange.start && selectionRange.end)) {
      setSelectionRange({ start: day, end: null });
    } else {
      if (isBefore(day, selectionRange.start)) {
        setSelectionRange({ start: day, end: selectionRange.start });
      } else {
        setSelectionRange({ ...selectionRange, end: day });
      }
    }
  };

  const getDaysInMonth = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, new Date());
        let classNames = `${styles.dayCell} ${!isCurrentMonth ? styles.empty : ''} ${isToday ? styles.today : ''}`;

        if (isCurrentMonth) {
          const isStart = selectionRange.start && isSameDay(day, selectionRange.start);
          const isEnd = selectionRange.end && isSameDay(day, selectionRange.end);
          
          if (isStart) classNames += ` ${styles.selectedStart}`;
          if (isEnd) classNames += ` ${styles.selectedEnd}`;
          
          if (selectionRange.start && selectionRange.end) {
            if (isAfter(day, selectionRange.start) && isBefore(day, selectionRange.end)) {
              classNames += ` ${styles.inRange}`;
            }
          } else if (selectionRange.start && hoverDate && !selectionRange.end) {
             const rangeStart = isBefore(hoverDate, selectionRange.start) ? hoverDate : selectionRange.start;
             const rangeEnd = isBefore(hoverDate, selectionRange.start) ? selectionRange.start : hoverDate;
             if ((isAfter(day, rangeStart) && isBefore(day, rangeEnd)) || isSameDay(day, rangeEnd) || isSameDay(day, rangeStart)) {
                if(!isStart) classNames += ` ${styles.inRangeHover}`;
             }
          }
        }

        days.push(
          <div
            key={day.toString()}
            className={classNames}
            onClick={() => isCurrentMonth ? handleDateClick(cloneDay) : undefined}
            onMouseEnter={() => isCurrentMonth ? setHoverDate(cloneDay) : undefined}
            onMouseLeave={() => isCurrentMonth ? setHoverDate(null) : undefined}
          >
            {isCurrentMonth ? formattedDate : ''}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<React.Fragment key={day.toString()}>{days}</React.Fragment>);
      days = [];
    }
    return rows;
  };

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className={styles.mainGrid}>
      <div className={styles.daysHeader}>
        {daysOfWeek.map(dayText => (
          <div key={dayText} className={dayText === 'SAT' || dayText === 'SUN' ? styles.weekendHeader : ''}>
            {dayText}
          </div>
        ))}
      </div>
      
      <div className={styles.daysGrid}>
        {getDaysInMonth()}
      </div>
    </div>
  );
}
