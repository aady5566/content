/**
 * 移除所有自動化相關檔案
 * 使用方法：node scripts/remove-automation.js
 *
 * 這個腳本會：
 * 1. 刪除自動生成的檔案（data/, data-path.json, slides-content.json）
 * 2. 刪除腳本目錄
 * 3. 刪除 package.json
 * 4. 刪除相關說明文件
 *
 * ⚠️ 注意：這個操作不可逆，請確認後再執行
 */

const fs = require('fs');
const path = require('path');

const filesToRemove = [
    '../data',
    '../data-path.json',
    '../slides-content.json',
    '../package.json',
    '../README-protection.md',
    '../DEPLOYMENT.md',
    '../.gitignore'
];

const dirsToRemove = [
    '../scripts'
];

console.log('⚠️  準備移除自動化相關檔案...\n');

let removedCount = 0;

// 移除檔案
filesToRemove.forEach(file => {
    const filePath = path.join(__dirname, file);
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`✅ 已刪除：${file}`);
            removedCount++;
        }
    } catch (error) {
        console.log(`⚠️  無法刪除 ${file}：${error.message}`);
    }
});

// 移除目錄
dirsToRemove.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    try {
        if (fs.existsSync(dirPath)) {
            fs.rmSync(dirPath, { recursive: true, force: true });
            console.log(`✅ 已刪除目錄：${dir}`);
            removedCount++;
        }
    } catch (error) {
        console.log(`⚠️  無法刪除目錄 ${dir}：${error.message}`);
    }
});

console.log(`\n✅ 完成！已移除 ${removedCount} 個項目`);
console.log('💡 記得也要刪除 .github/workflows/auto-build.yml（如果需要的話）');

