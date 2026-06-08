import { Clock, Users, Download } from 'lucide-react';
import type { Submission } from '../types';

const avatarColors = [
  'bg-blue-500', 'bg-blue-600', 'bg-blue-700',
  'bg-indigo-500', 'bg-indigo-600',
  'bg-sky-500', 'bg-sky-600',
  'bg-cyan-600', 'bg-teal-600',
];

function getAvatarColor(id: number) {
  return avatarColors[id % avatarColors.length];
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function timeSince(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return `pre ${diff}s`;
  if (diff < 3600) return `pre ${Math.floor(diff / 60)}min`;
  return `pre ${Math.floor(diff / 3600)}h`;
}

interface Props {
  submission: Submission;
  isNew: boolean;
}

export default function SubmissionCard({ submission, isNew }: Props) {
  const fullName = `${submission.firstName} ${submission.lastName}`;
  const formattedIndex = `${submission.studyProgramShort}${submission.indexNumber}/${submission.startYear}`;

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
        {getInitials(submission.firstName, submission.lastName)}
      </div>

      {/* Student info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-gray-900 text-sm">{fullName}</span>
          <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100">
            {formattedIndex}
          </span>
          {isNew && (
            <span className="text-xs font-bold bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-md animate-pulse">
              NOVO
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1.5">
          <Users className="w-3 h-3" />
          <span>Grupa {submission.studentGroup} &nbsp;·&nbsp; {submission.term} &nbsp;·&nbsp; {submission.groupLabel}</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-col items-end gap-2.5 flex-shrink-0">
        {submission.taskSubmittedTime && (
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              {formatTime(submission.taskSubmittedTime)}
            </div>
            <div className="text-xs text-gray-400 mt-0.5 text-right">{timeSince(submission.taskSubmittedTime)}</div>
          </div>
        )}
        <a
          href={`/api/project/download/studentassignment/${submission.id}`}
          download
          className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg transition-colors font-medium"
        >
          <Download className="w-3.5 h-3.5" />
          Preuzmi rad
        </a>
      </div>
    </div>
  );
}
