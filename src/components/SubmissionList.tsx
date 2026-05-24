import { Search } from 'lucide-react';
import type { Submission } from '../types';
import SubmissionCard from './SubmissionCard';

interface Props {
  submissions: Submission[];
  newIds: Set<string>;
  pendingCount: number;
  search: string;
  onViewFiles: (s: Submission) => void;
}

export default function SubmissionList({ submissions, newIds, pendingCount, search, onViewFiles }: Props) {
  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-400">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
          <Search className="w-7 h-7" />
        </div>
        <p className="text-base font-medium text-slate-500">
          {search ? 'Nema rezultata za traženi pojam' : 'Čeka se predaja radova...'}
        </p>
        <p className="text-sm mt-1">
          {search
            ? `Proverite pravopis za "${search}"`
            : 'Novo predati radovi pojaviće se ovde automatski'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {submissions.map(s => (
          <SubmissionCard
            key={s.id}
            submission={s}
            isNew={newIds.has(s.id)}
            onViewFiles={() => onViewFiles(s)}
          />
        ))}
      </div>

      {pendingCount > 0 && !search && (
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
          </span>
          Čeka se {pendingCount} {pendingCount === 1 ? 'student' : 'studenata'}...
        </div>
      )}
    </>
  );
}
