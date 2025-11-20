import React, { useState } from 'react';

export default function LabelsPanel({ tags, onCreate, onUpdate, onDelete, onClose }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#f97316');

  function create(){
    if(!name.trim()) return alert('請輸入標籤名稱');
    onCreate({ id: 'tag-'+Date.now().toString(36), name: name.trim(), color });
    setName(''); setColor('#f97316');
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-96 text-black">
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg font-semibold">標籤設定</div>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input placeholder="標籤名稱" value={name} onChange={(e)=>setName(e.target.value)} className="flex-1 p-2 border rounded" />
            <input type="color" value={color} onChange={(e)=>setColor(e.target.value)} className="w-12 h-10 p-0 border rounded" />
            <button onClick={create} className="px-3 py-2 rounded bg-slate-700 text-white">新增</button>
          </div>
          <div className="space-y-2 max-h-52 overflow-auto">
            {tags.map(t=> (
              <div key={t.id} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded" style={{background: t.color}}></div>
                  <div>{t.name}</div>
                </div>
                <div className="flex gap-2">
                  <input type="color" value={t.color} onChange={(e)=>onUpdate({...t, color: e.target.value})} className="w-8 h-8 p-0 border rounded" />
                  <button onClick={()=>onDelete(t.id)} className="px-2 py-1 rounded bg-red-500 text-white">刪除</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
