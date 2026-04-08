import  { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './calendar.module.css';
import HeroImage from './HeroImage';
import MonthGrid from './MonthGrid';
import NotesSidebar from './NotesSidebar';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectionRange, setSelectionRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Generate twin-loop coils statically
  const coils = Array.from({ length: 32 }).map((_, i) => {
    // Leave a small gap in the middle for the hanger
    if (i === 15 || i === 16) return <div key={i} className={styles.coilSpacer} />;
    return (
      <div key={i} className={styles.coilGroup}>
        <div className={styles.twinLoop}></div>
        <div className={styles.twinLoop}></div>
        <div className={styles.coilHole}></div>
      </div>
    );
  });

  return (
    <div className={styles.calendarWrapper}>
      {/* Top hanger and realistic twin-loop binding */}
      <div className={styles.bindingContainer}>
        <div className={styles.wallPin}></div>
        <div className={styles.hangerWire}></div>
        <div className={styles.horizontalWire}></div>
        <div className={styles.coilsWrapper}>{coils}</div>
      </div>
      
      {/* Top Half: Image */}
      <div className={styles.heroSection}>
        <HeroImage monthIndex={currentDate.getMonth()} />
      </div>

      {/* Blue Banner */}
      <div className={styles.blueDivider}>
        {/* Placeholder spacer for Notes area on the left if we use flex/grid, or just let it text-align right */}
        <div className={styles.spacer}></div>
        <div className={styles.monthInfo}>
          <div className={styles.monthTitle}>
            <span className={styles.yearText}>{format(currentDate, 'yyyy')}</span>
            <span className={styles.monthText}>{format(currentDate, 'MMMM')}</span>
          </div>
          <div className={styles.navGroup}>
            <button className={styles.navButton} onClick={prevMonth} aria-label="Previous Month">
              <ChevronLeft size={20} />
            </button>
            <button className={styles.navButton} onClick={nextMonth} aria-label="Next Month">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Half: Notes and Grid */}
      <div className={styles.bottomSection}>
        <div className={styles.notesColumn}>
          <NotesSidebar selectionRange={selectionRange} />
        </div>
        <div className={styles.gridColumn}>
          <MonthGrid 
            currentDate={currentDate}
            selectionRange={selectionRange} 
            setSelectionRange={setSelectionRange} 
          />
        </div>
      </div>
    </div>
  );
}
