/**
 * 在 HTML 中注入內容載入器
 * 自動檢測開發/生產模式
 */

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../1115-slide.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// 檢查是否已經注入過，如果存在則先移除
if (htmlContent.includes('<!-- CONTENT-LOADER-INJECTED -->')) {
    console.log('⚠️  載入器已存在，先移除舊版本...');
    // 找到載入器腳本的開始和結束位置
    const loaderStart = htmlContent.indexOf('<!-- CONTENT-LOADER-INJECTED -->');
    const loaderEnd = htmlContent.indexOf('</script>', loaderStart) + '</script>'.length;

    if (loaderStart !== -1 && loaderEnd !== -1) {
        htmlContent = htmlContent.substring(0, loaderStart) + htmlContent.substring(loaderEnd + 1);
        console.log('✅ 已移除舊版本載入器');
    }
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
                // 等待 DOM 載入完成
                function loadEncryptedContent() {
                    const deck = document.getElementById('deck');
                    if (!deck) {
                        console.error('找不到 #deck 元素');
                        return;
                    }

                    // 先保存原始內容作為 fallback
                    const originalContent = deck.innerHTML;

                    // 確定基礎路徑（處理子目錄情況）
                    const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);

                    // 讀取路徑映射
                    fetch(basePath + 'data-path.json')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('無法載入 data-path.json: ' + response.status);
                        }
                        return response.json();
                    })
                    .then(mapping => {
                        // 載入加密內容
                        return fetch(basePath + 'data/' + mapping.filename);
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('無法載入加密檔案: ' + response.status);
                        }
                        return response.text();
                    })
                    .then(encrypted => {
                        try {
                            // 解密內容
                            const decrypted = decryptContent(encrypted);
                            const content = JSON.parse(decrypted);

                            // 確認內容有效
                            if (!content || !content.slides || !Array.isArray(content.slides)) {
                                throw new Error('無效的內容格式');
                            }

                            // 先渲染到臨時容器，確認成功後再替換
                            const tempContainer = document.createElement('div');
                            tempContainer.style.display = 'none';
                            document.body.appendChild(tempContainer);

                            renderSlides(content.slides, tempContainer);

                            // 確認渲染成功後，再替換原內容
                            if (tempContainer.children.length > 0) {
                                deck.innerHTML = '';
                                // 移動所有子元素到 deck
                                while (tempContainer.firstChild) {
                                    deck.appendChild(tempContainer.firstChild);
                                }
                                document.body.removeChild(tempContainer);
                            } else {
                                throw new Error('渲染失敗，沒有生成投影片');
                            }

                            console.log('✅ 成功載入加密內容，共 ' + content.slides.length + ' 個投影片');
                        } catch (error) {
                            console.error('解密或解析內容失敗：', error);
                            throw error; // 重新拋出錯誤，讓 catch 處理
                        }
                    })
                    .catch(error => {
                        console.error('載入加密內容失敗，使用原始內容', error);
                        // 如果載入失敗，恢復原始內容
                        if (originalContent) {
                            deck.innerHTML = originalContent;
                            console.log('✅ 已恢復原始內容');
                        } else {
                            console.error('❌ 無法恢復原始內容，originalContent 為空');
                        }
                    });
                }

                // 確保 DOM 已載入，並且等待其他腳本執行完成
                function initLoader() {
                    // 使用 window.load 事件，確保所有資源都已載入
                    if (document.readyState === 'complete') {
                        // 頁面已完全載入，延遲執行確保其他腳本已完成
                        setTimeout(() => {
                            loadEncryptedContent();
                        }, 200);
                    } else {
                        // 等待頁面完全載入
                        window.addEventListener('load', () => {
                            setTimeout(() => {
                                loadEncryptedContent();
                            }, 200);
                        });
                    }
                }

                if (document.readyState === 'loading') {
                    // DOM 還在載入，等待 DOMContentLoaded 後再等待 load
                    document.addEventListener('DOMContentLoaded', () => {
                        initLoader();
                    });
                } else {
                    // DOM 已經載入，直接執行
                    initLoader();
                }
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
                try {
                    if (!slides || !Array.isArray(slides)) {
                        throw new Error('slides 不是有效的陣列');
                    }

                    slides.forEach((slide, index) => {
                        try {
                            const section = document.createElement('section');
                            section.className = slide.classes || slide.layout || 'layout-default';
                            section.innerHTML = slide.content || '';
                            container.appendChild(section);
                        } catch (error) {
                            console.error('渲染投影片 ' + index + ' 失敗：', error);
                        }
                    });

                    // 觸發初始化（如果需要的話）
                    // 延遲執行，確保 DOM 已更新
                    setTimeout(() => {
                        // 觸發自定義事件，通知其他腳本內容已載入
                        window.dispatchEvent(new CustomEvent('slidesLoaded', {
                            detail: { slideCount: slides.length }
                        }));

                        // 如果導航腳本需要重新初始化，觸發重新初始化
                        if (typeof window.reinitSlideNavigation === 'function') {
                            window.reinitSlideNavigation();
                        }

                        // 觸發 resize 事件，讓圖表等重新計算
                        window.dispatchEvent(new Event('resize'));
                    }, 300);

                    console.log('✅ 成功渲染 ' + slides.length + ' 個投影片');
                } catch (error) {
                    console.error('渲染投影片失敗：', error);
                    throw error;
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

