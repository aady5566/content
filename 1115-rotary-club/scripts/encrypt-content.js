/**
 * 加密投影片內容
 * 使用方法：node scripts/encrypt-content.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 讀取原始 JSON
const inputPath = path.join(__dirname, '../slides-content.json');
if (!fs.existsSync(inputPath)) {
    console.error('❌ 找不到 slides-content.json，請先執行 extract-content.js');
    process.exit(1);
}

const content = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

// 簡單的加密函數（Base64 + 字元替換）
function encrypt(text) {
    // 1. Base64 編碼
    const base64 = Buffer.from(text).toString('base64');

    // 2. 簡單的字元替換（可選，增加破解難度）
    const shifted = base64.split('').map(char => {
        const code = char.charCodeAt(0);
        // 只對字母和數字進行簡單位移
        if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            return String.fromCharCode(code + 3);
        }
        return char;
    }).join('');

    return shifted;
}

// 加密內容
const encryptedContent = encrypt(JSON.stringify(content));

// 生成隨機檔名（但可預測，方便管理）
// 使用內容的 hash 來生成檔名，這樣相同內容會得到相同檔名
const hash = crypto.createHash('md5').update(JSON.stringify(content)).digest('hex');
const filename = `slide_${hash.substring(0, 8)}.enc.json`;

// 確保 data 目錄存在
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// 寫入加密檔案
const outputPath = path.join(dataDir, filename);
fs.writeFileSync(outputPath, encryptedContent, 'utf-8');

// 生成路徑映射檔案（用於 HTML 中引用）
const mappingPath = path.join(__dirname, '../data-path.json');
fs.writeFileSync(mappingPath, JSON.stringify({
    filename: filename,
    hash: hash.substring(0, 8)
}, null, 2), 'utf-8');

console.log(`✅ 加密完成！`);
console.log(`📁 加密檔案：data/${filename}`);
console.log(`📝 路徑映射：data-path.json`);
console.log(`\n💡 提示：這個檔名是基於內容 hash 生成的，內容不變檔名就不變`);

