import { Search, Radio } from 'lucide-react';

interface Props {
  search: string;
  onSearch: (value: string) => void;
  totalSubmitted: number;
  filteredCount: number;
}

export default function SearchBar({ search, onSearch, totalSubmitted, filteredCount }: Props) {
  return (
    <div className="flex items-center gap-3 flex-1">
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Pretraži po imenu, indeksu ili grupi..."
          value={search}
          onChange={e => onSearch(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 shadow-sm"
        />
      </div>
      {search && (
        <div className="flex items-center gap-2 text-sm text-slate-500 flex-shrink-0 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">
          <Radio className="w-4 h-4 text-blue-500" />
          <span>{filteredCount} rezultat{filteredCount === 1 ? '' : 'a'}</span>
        </div>
      )}
    </div>
  );
}
