import React, { useEffect } from 'react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';
  const isWarning = toast.type === 'warning';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border backdrop-blur-md text-sm font-medium transition-all ${
        isSuccess
          ? 'bg-emerald-50 text-emerald-900 border-emerald-300 shadow-emerald-900/10'
          : isError
          ? 'bg-red-50 text-red-900 border-red-300 shadow-red-900/10'
          : 'bg-amber-50 text-amber-900 border-amber-300 shadow-amber-900/10'
      }`}>
        <span className={`material-symbols-outlined text-[20px] ${
          isSuccess ? 'text-emerald-600' : isError ? 'text-red-600' : 'text-amber-600'
        }`}>
          {isSuccess ? 'check_circle' : isError ? 'error' : 'warning'}
        </span>
        <div className="flex flex-col">
          {toast.title && <span className="font-bold text-xs">{toast.title}</span>}
          <span>{toast.message}</span>
        </div>
        <button
          onClick={onClose}
          className="ml-2 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
}
