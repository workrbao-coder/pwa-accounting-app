import React, { useState, useEffect } from 'react';

function formatCurrency(n){ if(n==null || n==='') return ''; return '$' + Number(n).toLocaleString(); }

export default function ExpenseCard({ card, tags, onChange }) {
  const [editingAmount, setEditingAmount] = useState(false);
  const [amountInput, setAmountInput] = useState(card.amount ?? '');
  const [dateInput, setDateInput] = useState(card.date || '');

  useEffect(()=> setAmountInput(card.amount ?? ''), [card.amount]);
  useEffect(()=> setDateInput(card.date || ''), [card.date]);

  function toggleStatus(){
    const states = ['x','file','package','packageCheck','check'];
    const cur = states.indexOf(card.status);
    const next = states[(cur+1)%states.length];
    onChange({ ...card, status: next });
  }

  function commitAmount(){
    const val = Number(amountInput) || 0;
    setEditingAmount(false);
    onChange({ ...card, amount: val });
  }

  function onDateChange(e){
    const v = e.target.value; // yyyy-mm-dd
    setDateInput(v);
    onChange({ ...card, date: v });
  }

  const tagObj = tags.find(t=>t.name===card.tag) || null;

  return (
    <div className="p-3 card touch-none select-none">
      <div className="flex items-center gap-2">
        <button onClick={toggleStatus} className="w-8 h-8 rounded-md bg-white/2 flex items-center justify-center">{card.status}</button>
        <div className="w-28">
          <input type="date" value={dateInput} onChange={onDateChange} className="bg-transparent w-full" />
        </div>
        <div className="flex-1">
          <input value={card.content} onChange={(e)=>onChange({...card,content:e.target.value})} className="bg-transparent w-full" maxLength={40}/>
          <div className="text-xs opacity-70 mt-1">
            {card.tag && <span className="px-2 py-0.5 rounded-full text-xs" style={{background: tagObj?.color || '#333'}}>{card.tag}</span>}
          </div>
        </div>
        <div className="w-36 text-right">
          {editingAmount ? (
            <input inputMode="numeric" type="number" value={amountInput} onChange={(e)=>setAmountInput(e.target.value)} onBlur={commitAmount} className="bg-transparent w-full text-right" />
          ) : (
            <div onClick={()=>setEditingAmount(true)} className="cursor-text">{formatCurrency(card.amount)}</div>
          )}
        </div>
      </div>
    </div>
  )
}
