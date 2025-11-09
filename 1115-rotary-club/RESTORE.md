# 🔄 還原到原始 Standalone HTML 架構

如果您想要還原到完全原始的 standalone HTML 單檔架構，請按照以下步驟：

## 方法一：完全還原（推薦）

### 步驟 1：還原 HTML 檔案

```bash
cd 1115-rotary-club
node scripts/restore-original.js
```

這會：
- ✅ 移除 HTML 中注入的載入器
- ✅ 移除開發模式標記
- ✅ 恢復到原始 HTML 結構

### 步驟 2：移除自動化檔案（可選）

```bash
node scripts/remove-automation.js
```

這會刪除：
- `data/` 目錄（加密檔案）
- `data-path.json`
- `slides-content.json`
- `scripts/` 目錄
- `package.json`
- 相關說明文件

### 步驟 3：移除 GitHub Actions（可選）

如果您也想移除 GitHub Actions：

```bash
rm -rf ../../.github/workflows/auto-build.yml
```

或者手動刪除 `.github/workflows/auto-build.yml` 檔案

## 方法二：手動還原

### 1. 還原 HTML 檔案

手動編輯 `1115-slide.html`：
- 搜尋並刪除 `<!-- CONTENT-LOADER-INJECTED -->` 到對應 `</script>` 之間的內容
- 移除 `<html>` 標籤中的 `data-dev-mode="true"` 屬性

### 2. 刪除檔案

刪除以下檔案和目錄：
- `data/`
- `data-path.json`
- `slides-content.json`
- `scripts/`
- `package.json`
- `README-protection.md`
- `DEPLOYMENT.md`
- `.gitignore`（如果不需要的話）

### 3. 移除 GitHub Actions

刪除 `.github/workflows/auto-build.yml`

## ✅ 還原後確認

還原後，您的 `1115-slide.html` 應該是：
- ✅ 純 standalone HTML 檔案
- ✅ 不依賴任何外部腳本
- ✅ 可以直接打開使用
- ✅ 內容直接存在 HTML 中

## ⚠️ 注意事項

- 還原後，內容保護功能會消失
- 所有內容會直接存在 HTML 中
- 如果之後想要重新啟用保護，可以重新執行設定流程

## 🔄 重新啟用保護

如果您之後想要重新啟用保護功能：
1. 重新執行 `npm run dev`（需要先恢復 scripts）
2. 或重新執行完整的設定流程

