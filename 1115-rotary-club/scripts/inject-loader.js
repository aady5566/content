/**
 * 在 HTML 中注入內容載入器
 * 自動檢測開發/生產模式
 */

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../1115-slide.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// 檢查是否已經注入過
if (htmlContent.includes('<!-- CONTENT-LOADER-INJECTED -->')) {
    console.log('⚠️  載入器已存在，跳過注入');
    return;
}

// 載入器腳本（在 </head> 之前注入）
const loaderScript = `
    <!-- CONTENT-LOADER-INJECTED -->
    <script>
        /**
         * 內容載入器：自動檢測開發/生產模式
         */
        (function() {
            // 檢測是否為開發模式
            const isDevMode =
                document.documentElement.hasAttribute('data-dev-mode') ||
                window.location.hostname === 'localhost' ||
                window.location.hostname === '127.0.0.1' ||
                window.location.hostname === '' ||
                window.location.search.includes('dev=true');

            // 如果是生產模式，動態載入加密內容
            if (!isDevMode) {
                // 讀取路徑映射
                fetch('data-path.json')
                    .then(response => response.json())
                    .then(mapping => {
                        // 載入加密內容
                        return fetch('data/' + mapping.filename);
                    })
                    .then(response => response.text())
                    .then(encrypted => {
                        // 解密內容
                        const decrypted = decryptContent(encrypted);
                        const content = JSON.parse(decrypted);

                        // 清空現有內容並動態載入
                        const deck = document.getElementById('deck');
                        if (deck) {
                            deck.innerHTML = '';
                            renderSlides(content.slides, deck);
                        }
                    })
                    .catch(error => {
                        console.error('載入加密內容失敗，使用原始內容', error);
                    });
            }

            // 解密函數（與 encrypt-content.js 對應）
            function decryptContent(encrypted) {
                // 反向字元替換
                const unshifted = encrypted.split('').map(char => {
                    const code = char.charCodeAt(0);
                    if ((code >= 51 && code <= 60) || (code >= 68 && code <= 93) || (code >= 100 && code <= 125)) {
                        return String.fromCharCode(code - 3);
                    }
                    return char;
                }).join('');

                // Base64 解碼（瀏覽器環境）
                try {
                    // 使用 atob（瀏覽器原生 API）
                    const binaryString = atob(unshifted);
                    // 將 binary string 轉換為 UTF-8
                    const bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    return new TextDecoder('utf-8').decode(bytes);
                } catch (e) {
                    // 降級方案：直接使用 decodeURIComponent
                    return decodeURIComponent(escape(atob(unshifted)));
                }
            }

            // 渲染投影片
            function renderSlides(slides, container) {
                slides.forEach(slide => {
                    const section = document.createElement('section');
                    section.className = slide.classes || slide.layout || 'layout-default';
                    section.innerHTML = slide.content;
                    container.appendChild(section);
                });

                // 觸發初始化（如果需要的話）
                if (typeof initSlides === 'function') {
                    initSlides();
                }
            }
        })();
    </script>
`;

// 在 </head> 之前注入
htmlContent = htmlContent.replace('</head>', loaderScript + '\n</head>');

fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
console.log('✅ 已注入內容載入器');
console.log('💡 開發模式：直接使用 HTML 內容');
console.log('💡 生產模式：動態載入加密內容');

