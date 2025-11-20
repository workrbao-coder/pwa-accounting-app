# 記帳 App (PWA, Vite + React)

新增功能：
1. dnd-kit 多欄位拖放（支援欄內排序與欄間移動）
2. 標籤頁面（CRUD，含顏色選擇）
3. 改良金額輸入格式（點擊編輯輸入數字）、日期編輯（使用 HTML date input）
4. Cloudflare Pages 部署說明

## 快速開始
1. 安裝依賴：`npm install`
2. 啟動開發：`npm run dev`
3. 打包：`npm run build`

## Cloudflare Pages 部署
1. 建立 GitHub 儲存庫並把程式碼 push 上去。
2. 登入 Cloudflare → Pages → Create a project，連結你的 GitHub repository。
3. 設定 Build settings：Framework preset: **Other**, Build command: `npm run build`, Build output directory: `dist`
4. 連線後按 Deploy，Pages 會自動建立並部署。

> 注意：若要支援 Service Worker（PWA）在 Pages 上更新提示，請確認 Pages 的設定與你的 SW 檔案路徑一致（本專案使用 `/sw.js`）。

