import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Test } from '../types';
import rafLogo from '../assets/raf.png';

export default function TestSelectionPage() {
  const navigate = useNavigate();
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/test/all')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Test[]) => {
        setTests(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Nije moguće učitati testove. Proverite da li je server pokrenut.');
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('sr-RS', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <header className="bg-gradient-to-r from-blue-950 to-blue-800 text-white shadow-xl">
        <div className="flex items-center gap-5 pl-4 pr-6 py-5">
          <a href="https://raf.edu.rs/" target="_blank" rel="noreferrer">
            <img src={rafLogo} alt="RAF logo" className="h-14 w-auto flex-shrink-0" />
          </a>
          <div className="w-px h-10 bg-white/25 flex-shrink-0" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-300">Praćenje predaje radova</h1>
            <p className="text-blue-300 text-sm mt-0.5">Izaberite test koji želite da pratite</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Dostupni testovi</h2>
          <p className="text-slate-500 text-sm mb-8">Kliknite na test čije predaje želite da pratite uživo.</p>

          {loading && (
            <div className="flex items-center justify-center py-20 text-slate-500 gap-3">
              <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span className="text-sm">Učitavanje testova...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
              {error}
            </div>
          )}

          {!loading && !error && tests.length === 0 && (
            <div className="text-center py-20 text-slate-400 text-sm">
              Nema dostupnih testova.
            </div>
          )}

          {!loading && !error && tests.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {tests.map((test, i) => (
                <button
                  key={i}
                  onClick={() => navigate(`/test/${encodeURIComponent(test.testName)}`)}
                  className="text-left bg-white rounded-xl shadow-sm border border-slate-200 px-6 py-5 hover:border-blue-400 hover:shadow-md transition-all duration-150 group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
                      {test.subjectShortName}
                    </span>
                    {test.testType && (
                      <span className="text-xs text-slate-400">{test.testType}</span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-slate-800 group-hover:text-blue-700 transition-colors mb-1">
                    {test.testName}
                  </h3>
                  <p className="text-sm text-slate-500">{formatDate(test.testDate)}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-blue-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Prati ovaj test</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
