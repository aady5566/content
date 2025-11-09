/**
 * 移除 HTML 中的實際內容，只保留結構
 * 用於生產版本，讓原始碼中看不到內容
 */

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../1115-slide.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// 找到 #deck 的開始位置
const deckStartPattern = /<div id="deck">/;
const deckMatch = htmlContent.match(deckStartPattern);
if (!deckMatch) {
    console.log('⚠️  找不到 #deck 元素，跳過內容移除');
    process.exit(0);
}

const deckStart = deckMatch.index;
const deckStartTag = '<div id="deck">';

// 找到 #deck 之後的第一個 </div>（應該是導航控制之前的）
// 先找到 </div> 後面跟著導航控制或腳本的位置
const navControlPattern = /<button id="nav-prev"/;
const navMatch = htmlContent.match(navControlPattern);

if (!navMatch) {
    console.log('⚠️  找不到導航控制元素，嘗試其他方法...');
    // 如果找不到導航控制，就找 </div> 後面跟著 </body> 的位置
    const bodyPattern = /<\/body>/;
    const bodyMatch = htmlContent.match(bodyPattern);
    if (!bodyMatch) {
        console.log('⚠️  找不到 </body> 標籤，跳過內容移除');
        process.exit(0);
    }
    // 從 deck 開始到 body 之前，找到最後一個 </div>
    const beforeBody = htmlContent.substring(deckStart, bodyMatch.index);
    const lastDivIndex = beforeBody.lastIndexOf('</div>');
    if (lastDivIndex === -1) {
        console.log('⚠️  找不到對應的 </div> 標籤，跳過內容移除');
        process.exit(0);
    }
    const deckEnd = deckStart + lastDivIndex + '</div>'.length;

    // 保留 deck 的開始和結束標籤，但清空內容
    const emptyDeck = deckStartTag + '\n        <!-- 內容由 JavaScript 從 JSON 動態載入 -->\n    </div>';
    htmlContent = htmlContent.substring(0, deckStart) +
                  emptyDeck +
                  htmlContent.substring(deckEnd);
} else {
    // 找到導航控制之前的最後一個 </div>
    const beforeNav = htmlContent.substring(deckStart, navMatch.index);
    const lastDivIndex = beforeNav.lastIndexOf('</div>');
    if (lastDivIndex === -1) {
        console.log('⚠️  找不到對應的 </div> 標籤，跳過內容移除');
        process.exit(0);
    }
    const deckEnd = deckStart + lastDivIndex + '</div>'.length;

    // 保留 deck 的開始和結束標籤，但清空內容
    const emptyDeck = deckStartTag + '\n        <!-- 內容由 JavaScript 從 JSON 動態載入 -->\n    </div>';
    htmlContent = htmlContent.substring(0, deckStart) +
                  emptyDeck +
                  htmlContent.substring(deckEnd);
}

fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
console.log('✅ 已移除 HTML 中的實際內容，只保留結構');
console.log('💡 現在查看原始碼時不會看到投影片內容');

