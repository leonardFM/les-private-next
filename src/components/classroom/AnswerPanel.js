'use client';

import { useState } from 'react';
import { useDataChannel, useLocalParticipant } from '@livekit/components-react';
import styles from './AnswerPanel.module.css';

const ANSWERS = ['A', 'B', 'C', 'D'];
const TOTAL_QUESTIONS = 10;

export default function AnswerPanel({ onHandRaise, handRaised, onAnswerSelected }) {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { localParticipant } = useLocalParticipant();

  const { send } = useDataChannel('quiz', (msg) => {
    const data = JSON.parse(new TextDecoder().decode(msg.payload));
    if (data.type === 'feedback') {
      // Handle feedback from teacher
    }
  });

  const handleAnswer = (answerId) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: answerId }));
  };

  const handleNext = () => {
    if (currentQuestion < TOTAL_QUESTIONS) {
      setCurrentQuestion((q) => q + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((q) => q - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const payload = new TextEncoder().encode(
        JSON.stringify({ type: 'answers', answers })
      );
      await send(payload, { reliable: true });
      onAnswerSelected?.(answers);
    } catch (error) {
      console.error('Error sending answers:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHandRaise = async () => {
    const newState = !handRaised;
    await localParticipant.setAttributes({ handRaised: String(newState) });
    onHandRaise?.(newState);
  };

  const isLast = currentQuestion === TOTAL_QUESTIONS;
  const selectedAnswer = answers[currentQuestion];

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3>Soal {currentQuestion}/{TOTAL_QUESTIONS}</h3>
        <div className={styles.progress}>
          {Array.from({ length: TOTAL_QUESTIONS }, (_, i) => (
            <span
              key={i + 1}
              className={`${styles.progressDot} ${i + 1 <= currentQuestion ? styles.progressDone : ''}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.answers}>
        {ANSWERS.map((answer) => (
          <button
            key={answer}
            className={`${styles.answerBtn} ${selectedAnswer === answer ? styles.selected : ''}`}
            onClick={() => handleAnswer(answer)}
          >
            <span className={styles.answerLabel}>{answer}</span>
          </button>
        ))}
      </div>

      <div className={styles.navigation}>
        <button
          className={styles.navBtn}
          onClick={handlePrev}
          disabled={currentQuestion === 1}
        >
          ← Kembali
        </button>
        {isLast ? (
          <button
            className={`${styles.navBtn} ${styles.submitBtn}`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Jawaban'}
          </button>
        ) : (
          <button className={styles.navBtn} onClick={handleNext}>
            Lanjut →
          </button>
        )}
      </div>

      <button
        className={`${styles.handBtn} ${handRaised ? styles.raised : ''}`}
        onClick={handleHandRaise}
      >
        {handRaised ? '✋ Angkat Tangan' : '✋ Turunkan Tangan'}
      </button>

      {isLast && (
        <div className={styles.status}>
          {Object.keys(answers).length} dari {TOTAL_QUESTIONS} soal terjawab
        </div>
      )}
    </div>
  );
}
