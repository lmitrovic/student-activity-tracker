import { useState, useEffect } from 'react';
import type { Submission } from './types';
import { examConfig, initialSubmissions, pendingStudents } from './data/mockData';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import SearchBar from './components/SearchBar';
import SubmissionList from './components/SubmissionList';
import FileModal from './components/FileModal';

export default function App() {
  const [submissions, setSubmissions] = useState<Submission[]>([...initialSubmissions].reverse());
  const [pending, setPending] = useState([...pendingStudents]);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Submission | null>(null);
  const [search, setSearch] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const iv = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (pending.length === 0) return;
    const delay = Math.random() * 7000 + 3000;
    const timer = setTimeout(() => {
      const [next, ...rest] = pending;
      setPending(rest);
      const submission: Submission = { ...next, submittedAt: new Date() };
      setSubmissions(prev => [submission, ...prev]);
      setNewIds(prev => new Set([...prev, submission.id]));
      setTimeout(() => {
        setNewIds(prev => { const s = new Set(prev); s.delete(submission.id); return s; });
      }, 8000);
    }, delay);
    return () => clearTimeout(timer);
  }, [pending]);

  const total = examConfig.totalStudents;
  const submitted = submissions.length;
  const lateCount = submissions.filter(s => s.isLate).length;
  const elapsedMs = currentTime.getTime() - examConfig.startedAt.getTime();
  const remainingMs = Math.max(0, examConfig.durationMinutes * 60_000 - elapsedMs);
  const isOver = remainingMs === 0;

  const filtered = submissions.filter(s =>
    s.studentName.toLowerCase().includes(search.toLowerCase()) ||
    s.indexNumber.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <Header currentTime={currentTime} isOver={isOver} remainingMs={remainingMs} />
      <StatsBar submitted={submitted} total={total} lateCount={lateCount} elapsedMs={elapsedMs} />
      <main className="max-w-5xl mx-auto px-6 py-6">
        <SearchBar
          search={search}
          onSearch={setSearch}
          totalSubmitted={submitted}
          filteredCount={filtered.length}
        />
        <SubmissionList
          submissions={filtered}
          newIds={newIds}
          pendingCount={pending.length}
          search={search}
          onViewFiles={setSelected}
        />
      </main>
      {selected && (
        <FileModal submission={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
