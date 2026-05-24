import { FileText, Clock, Mail } from 'lucide-react';
import type { Submission } from '../types';

const avatarColors = [
  'bg-blue-500', 'bg-blue-600', 'bg-blue-700',
  'bg-indigo-500', 'bg-indigo-600',
  'bg-sky-500', 'bg-sky-600',
  'bg-cyan-600', 'bg-teal-600',
];

function getAvatarColor(id: string) {
  const n = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return avatarColors[n % avatarColors.length];
}

function getInitials(name: string) {
  return name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function timeSince(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return `pre ${diff}s`;
  if (diff < 3600) return `pre ${Math.floor(diff / 60)}min`;
  return `pre ${Math.floor(diff / 3600)}h`;
}

interface Props {
  submission: Submission;
  isNew: boolean;
  onViewFiles: () => void;
}

export default function SubmissionCard({ submission, isNew, onViewFiles }: Props) {
  const fileCount = submission.files.length;
  const fileLabel = fileCount === 1 ? 'fajl' : fileCount < 5 ? 'fajla' : 'fajlova';

  return (
    <div
      className={`bg-white rounded-xl border px-5 py-4 flex items-center gap-4 transition-shadow duration-200 ${
        isNew
          ? 'border-blue-300 shadow-lg shadow-blue-100 highlight-new'
          : 'border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200'
      }`}
    >
      {/* Avatar */}
      <div className={`w-11 h-11 rounded-full ${getAvatarColor(submission.id)} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 select-none`}>
        {getInitials(submission.studentName)}
      </div>

      {/* Student info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-gray-900 text-sm">{submission.studentName}</span>
          <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100">
            {submission.indexNumber}
          </span>
          {submission.isLate && (
            <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-md">
              KASNO
            </span>
          )}
          {isNew && (
            <span className="text-xs font-bold bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-md animate-pulse">
              NOVO
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1.5">
          <Mail className="w-3 h-3" />
          <span className="truncate">{submission.email}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
          <FileText className="w-3 h-3" />
          <span>{fileCount} {fileLabel}</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-col items-end gap-2.5 flex-shrink-0">
        <div className="text-right">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            {formatTime(submission.submittedAt)}
          </div>
          <div className="text-xs text-gray-400 mt-0.5 text-right">{timeSince(submission.submittedAt)}</div>
        </div>
        <button
          onClick={onViewFiles}
          className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg transition-colors font-medium"
        >
          <FileText className="w-3.5 h-3.5" />
          Pogledaj fajlove
        </button>
      </div>
    </div>
  );
}
