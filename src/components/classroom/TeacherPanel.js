'use client';

import { useState } from 'react';
import { useDataChannel, useRemoteParticipants } from '@livekit/components-react';
import styles from './TeacherPanel.module.css';

const QUESTIONS = 10;

export default function TeacherPanel() {
  const [studentAnswers, setStudentAnswers] = useState({});
  const participants = useRemoteParticipants();

  const { send } = useDataChannel('quiz', (msg) => {
    const data = JSON.parse(new TextDecoder().decode(msg.payload));
    const studentName = msg.from?.identity || 'Unknown';

    if (data.type === 'answers') {
      setStudentAnswers((prev) => ({
        ...prev,
        [studentName]: data.answers,
      }));
    }
  });

  const resetAnswers = () => {
    setStudentAnswers({});
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3>Student Answers</h3>
        <button className={styles.resetBtn} onClick={resetAnswers}>
          Reset
        </button>
      </div>

      <div className={styles.answersList}>
        {Object.keys(studentAnswers).length === 0 ? (
          <div className={styles.empty}>Menunggu jawaban...</div>
        ) : (
          Object.entries(studentAnswers).map(([name, answers]) => (
            <div key={name} className={styles.answerItem}>
              <div className={styles.studentName}>{name}</div>
              <div className={styles.grid}>
                {Array.from({ length: QUESTIONS }, (_, i) => {
                  const q = i + 1;
                  const value = answers?.[q];
                  return (
                    <div key={q} className={styles.gridCell}>
                      <span className={styles.gridLabel}>{q}</span>
                      <span className={`${styles.gridValue} ${value ? styles.gridAnswered : ''}`}>
                        {value || '–'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Students</span>
          <span className={styles.statValue}>{participants.length}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Answered</span>
          <span className={styles.statValue}>{Object.keys(studentAnswers).length}</span>
        </div>
      </div>
    </div>
  );
}
