import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Loader2 } from 'lucide-react';
import JSZip from 'jszip';
import type { Submission, Test } from '../types';
import Header from './Header';
import StatsBar from './StatsBar';
import SearchBar from './SearchBar';
import SubmissionList from './SubmissionList';

export default function TestPage() {
  const { testName } = useParams<{ testName: string }>();
  const navigate = useNavigate();
  const [test, setTest] = useState<Test | null>(null);
  const [allStudents, setAllStudents] = useState<Submission[]>([]);
  const [now, setNow] = useState(Date.now());
  const [search, setSearch] = useState('');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!testName) return;
    fetch('/api/test/all')
      .then(res => res.json())
      .then((data: Test[]) => {
        const found = data.find(t => t.testName === decodeURIComponent(testName));
        if (!found) navigate('/');
        else setTest(found);
      })
      .catch(() => navigate('/'));
  }, [testName, navigate]);

  useEffect(() => {
    if (!testName) return;

    const poll = async () => {
      try {
        const res = await fetch(`/api/student/submission/allfortest?testName=${encodeURIComponent(decodeURIComponent(testName))}`);
        if (!res.ok) return;
        const data: Submission[] = await res.json();
        setAllStudents(data);
      } catch {
        // silently ignore poll errors
      }
    };

    poll();
    const pollIv = setInterval(poll, 5000);
    const nowIv = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      clearInterval(pollIv);
      clearInterval(nowIv);
    };
  }, [testName]);

  if (!test) return null;

  const submitted = allStudents
    .filter(s => s.taskSubmitted)
    .sort((a, b) => new Date(b.taskSubmittedTime!).getTime() - new Date(a.taskSubmittedTime!).getTime());
  const total = allStudents.length;
  const pendingCount = allStudents.filter(s => !s.taskSubmitted).length;

  const avgMs = (() => {
    const valid = submitted.filter(s => s.taskStartedTime && s.taskSubmittedTime);
    if (valid.length === 0) return null;
    const sum = valid.reduce((acc, s) =>
      acc + (new Date(s.taskSubmittedTime!).getTime() - new Date(s.taskStartedTime).getTime()), 0);
    return sum / valid.length;
  })();

  const downloadAll = async () => {
    if (downloading || submitted.length === 0) return;
    setDownloading(true);
    try {
      const zip = new JSZip();
      await Promise.all(
        submitted.map(async (s) => {
          const res = await fetch(`/api/project/download/studentassignment/${s.id}`);
          if (!res.ok) return;
          const blob = await res.blob();
          const disposition = res.headers.get('Content-Disposition') ?? '';
          const match = disposition.match(/filename[^;=\n]*=(?:(['"])(?<q>[^'"]*)\1|(?<bare>[^;\n]*))/);
          const serverName = match?.groups?.q ?? match?.groups?.bare?.trim() ?? '';
          const ext = serverName ? serverName.slice(serverName.lastIndexOf('.')) : '';
          const fileName = `${s.lastName}_${s.firstName}_${s.studyProgramShort}${s.indexNumber}-${s.startYear}_(${s.studentGroup})_${s.groupLabel}${ext}`;
          zip.folder(s.groupLabel)!.file(fileName, blob);
        })
      );
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(zipBlob);
      a.download = `${test!.testName}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    } finally {
      setDownloading(false);
    }
  };

  const q = search.toLowerCase();
  const filtered = submitted.filter(s =>
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
    `${s.studyProgramShort}${s.indexNumber}/${s.startYear}`.toLowerCase().includes(q) ||
    s.studentGroup.toLowerCase().includes(q)
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <Header
        subject={test.subjectShortName}
        examName={test.testName}
        testType={test.testType}
      />
      <StatsBar submitted={submitted.length} total={total} avgMs={avgMs} />
      <main className="max-w-5xl mx-auto px-6 py-6">
        <div className="flex gap-3 mb-5">
          <SearchBar
            search={search}
            onSearch={setSearch}
            totalSubmitted={submitted.length}
            filteredCount={filtered.length}
          />
          <button
            onClick={downloadAll}
            disabled={submitted.length === 0 || downloading}
            className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl transition-colors font-medium flex-shrink-0 shadow-sm"
          >
            {downloading
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <Download className="w-4 h-4" />}
            {downloading ? 'Preuzimanje...' : `Preuzmi sve (${submitted.length})`}
          </button>
        </div>
        <SubmissionList
          submissions={filtered}
          now={now}
          pendingCount={pendingCount}
          search={search}
        />
      </main>
    </div>
  );
}
