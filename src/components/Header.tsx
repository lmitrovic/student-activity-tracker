import rafLogo from '../assets/raf.png';

interface Props {
  subject: string;
  examName: string;
  testType: string | null;
}

export default function Header({ subject, examName, testType }: Props) {
  return (
    <header className="bg-gradient-to-r from-blue-950 to-blue-800 text-white shadow-xl">
      <div className="flex items-center gap-3 sm:gap-5 pl-3 sm:pl-4 pr-4 sm:pr-6 py-4 sm:py-5">
        <a href="https://raf.edu.rs/" target="_blank" rel="noreferrer" className="flex-shrink-0">
          <img src={rafLogo} alt="RAF logo" className="h-9 sm:h-14 w-auto" />
        </a>
        <div className="hidden sm:block w-px h-10 bg-white/25 flex-shrink-0" />
        <div className="min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 mb-0.5 sm:mb-1">
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-400" />
            </span>
            <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-500 text-white flex-shrink-0">UŽIVO</span>
            <h1 className="text-sm sm:text-xl font-bold tracking-tight text-slate-300 truncate">Praćenje predaje radova</h1>
          </div>
          <p className="text-blue-300 text-xs sm:text-sm pl-0 sm:pl-[22px] truncate">
            {subject} &nbsp;·&nbsp; <span className="font-semibold text-blue-100">{examName}</span>
            {testType && <> &nbsp;·&nbsp; <span className="text-blue-300">{testType}</span></>}
          </p>
        </div>
      </div>
    </header>
  );
}
