import { examConfig } from '../data/mockData';
import rafLogo from '../assets/raf.png';
import { formatTime, formatDuration } from '../utils/format';

interface Props {
  currentTime: Date;
  isOver: boolean;
  remainingMs: number;
}

export default function Header({ currentTime, isOver, remainingMs }: Props) {
  return (
    <header className="bg-gradient-to-r from-blue-950 to-blue-800 text-white shadow-xl">
      <div className="flex items-center justify-between pl-4 pr-6 py-5 gap-14">
        <a href="https://raf.edu.rs/" target="_blank" rel="noreferrer">
          <img src={rafLogo} alt="RAF logo" className="h-14 w-auto flex-shrink-0" />
        </a>
        <div className="w-px h-10 bg-white/25 flex-shrink-0" />
        <div className="flex items-start justify-between gap-4 flex-1">
          <div>
            <div className="flex items-center gap-3 mb-1">
              {!isOver ? (
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
                </span>
              ) : null}
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isOver ? 'bg-slate-600 text-slate-200' : 'bg-emerald-500 text-white'}`}>
                {isOver ? 'ZAVRŠENO' : 'UŽIVO'}
              </span>
              <h1 className="text-xl font-bold tracking-tight text-slate-300">Praćenje predaje radova</h1>
            </div>
            <p className="text-blue-300 text-sm pl-[22px]">
              {examConfig.subject} &nbsp;·&nbsp; <span className="font-semibold text-blue-100">{examConfig.examName}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-right border-l border-blue-700 pl-4">
              <div className="text-2xl font-mono font-bold tracking-widest tabular-nums">
                {formatTime(currentTime)}
              </div>
              <div className={`text-xs mt-1 font-medium ${isOver ? 'text-red-400' : 'text-blue-300'}`}>
                {isOver ? 'Ispit završen' : `Preostalo: ${formatDuration(remainingMs)}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
