import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Column from './components/Column'
import LabelsPanel from './components/LabelsPanel'
import { loadData, saveData, SAMPLE } from './utils/storage'
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export default function App(){
  const [data, setData] = useState(() => loadData() || SAMPLE);
  const [showLabels, setShowLabels] = useState(false);

  useEffect(()=> saveData(data), [data]);

  function addColumn(){
    const id = 'col-' + Date.now().toString(36);
    const col = { id, name: '新欄位', cards: [] };
    setData(d => ({ ...d, columns: [col, ...d.columns] }));
  }

  function addCard(columnId){
    setData(d => {
      const cols = d.columns.map(c=> c.id===columnId ? { ...c, cards: [{ id: 'card-'+Date.now().toString(36), status:'x', date:new Date().toISOString().slice(0,10), tag:'', content:'', amount:0, invoice:0 }, ...c.cards] } : c );
      return { ...d, columns: cols };
    });
  }

  function updateCard(columnId, card){
    setData(d => {
      const cols = d.columns.map(c=> c.id===columnId ? { ...c, cards: c.cards.map(x => x.id===card.id ? card : x) } : c );
      return { ...d, columns: cols };
    });
  }

  // Labels CRUD
  function createTag(tag){
    setData(d => ({ ...d, tags: [tag, ...(d.tags||[])] }));
  }
  function updateTag(tag){
    setData(d => ({ ...d, tags: d.tags.map(t=> t.id===tag.id ? tag : t) }));
  }
  function deleteTag(tagId){
    setData(d => ({ ...d, tags: d.tags.filter(t=> t.id!==tagId) }));
  }

  // DnD Kit handlers for simple intra-column reorder only (keeps implementation stable)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  function onDragEnd(event){
    const { active, over } = event;
    if(!over) return;
    // active.id and over.id are card ids — find column & index
    const find = (id) => {
      for(const col of data.columns){
        const idx = col.cards.findIndex(c=>c.id===id);
        if(idx>-1) return { colId: col.id, idx, col };
      }
      return null;
    }
    const activePos = find(active.id);
    const overPos = find(over.id);

    if(activePos && overPos && activePos.colId === overPos.colId){
      // reorder within same column
      setData(d => {
        const cols = d.columns.map(c => {
          if(c.id !== activePos.colId) return c;
          const newCards = arrayMove(c.cards, activePos.idx, overPos.idx);
          return { ...c, cards: newCards };
        });
        return { ...d, columns: cols };
      });
    } else if(activePos && overPos && activePos.colId !== overPos.colId){
      // move between columns: remove from active, insert at over index
      setData(d => {
        const cols = d.columns.map(c => {
          if(c.id === activePos.colId){
            const newCards = c.cards.filter(x=>x.id !== active.id);
            return { ...c, cards: newCards };
          }
          if(c.id === overPos.colId){
            const newCards = [...c.cards.slice(0, overPos.idx), d.columns.find(z=>z.id===activePos.colId).cards[activePos.idx], ...c.cards.slice(overPos.idx)];
            return { ...c, cards: newCards };
          }
          return c;
        });
        return { ...d, columns: cols };
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onAddColumn={addColumn} onOpenLabels={()=>setShowLabels(true)} />
      <main className="flex-1 p-3">
        <div className="h-[80vh]">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <Swiper slidesPerView={1.05} spaceBetween={12} centeredSlides={true}>
              {data.columns.map(col => (
                <SwiperSlide key={col.id}>
                  <div className="h-full w-full rounded-xl p-1 card">
                    <SortableContext items={col.cards.map(c=>c.id)} strategy={verticalListSortingStrategy}>
                      <Column column={col} onAddCard={addCard} onUpdateCard={updateCard} tags={data.tags||[]} />
                    </SortableContext>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </DndContext>
        </div>
      </main>
      {showLabels && <LabelsPanel tags={data.tags||[]} onCreate={createTag} onUpdate={updateTag} onDelete={deleteTag} onClose={()=>setShowLabels(false)} />}
    </div>
  )
}
