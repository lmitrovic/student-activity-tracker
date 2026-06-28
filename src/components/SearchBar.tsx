import { Search } from 'lucide-react';

interface Props {
  search: string;
  onSearch: (value: string) => void;
}

export default function SearchBar({ search, onSearch }: Props) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        placeholder="Pretraži po imenu, indeksu ili grupi..."
        value={search}
        onChange={e => onSearch(e.target.value)}
        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-base sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 shadow-sm"
      />
    </div>
  );
}
