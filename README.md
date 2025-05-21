# vTaiwan 新官網

這是 vTaiwan 的新版官方網站專案，使用 Astro 框架開發。

## 系統需求

- Node.js 18.0.0 或更新版本
- npm 套件管理器

## 本地開發環境設置

1. 複製專案到本地
```bash
git clone https://github.com/vtaiwan/vtaiwan-neo.git
cd vtaiwan-neo
```

2. 安裝依賴套件
```bash
npm install
```

3. 啟動開發伺服器
```bash
npm run dev
```

開發伺服器啟動後，可以在瀏覽器中訪問 http://localhost:4321 預覽網站。

## 可用的指令

- `npm run dev` ：啟動開發伺服器
- `npm run build` ：建置生產版本
- `npm run preview` ：預覽生產版本
- `npm run astro` ：執行 Astro CLI 指令

## 技術堆疊

- [Astro](https://astro.build/) - 網站框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Decap CMS](https://decapcms.org/) - 內容管理系統

## 專案結構

- `/src` - 源代碼目錄
- `/public` - 靜態資源
- `/dist` - 建置輸出目錄
- `astro.config.mjs` - Astro 配置文件
- `tailwind.config.mjs` - Tailwind CSS 配置文件
- `config.yml` - Decap CMS 配置文件

## 開發指南

1. 所有頁面組件都位於 `/src/pages` 目錄
2. 共用組件位於 `/src/components` 目錄
3. 樣式使用 Tailwind CSS 編寫
4. 內容管理通過 Decap CMS 進行

## 貢獻指南

1. Fork 本專案
2. 創建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟一個 Pull Request

## 授權

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 文件 