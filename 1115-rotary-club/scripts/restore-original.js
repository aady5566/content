/**
 * 還原到原始 standalone HTML 單檔架構
 * 使用方法：node scripts/restore-original.js
 *
 * 這個腳本會：
 * 1. 移除 HTML 中注入的載入器
 * 2. 移除開發模式標記
 * 3. 恢復到原始的 HTML 結構
 */

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../1115-slide.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

let changed = false;

// 1. 移除注入的載入器腳本
if (htmlContent.includes('<!-- CONTENT-LOADER-INJECTED -->')) {
    // 找到載入器腳本的開始和結束位置
    const loaderStart = htmlContent.indexOf('<!-- CONTENT-LOADER-INJECTED -->');
    const loaderEnd = htmlContent.indexOf('</script>', loaderStart) + '</script>'.length;

    if (loaderStart !== -1 && loaderEnd !== -1) {
        htmlContent = htmlContent.substring(0, loaderStart) + htmlContent.substring(loaderEnd + 1);
        changed = true;
        console.log('✅ 已移除內容載入器');
    }
}

// 2. 移除開發模式標記
if (htmlContent.includes('data-dev-mode="true"')) {
    htmlContent = htmlContent.replace(/data-dev-mode="true"/g, '');
    changed = true;
    console.log('✅ 已移除開發模式標記');
}

// 3. 清理多餘的空格
htmlContent = htmlContent.replace(/<html([^>]*)\s+>/g, '<html$1>');

// 寫回檔案
if (changed) {
    fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
    console.log('\n✅ 已還原到原始 standalone HTML 架構');
    console.log('💡 HTML 檔案現在是純單檔，不依賴任何外部腳本');
} else {
    console.log('ℹ️  沒有發現需要還原的內容，檔案已經是原始狀態');
}

