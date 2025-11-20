// 服務工作者註冊與更新處理（PWA 強制更新提示）
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    console.log('SW registered', reg);
    function listenWaiting(worker) {
      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed') {
          // 一旦 new SW installed -> notify
          if (navigator.serviceWorker.controller) {
            // 有舊版控制中
            window.dispatchEvent(new CustomEvent('swUpdated'));
          }
        }
      });
    }
    if (reg.waiting) { listenWaiting(reg.waiting); }
    if (reg.installing) { listenWaiting(reg.installing); }
    reg.addEventListener('updatefound', () => {
      if (reg.installing) listenWaiting(reg.installing);
    });
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('controller changed');
    });
  }).catch(err => console.error('SW register failed', err));
  // 提供 UI 監聽範例：
  window.addEventListener('swUpdated', () => {
    const shouldReload = confirm('有新版本可用，是否立即重新載入？');
    if (shouldReload) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
      }
    }
  });
}
