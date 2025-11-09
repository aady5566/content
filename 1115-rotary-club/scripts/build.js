/**
 * 一鍵建置腳本
 * 執行：提取內容 → 加密 → 更新 HTML
 * 使用方法：node scripts/build.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 開始建置流程...\n');

try {
    // 步驟 1: 提取內容
    console.log('📝 步驟 1: 提取 HTML 內容...');
    execSync('node scripts/extract-content.js', { stdio: 'inherit' });

    // 步驟 2: 加密內容
    console.log('\n🔒 步驟 2: 加密內容...');
    execSync('node scripts/encrypt-content.js', { stdio: 'inherit' });

    // 步驟 3: 注入載入器
    console.log('\n📄 步驟 3: 注入內容載入器...');
    execSync('node scripts/inject-loader.js', { stdio: 'inherit' });

    // 步驟 4: 準備生產版本（移除開發模式標記）
    console.log('\n🚀 步驟 4: 準備生產版本...');
    execSync('node scripts/prepare-production.js', { stdio: 'inherit' });

    console.log('\n✅ 建置完成！');
    console.log('💡 現在可以 commit 並 push 到 GitHub 了');
    console.log('💡 本地開發時，執行 npm run dev 恢復開發模式');

} catch (error) {
    console.error('\n❌ 建置失敗：', error.message);
    process.exit(1);
}


