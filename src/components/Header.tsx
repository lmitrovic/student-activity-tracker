import rafLogo from '../assets/raf.png';

interface Props {
  subject: string;
  examName: string;
  testType: string | null;
}

export default function Header({ subject, examName, testType }: Props) {
  return (
    <header className="bg-gradient-to-r from-blue-950 to-blue-800 text-white shadow-xl">
      <div className="flex items-center pl-4 pr-6 py-5 gap-5">
        <a href="https://raf.edu.rs/" target="_blank" rel="noreferrer">
          <img src={rafLogo} alt="RAF logo" className="h-14 w-auto flex-shrink-0" />
        </a>
        <div className="w-px h-10 bg-white/25 flex-shrink-0" />
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500 text-white">UŽIVO</span>
            <h1 className="text-xl font-bold tracking-tight text-slate-300">Praćenje predaje radova</h1>
          </div>
          <p className="text-blue-300 text-sm pl-[22px]">
            {subject} &nbsp;·&nbsp; <span className="font-semibold text-blue-100">{examName}</span>
            {testType && <> &nbsp;·&nbsp; <span className="text-blue-300">{testType}</span></>}
          </p>
        </div>
      </div>
    </header>
  );
}
