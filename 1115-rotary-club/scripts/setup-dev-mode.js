/**
 * 設定開發模式
 * 在 HTML 中加入開發模式標記
 */

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../1115-slide.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// 檢查是否已經有開發模式標記
if (htmlContent.includes('data-dev-mode="true"')) {
    console.log('✅ 開發模式已啟用');
    return;
}

// 在 <html> 標籤中加入開發模式標記
htmlContent = htmlContent.replace(
    /<html([^>]*)>/,
    '<html$1 data-dev-mode="true">'
);

fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
console.log('✅ 已啟用開發模式');
console.log('💡 現在可以直接打開 HTML 檔案預覽，不需要加密內容');

