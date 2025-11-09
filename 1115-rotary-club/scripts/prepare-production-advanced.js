/**
 * 進階生產版本準備：移除 HTML 中的實際內容
 * 只保留結構，內容由 JavaScript 動態載入
 */

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../1115-slide.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// 找到 #deck 的開始和結束位置
const deckStart = htmlContent.indexOf('<div id="deck">');
const deckEnd = htmlContent.indexOf('</div>', deckStart + '<div id="deck">'.length);

if (deckStart !== -1 && deckEnd !== -1) {
    // 保留 deck 的開始標籤，但清空內容
    const deckTag = htmlContent.substring(deckStart, deckStart + '<div id="deck">'.length);
    const deckCloseTag = '</div>';

    // 替換整個 deck 內容為空的
    htmlContent = htmlContent.substring(0, deckStart) +
                  deckTag + '\n        <!-- 內容由 JavaScript 動態載入 -->\n    ' +
                  deckCloseTag +
                  htmlContent.substring(deckEnd + deckCloseTag.length);

    fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
    console.log('✅ 已移除 HTML 中的實際內容，只保留結構');
} else {
    console.log('⚠️  找不到 #deck 元素，跳過內容移除');
}

