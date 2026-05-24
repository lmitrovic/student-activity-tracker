import { X, Download, FileCode, FileText, FileArchive, File } from 'lucide-react';
import type { Submission, FileExt, SubmittedFile } from '../types';

const extStyle: Record<FileExt, { label: string; cls: string }> = {
  py:   { label: '.py',   cls: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  java: { label: '.java', cls: 'bg-orange-100 text-orange-700 border-orange-200' },
  cpp:  { label: '.cpp',  cls: 'bg-blue-100 text-blue-700 border-blue-200' },
  pdf:  { label: '.pdf',  cls: 'bg-red-100 text-red-700 border-red-200' },
  zip:  { label: '.zip',  cls: 'bg-purple-100 text-purple-700 border-purple-200' },
  txt:  { label: '.txt',  cls: 'bg-gray-100 text-gray-600 border-gray-200' },
};

function FileIcon({ ext }: { ext: FileExt }) {
  const cls = 'w-5 h-5 flex-shrink-0';
  if (ext === 'py' || ext === 'java' || ext === 'cpp') return <FileCode className={cls} />;
  if (ext === 'zip') return <FileArchive className={cls} />;
  if (ext === 'txt') return <FileText className={cls} />;
  return <File className={cls} />;
}

function downloadFile(file: SubmittedFile) {
  const content = `# ${file.name}\n# Simulirani sadržaj fajla za potrebe demonstracije.\n# Veličina: ${file.sizeKb} KB\n`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  a.click();
  URL.revokeObjectURL(url);
}

function formatDateTime(date: Date) {
  return date.toLocaleString('sr-RS', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
}

interface Props {
  submission: Submission;
  onClose: () => void;
}

export default function FileModal({ submission, onClose }: Props) {
  const totalSize = submission.files.reduce((sum, f) => sum + f.sizeKb, 0);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight">{submission.studentName}</h2>
              <p className="text-blue-200 font-mono text-sm mt-1">{submission.indexNumber}</p>
              <p className="text-blue-300 text-xs mt-2">{submission.email}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs bg-white/15 text-white px-2 py-0.5 rounded">
                  Predato: {formatDateTime(submission.submittedAt)}
                </span>
                {submission.isLate && (
                  <span className="text-xs bg-red-500/80 text-white px-2 py-0.5 rounded font-semibold">
                    KASNO
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-blue-200 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Summary row */}
        <div className="px-6 py-3 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
          <span className="text-sm font-medium text-blue-800">
            {submission.files.length} {submission.files.length === 1 ? 'predati fajl' : 'predatih fajlova'}
          </span>
          <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
            Ukupno {totalSize.toFixed(1)} KB
          </span>
        </div>

        {/* File list */}
        <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
          {submission.files.map(file => {
            const style = extStyle[file.ext] ?? extStyle.txt;
            return (
              <div key={file.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors group">
                <FileIcon ext={file.ext} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800 truncate">{file.name}</span>
                    <span className={`text-xs font-mono font-semibold px-1.5 py-0.5 rounded border flex-shrink-0 ${style.cls}`}>
                      {style.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{file.sizeKb} KB</p>
                </div>
                <button
                  onClick={() => downloadFile(file)}
                  className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-white hover:bg-blue-600 px-3 py-1.5 rounded-lg border border-blue-200 hover:border-blue-600 transition-all font-medium opacity-0 group-hover:opacity-100"
                >
                  <Download className="w-3.5 h-3.5" />
                  Preuzmi
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={() => submission.files.forEach(downloadFile)}
            className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Preuzmi sve fajlove ({submission.files.length})
          </button>
        </div>
      </div>
    </div>
  );
}
