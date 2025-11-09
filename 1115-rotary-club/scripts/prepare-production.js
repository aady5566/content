/**
 * 準備生產版本
 * 移除開發模式標記，讓 HTML 使用加密內容
 */

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../1115-slide.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// 移除開發模式標記
htmlContent = htmlContent.replace(
    /data-dev-mode="true"/g,
    ''
);

fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
console.log('✅ 已準備生產版本');
console.log('💡 HTML 現在會使用加密內容載入');

