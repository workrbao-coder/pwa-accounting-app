import React from 'react'
import ExpenseCard from './ExpenseCard'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

function SortableCard({ card, tags, onUpdateCard }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ExpenseCard card={card} tags={tags} onChange={onUpdateCard} />
    </div>
  )
}

export default function Column({ column, onAddCard, onUpdateCard, tags }) {
  const total = column.cards.reduce((s,c)=>s + (Number(c.amount)||0),0);
  return (
    <div className="h-full w-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold">{column.name}</div>
        <div className="flex gap-2">
          <button onClick={() => onAddCard(column.id)} title="新增卡片" className="p-2 rounded-md hover:bg-white/5">＋</button>
          <button title="刪除欄位" className="p-2 rounded-md hover:bg-white/5">🗑</button>
        </div>
      </div>
      <div className="flex-1 overflow-auto space-y-3 pr-2">
        {column.cards.map(card => (
          <SortableCard key={card.id} card={card} tags={tags} onUpdateCard={(c)=>onUpdateCard(column.id, c)} />
        ))}
      </div>
      <div className="mt-3 text-right">總額：${total.toLocaleString()}</div>
    </div>
  )
}
