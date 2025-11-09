/**
 * 簡化版建置腳本
 * 只提取內容到 JSON，不加密
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 開始簡化版建置流程...\n');

try {
    // 步驟 1: 提取內容
    console.log('📝 步驟 1: 提取 HTML 內容到 JSON...');
    execSync('node scripts/extract-content.js', { stdio: 'inherit' });

    // 步驟 2: 注入簡化版載入器
    console.log('\n📄 步驟 2: 注入簡化版載入器...');
    execSync('node scripts/inject-loader-simple.js', { stdio: 'inherit' });

    // 步驟 3: 移除 HTML 中的實際內容
    console.log('\n🗑️  步驟 3: 移除 HTML 中的實際內容...');
    execSync('node scripts/remove-content-from-html.js', { stdio: 'inherit' });

    // 步驟 4: 準備生產版本（移除開發模式標記）
    console.log('\n🚀 步驟 4: 準備生產版本...');
    execSync('node scripts/prepare-production.js', { stdio: 'inherit' });

    console.log('\n✅ 簡化版建置完成！');
    console.log('💡 內容已提取到 slides-content.json');
    console.log('💡 生產模式會從 JSON 載入內容（不加密）');
    console.log('💡 本地開發時，執行 npm run dev 恢復開發模式');

} catch (error) {
    console.error('\n❌ 建置失敗：', error.message);
    process.exit(1);
}

