export const STORAGE_KEY = 'pwa_accounting_v1';

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) { console.error(e); }
}

export const SAMPLE = {
  columns: [
    { id: 'col-1', name: '購物清單', cards: [
      { id: 'card-1', status: 'x', date: '2025-11-20', tag: '食材', content: '鮭魚切片', amount: 5600, invoice: 0 },
      { id: 'card-2', status: 'file', date: '2025-11-18', tag: '日用品', content: '保鮮膜', amount: 120, invoice: 1 },
    ]},
    { id: 'col-2', name: '已購物', cards: [
      { id: 'card-3', status: 'package', date: '2025-11-10', tag: '食材', content: '香菇', amount: 80, invoice: 0 },
    ]},
  ],
  tags: [
    { id: 'tag-1', name: '食材', color: '#f97316' },
    { id: 'tag-2', name: '日用品', color: '#06b6d4' },
    { id: 'tag-3', name: '雜項', color: '#8b5cf6' },
  ]
};
