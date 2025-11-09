/**
 * 測試生產模式
 * 啟動本地伺服器並打開瀏覽器
 */

const { execSync, spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const HTML_FILE = path.join(__dirname, '../1115-slide.html');

// 檢查檔案是否存在
if (!fs.existsSync(HTML_FILE)) {
    console.error('❌ 找不到 1115-slide.html');
    process.exit(1);
}

// 檢查是否已經是生產版本
const htmlContent = fs.readFileSync(HTML_FILE, 'utf-8');
if (htmlContent.includes('data-dev-mode="true"')) {
    console.log('⚠️  檢測到開發模式標記');
    console.log('💡 建議先執行 npm run build 準備生產版本');
}

// 建立簡單的 HTTP 伺服器
const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './1115-slide.html';
    }

    // 處理路徑
    if (req.url.startsWith('/1115-rotary-club/')) {
        filePath = '.' + req.url;
    } else if (req.url === '/') {
        filePath = './1115-rotary-club/1115-slide.html';
    }

    const fullPath = path.join(__dirname, '..', filePath);

    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
            return;
        }

        // 設定 Content-Type
        const ext = path.extname(fullPath);
        const contentTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.json': 'application/json',
            '.css': 'text/css',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.svg': 'image/svg+xml'
        };
        res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`\n🚀 本地測試伺服器已啟動！`);
    console.log(`📝 訪問：http://localhost:${PORT}/1115-rotary-club/1115-slide.html`);
    console.log(`\n💡 提示：`);
    console.log(`   - 打開瀏覽器開發者工具（F12）查看 Console`);
    console.log(`   - 檢查 Network 標籤確認檔案載入`);
    console.log(`   - 按 Ctrl+C 停止伺服器\n`);

    // 自動打開瀏覽器（可選）
    const url = `http://localhost:${PORT}/1115-rotary-club/1115-slide.html`;
    try {
        if (process.platform === 'darwin') {
            execSync(`open "${url}"`);
        } else if (process.platform === 'win32') {
            execSync(`start "${url}"`);
        } else {
            execSync(`xdg-open "${url}"`);
        }
    } catch (error) {
        // 忽略錯誤，手動打開即可
    }
});

// 優雅關閉
process.on('SIGINT', () => {
    console.log('\n\n👋 正在關閉伺服器...');
    server.close(() => {
        console.log('✅ 伺服器已關閉');
        process.exit(0);
    });
});

