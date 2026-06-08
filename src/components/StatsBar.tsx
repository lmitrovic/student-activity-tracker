import { CheckCircle2, Users, Timer } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  valueColor: string;
}

function StatCard({ icon, label, value, sub, valueColor }: StatCardProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-100">
        {icon}
      </div>
      <div>
        <div className="text-xs text-slate-400 font-medium">{label}</div>
        <div className={`text-lg font-bold leading-tight tabular-nums ${valueColor}`}>{value}</div>
        <div className="text-xs text-slate-400">{sub}</div>
      </div>
    </div>
  );
}

function formatAvg(ms: number): string {
  const totalSec = Math.round(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (min === 0) return `${sec}s`;
  return `${min}min ${sec}s`;
}

interface Props {
  submitted: number;
  total: number;
  avgMs: number | null;
}

export default function StatsBar({ submitted, total, avgMs }: Props) {
  const pct = total === 0 ? 0 : Math.round((submitted / total) * 100);
  const remaining = total - submitted;

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
          <StatCard
            icon={<CheckCircle2 className="w-5 h-5 text-blue-600" />}
            label="Predato radova"
            value={`${submitted} / ${total}`}
            sub={`${pct}% završilo`}
            valueColor="text-blue-700"
          />
          <StatCard
            icon={<Users className="w-5 h-5 text-orange-300" />}
            label="Preostalo"
            value={String(remaining)}
            sub={`student${remaining === 1 ? '' : 'a'}`}
            valueColor="text-orange-300"
          />
          <StatCard
            icon={<Timer className="w-5 h-5 text-violet-500" />}
            label="Prosečno vreme izrade"
            value={avgMs !== null ? formatAvg(avgMs) : '—'}
            sub={avgMs !== null ? `na osnovu ${submitted} predaja` : 'nema podataka'}
            valueColor="text-violet-600"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Napredak predaje</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
