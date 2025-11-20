import React from 'react';

export default function Header({ onAddColumn, onOpenLabels }) {
  return (
    <header className="flex items-center justify-between p-3 h-16 card">
      <div className="flex items-center gap-3">
        <div className="text-lg font-semibold">記帳本 <span className="text-xs ml-2 opacity-60">v1.0.1</span></div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={onAddColumn} title="新增欄位" className="p-2 rounded-md hover:bg-white/5">＋</button>
        <button onClick={onOpenLabels} title="標籤管理" className="p-2 rounded-md hover:bg-white/5">🏷️</button>
        <button title="回復欄位" className="p-2 rounded-md hover:bg-white/5">⟲</button>
        <button title="設定" className="p-2 rounded-md hover:bg-white/5">⚙️</button>
      </div>
    </header>
  )
}
