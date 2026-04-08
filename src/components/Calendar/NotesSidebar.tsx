import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import styles from './calendar.module.css';

interface Props {
  selectionRange: { start: Date | null; end: Date | null };
}

export default function NotesSidebar({ selectionRange }: Props) {
  const [note, setNote] = useState('');

  // Use the start date, or month name to key the notes
  const keyName = selectionRange.start 
    ? `calendar-notes-${format(selectionRange.start, 'yyyy-MM-dd')}`
    : 'calendar-notes-general';

  useEffect(() => {
    const saved = localStorage.getItem(keyName);
    setNote(saved || '');
  }, [keyName]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    localStorage.setItem(keyName, e.target.value);
  };

  return (
    <div className={styles.notesContainer}>
      <h3 className={styles.notesHeaderTitle}>Notes</h3>
      <textarea 
        className={styles.notesTextarea}
        placeholder=""
        value={note}
        onChange={handleChange}
      />
    </div>
  );
}
