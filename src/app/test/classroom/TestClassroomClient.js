'use client';

import { useState, useCallback } from 'react';
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from '@livekit/components-react';
import '@livekit/components-styles';
import styles from './test-classroom.module.css';
import RoleSelector from '@/components/classroom/RoleSelector';
import AnswerPanel from '@/components/classroom/AnswerPanel';
import TeacherPanel from '@/components/classroom/TeacherPanel';
import FeedbackDisplay from '@/components/classroom/FeedbackDisplay';

function TeacherView() {
  return (
    <div className={styles.teacherLayout}>
      <div className={styles.videoSection}>
        <VideoConference />
      </div>
      <div className={styles.sidePanel}>
        <TeacherPanel />
      </div>
    </div>
  );
}

function StudentView({ onHandRaise, handRaised }) {
  return (
    <div className={styles.studentLayout}>
      <div className={styles.videoSection}>
        <VideoConference />
      </div>
      <div className={styles.sidePanel}>
        <AnswerPanel
          onHandRaise={onHandRaise}
          handRaised={handRaised}
        />
      </div>
      <FeedbackDisplay />
    </div>
  );
}

export default function TestClassroomClient() {
  const [role, setRole] = useState(null);
  const [roomName, setRoomName] = useState('english-classroom');
  const [participantName, setParticipantName] = useState('');
  const [token, setToken] = useState(null);
  const [wsUrl, setWsUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [handRaised, setHandRaised] = useState(false);

  const handleJoin = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/livekit/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomName,
          participantName: participantName || role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get token');
      }

      setToken(data.token);
      setWsUrl(data.wsUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [roomName, participantName, role]);

  const handleLeave = useCallback(() => {
    setToken(null);
    setWsUrl(null);
    setHandRaised(false);
  }, []);

  if (!role) {
    return <RoleSelector onSelect={setRole} />;
  }

  if (token && wsUrl) {
    return (
      <div className={styles.classroom}>
        <LiveKitRoom
          token={token}
          serverUrl={wsUrl}
          connect={true}
          onDisconnected={handleLeave}
          video={true}
          audio={true}
        >
          <div className={styles.classroomHeader}>
            <h1>Ujian Session</h1>
            <p>Room: {roomName} | Role: {role}</p>
          </div>
          <div className={styles.classroomContent}>
            {role === 'teacher' ? <TeacherView /> : (
              <StudentView onHandRaise={setHandRaised} handRaised={handRaised} />
            )}
          </div>
          <RoomAudioRenderer />
        </LiveKitRoom>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Ujian Session</h1>
          <p>{role === 'teacher' ? 'Teacher Mode' : 'Student Mode'}</p>
        </div>

        <form onSubmit={handleJoin} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="roomName">Nama Ruangan</label>
            <input
              type="text"
              id="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Masukkan nama ruangan"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="participantName">Nama Anda</label>
            <input
              type="text"
              id="participantName"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              placeholder={role === 'teacher' ? 'Nama Guru' : 'Nama Siswa'}
              required
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.backBtn}
              onClick={() => setRole(null)}
            >
              Kembali
            </button>
            <button
              type="submit"
              className={styles.button}
              disabled={isLoading || !roomName || !participantName}
            >
              {isLoading ? 'Bergabung...' : 'Masuk ke Kelas'}
            </button>
          </div>
        </form>

        <div className={styles.info}>
          <h3>Cara Menggunakan:</h3>
          <ol>
            <li>Teacher: Share screen untuk menampilkan soal PDF</li>
            <li>Student: Jawab 10 soal (A/B/C/D) satu per satu, lalu kirim</li>
            <li>Teacher: Lihat grid jawaban lengkap setiap siswa di panel</li>
            <li>Gunakan room name yang sama untuk bergabung</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
