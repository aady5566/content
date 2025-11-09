/**
 * 從 HTML 提取投影片內容到 JSON
 * 使用方法：node scripts/extract-content.js
 */

const fs = require('fs');
const path = require('path');

// 讀取 HTML 檔案
const htmlPath = path.join(__dirname, '../1115-slide.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// 使用簡單的正則表達式提取 section 內容
// 注意：這是一個簡化版本，可能需要根據實際結構調整
const sectionRegex = /<section[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/section>/g;
const slides = [];
let match;
let slideIndex = 0;

while ((match = sectionRegex.exec(htmlContent)) !== null) {
    const [, classes, content] = match;

    // 跳過 hidden 的投影片（如果需要的話）
    if (classes.includes('hidden')) {
        continue;
    }

    // 提取關鍵內容
    const titleMatch = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : '';

    // 提取所有文字內容（移除 HTML 標籤）
    const textContent = content
        .replace(/<script[\s\S]*?<\/script>/gi, '') // 移除 script
        .replace(/<style[\s\S]*?<\/style>/gi, '')   // 移除 style
        .replace(/<[^>]+>/g, ' ')                   // 移除所有 HTML 標籤
        .replace(/\s+/g, ' ')                       // 合併空白
        .trim();

    slides.push({
        id: slideIndex++,
        layout: classes.split(' ')[0] || 'layout-default',
        classes: classes,
        title: title,
        content: content, // 保留完整 HTML 內容
        textPreview: textContent.substring(0, 200) // 預覽文字
    });
}

// 輸出 JSON
const outputPath = path.join(__dirname, '../slides-content.json');
fs.writeFileSync(outputPath, JSON.stringify({ slides }, null, 2), 'utf-8');

console.log(`✅ 成功提取 ${slides.length} 個投影片到 ${outputPath}`);
console.log(`📝 您可以直接編輯這個 JSON 檔案來管理內容`);

