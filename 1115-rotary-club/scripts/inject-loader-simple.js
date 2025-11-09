/**
 * 簡化版載入器：只從 JSON 載入內容，不加密
 */

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../1115-slide.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// 檢查是否已經注入過，如果存在則先移除
if (htmlContent.includes('<!-- CONTENT-LOADER-INJECTED -->')) {
    console.log('⚠️  載入器已存在，先移除舊版本...');
    const loaderStart = htmlContent.indexOf('<!-- CONTENT-LOADER-INJECTED -->');
    const loaderEnd = htmlContent.indexOf('</script>', loaderStart) + '</script>'.length;

    if (loaderStart !== -1 && loaderEnd !== -1) {
        htmlContent = htmlContent.substring(0, loaderStart) + htmlContent.substring(loaderEnd + 1);
        console.log('✅ 已移除舊版本載入器');
    }
}

// 簡化版載入器腳本
const loaderScript = `
    <!-- CONTENT-LOADER-INJECTED -->
    <script>
        /**
         * 簡化版內容載入器：從 JSON 載入內容
         */
        (function() {
            // 檢測是否為開發模式
            const isDevMode =
                document.documentElement.hasAttribute('data-dev-mode') ||
                window.location.hostname === 'localhost' ||
                window.location.hostname === '127.0.0.1' ||
                window.location.hostname === '' ||
                window.location.search.includes('dev=true');

            // 如果是生產模式，從 JSON 載入內容
            if (!isDevMode) {
                function loadContentFromJSON() {
                    const deck = document.getElementById('deck');
                    if (!deck) {
                        console.error('找不到 #deck 元素');
                        return;
                    }

                    // 保存原始內容作為 fallback
                    const originalContent = deck.innerHTML;

                    // 確定基礎路徑
                    const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);

                    // 從 JSON 載入內容
                    fetch(basePath + 'slides-content.json')
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('無法載入 slides-content.json: ' + response.status);
                            }
                            return response.json();
                        })
                        .then(data => {
                            // 確認內容有效
                            if (!data || !data.slides || !Array.isArray(data.slides)) {
                                throw new Error('無效的 JSON 格式');
                            }

                            // 先渲染到臨時容器
                            const tempContainer = document.createElement('div');
                            tempContainer.style.display = 'none';
                            document.body.appendChild(tempContainer);

                            // 渲染投影片
                            data.slides.forEach((slide, index) => {
                                try {
                                    const section = document.createElement('section');
                                    section.className = slide.classes || slide.layout || 'layout-default';
                                    section.innerHTML = slide.content || '';
                                    tempContainer.appendChild(section);
                                } catch (error) {
                                    console.error('渲染投影片 ' + index + ' 失敗：', error);
                                }
                            });

                            // 確認渲染成功後，再替換原內容
                            if (tempContainer.children.length > 0) {
                                deck.innerHTML = '';
                                while (tempContainer.firstChild) {
                                    deck.appendChild(tempContainer.firstChild);
                                }
                                document.body.removeChild(tempContainer);

                                // 觸發事件通知其他腳本內容已載入
                                setTimeout(() => {
                                    // 標記內容已載入完成（先設定，讓其他腳本可以檢查）
                                    window.slidesContentLoaded = true;
                                    
                                    // 觸發 slidesLoaded 事件
                                    window.dispatchEvent(new CustomEvent('slidesLoaded', {
                                        detail: { slideCount: data.slides.length }
                                    }));
                                    
                                    // 觸發 resize 事件
                                    window.dispatchEvent(new Event('resize'));
                                    
                                    // 觸發自定義事件，讓其他腳本知道可以初始化了
                                    window.dispatchEvent(new CustomEvent('contentReady'));
                                    
                                    console.log('✅ 成功載入 JSON 內容，共 ' + data.slides.length + ' 個投影片');
                                    console.log('📢 已觸發 contentReady 事件，其他腳本可以開始初始化');
                                    
                                    // 重新觸發所有等待中的 DOMContentLoaded 監聽器
                                    // 這會讓已經註冊的腳本重新執行
                                    window.dispatchEvent(new Event('DOMContentLoaded'));
                                }, 500);
                            } else {
                                throw new Error('渲染失敗，沒有生成投影片');
                            }
                        })
                        .catch(error => {
                            console.error('載入 JSON 內容失敗，使用原始內容', error);
                            // 如果載入失敗，恢復原始內容
                            if (originalContent) {
                                deck.innerHTML = originalContent;
                                console.log('✅ 已恢復原始內容');
                            }
                        });
                }

                // 確保 DOM 已載入
                function initLoader() {
                    if (document.readyState === 'complete') {
                        setTimeout(() => {
                            loadContentFromJSON();
                        }, 200);
                    } else {
                        window.addEventListener('load', () => {
                            setTimeout(() => {
                                loadContentFromJSON();
                            }, 200);
                        });
                    }
                }

                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', initLoader);
                } else {
                    initLoader();
                }
            }
        })();
    </script>
`;

// 在 </head> 之前注入
htmlContent = htmlContent.replace('</head>', loaderScript + '\n</head>');

fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
console.log('✅ 已注入簡化版內容載入器');
console.log('💡 開發模式：直接使用 HTML 內容');
console.log('💡 生產模式：從 JSON 載入內容（不加密）');

