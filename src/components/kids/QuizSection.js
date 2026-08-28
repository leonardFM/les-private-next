'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { getWhatsAppUrl } from '@/lib/constants';
import { FadeIn } from './FadeIn';
import styles from './QuizSection.module.css';

const CATEGORIES = ['animals', 'fruits', 'objects'];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizSection({
  tag,
  title,
  sub,
  startBtn,
  againBtn,
  promptTemplate,
  correctText,
  wrongText,
  scoreText,
  resultPrefix,
  resultSuffix,
  btnWA,
  msgWA,
}) {
  const [phase, setPhase] = useState('idle'); // idle | loading | playing | done | error
  const [category, setCategory] = useState('animals');
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState('');
  const [answerLocked, setAnswerLocked] = useState(false);

  const loadQuestions = useCallback(async (cat) => {
    setPhase('loading');
    setError('');
    setQuestions([]);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswerLocked(false);

    try {
      const res = await fetch(`/api/quiz/questions?category=${encodeURIComponent(cat)}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Gagal memuat soal.');
      }
      setQuestions(data.questions || []);
      setPhase('playing');
    } catch (err) {
      setError(err.message || 'Gagal memuat soal.');
      setPhase('error');
    }
  }, []);

  useEffect(() => {
    if (phase === 'playing' && answerLocked) {
      const timer = setTimeout(() => {
        if (current + 1 < questions.length) {
          setCurrent((c) => c + 1);
          setSelected(null);
          setAnswerLocked(false);
        } else {
          setPhase('done');
        }
      }, 1300);
      return () => clearTimeout(timer);
    }
  }, [phase, answerLocked, current, questions.length]);

  function handlePick(index) {
    if (answerLocked) return;
    const isCorrect = index === questions[current].correctIndex;
    if (isCorrect) setScore((s) => s + 1);
    setSelected(index);
    setAnswerLocked(true);
  }

  const question = questions[current];

  return (
    <FadeIn>
      <section className={styles.sec}>
        <div className="container">
          <div className={styles.head}>
            <span className={styles.tag}>{tag}</span>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.sub}>{sub}</p>
          </div>

          {phase === 'idle' && (
            <div className={styles.startBox}>
              <div className={styles.chips}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`${styles.chip} ${category === cat ? styles.chipActive : ''}`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <button
                className="btn btn-primary"
                style={{ padding: '14px 32px', fontSize: '16px', fontWeight: 700 }}
                onClick={() => loadQuestions(category)}
              >
                {startBtn}
              </button>
            </div>
          )}

          {phase === 'loading' && (
            <div className={styles.statusBox}>
              <div className={styles.spinner} />
              <p>Memuat soal...</p>
            </div>
          )}

          {phase === 'error' && (
            <div className={styles.statusBox}>
              <p className={styles.errorText}>{error}</p>
              <button
                className="btn btn-primary"
                onClick={() => loadQuestions(category)}
              >
                {againBtn}
              </button>
            </div>
          )}

          {phase === 'playing' && question && (
            <>
              <div className={styles.progressRow}>
                <span className={styles.counter}>
                  {current + 1}/{questions.length}
                </span>
                <span className={styles.score}>{scoreText}: {score}</span>
              </div>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${((current + (answerLocked ? 1 : 0)) / questions.length) * 100}%` }}
                />
              </div>

              <h3 className={styles.prompt}>
                {promptTemplate}{' '}
                <em>{question.promptKeyword}</em>
              </h3>

              <div className={styles.grid}>
                {question.options.map((opt, i) => {
                  let cls = styles.card;
                  if (answerLocked) {
                    if (i === question.correctIndex) cls = `${cls} ${styles.cardCorrect}`;
                    else if (i === selected) cls = `${cls} ${styles.cardWrong}`;
                    else cls = `${cls} ${styles.cardDim}`;
                  }
                  return (
                    <button
                      key={i}
                      className={cls}
                      onClick={() => handlePick(i)}
                      disabled={answerLocked}
                      aria-label={opt.keyword}
                    >
                      <span className={styles.imgWrap}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={opt.src} alt={opt.keyword} loading="lazy" />
                      </span>
                      {answerLocked && i === question.correctIndex && (
                        <span className={styles.badge}>✓</span>
                      )}
                      {answerLocked && i === selected && i !== question.correctIndex && (
                        <span className={`${styles.badge} ${styles.badgeWrong}`}>✕</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {answerLocked && (
                <p className={styles.feedback}>
                  {selected === question.correctIndex ? correctText : wrongText}
                </p>
              )}
            </>
          )}

          {phase === 'done' && (
            <div className={styles.doneBox}>
              <div className={styles.stars}>
                {Array.from({ length: 3 }, (_, i) => {
                  const threshold = questions.length * (i + 1) / 3;
                  return <span key={i} className={score >= threshold ? styles.starOn : styles.starOff}>★</span>;
                })}
              </div>
              <h3 className={styles.resultTitle}>
                {resultPrefix} {score} {resultSuffix} ({questions.length})
              </h3>
              <div className={styles.doneActions}>
                <button className="btn btn-secondary" onClick={() => setPhase('idle')}>
                  {againBtn}
                </button>
                <a
                  href={getWhatsAppUrl(msgWA)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent"
                >
                  {btnWA}
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </FadeIn>
  );
}
