# 🧪 本地測試指南

## 方法一：直接打開 HTML（開發模式）

### 最簡單的方式

1. **直接打開檔案**：
   ```bash
   open 1115-slide.html  # macOS
   # 或直接用瀏覽器打開檔案
   ```

2. **效果**：
   - ✅ 內容直接顯示（開發模式）
   - ✅ 不需要加密/解密
   - ✅ 即時看到變更

### 啟用開發模式（如果需要）

```bash
cd 1115-rotary-club
npm run dev
```

這會在 HTML 中加入 `data-dev-mode="true"` 標記，確保使用開發模式。

---

## 方法二：測試生產模式（推薦）

### 使用本地伺服器

生產模式需要透過 HTTP 伺服器訪問，不能直接用 `file://` 協議。

#### 選項 A：使用 Python（最簡單）

```bash
cd 1115-rotary-club

# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

然後訪問：`http://localhost:8000/1115-slide.html`

#### 選項 B：使用 Node.js http-server

```bash
# 安裝（只需要一次）
npm install -g http-server

# 啟動伺服器
cd 1115-rotary-club
http-server -p 8000
```

然後訪問：`http://localhost:8000/1115-slide.html`

#### 選項 C：使用 VS Code Live Server

1. 安裝 VS Code 擴充功能 "Live Server"
2. 右鍵點擊 `1115-slide.html`
3. 選擇 "Open with Live Server"

---

## 方法三：快速測試腳本

我已經為您建立了一個測試腳本：

```bash
cd 1115-rotary-club
npm run test-production
```

（如果還沒建立，我可以幫您建立）

---

## 測試檢查清單

### 開發模式測試

- [ ] 直接打開 HTML 檔案
- [ ] 內容應該直接顯示
- [ ] 不需要載入加密檔案
- [ ] 所有功能正常運作

### 生產模式測試

- [ ] 使用本地伺服器訪問
- [ ] 打開瀏覽器開發者工具（F12）
- [ ] 檢查 Console：
  - ✅ 應該看到 "✅ 成功載入加密內容"
  - ✅ 應該看到 "✅ 成功渲染 X 個投影片"
- [ ] 檢查 Network 標籤：
  - ✅ 應該看到 `data-path.json` 請求
  - ✅ 應該看到 `data/slide_xxxxx.enc.json` 請求
- [ ] 檢查 Elements：
  - ✅ 應該看到所有投影片正常渲染
- [ ] 測試功能：
  - ✅ 投影片導航正常
  - ✅ 圖表正常顯示
  - ✅ 所有互動功能正常

---

## 常見問題

### Q: 為什麼直接打開檔案看不到內容？

A: 可能是生產模式，需要透過 HTTP 伺服器訪問。使用 `npm run dev` 啟用開發模式，或使用本地伺服器。

### Q: 如何確認是開發模式還是生產模式？

A: 打開瀏覽器 Console，應該會看到相關的日誌訊息：
- 開發模式：不會有載入加密內容的訊息
- 生產模式：會看到 "✅ 成功載入加密內容"

### Q: 本地測試和 GitHub Pages 有什麼不同？

A:
- **本地開發模式**：內容直接存在 HTML 中
- **本地生產模式**：動態載入加密內容（模擬 GitHub Pages）
- **GitHub Pages**：實際的生產環境

建議在本地測試生產模式，確認一切正常後再 push。

---

## 快速測試命令

```bash
# 1. 確保是生產版本
cd 1115-rotary-club
npm run build

# 2. 啟動本地伺服器（選擇一個）
python3 -m http.server 8000
# 或
http-server -p 8000

# 3. 訪問
# http://localhost:8000/1115-slide.html
```

