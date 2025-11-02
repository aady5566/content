// 側邊欄工具 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 建立側邊欄 HTML 結構
    function createSidebar() {
        const sidebar = document.createElement('div');
        sidebar.id = 'sidebar';

        // 判斷是否為首頁和語言
        const pathname = window.location.pathname;
        const filename = pathname.split('/').pop() || '';

        // 更可靠的首頁判斷邏輯（不依賴特定目錄名稱）
        // 優先檢查檔名，因為這是最直接的方式
        // 檔名為 index.html 或 index_en.html 的頁面都視為首頁
        const isHomePage = pathname === '/' ||
                          filename === 'index.html' ||
                          filename === 'index_en.html' ||
                          pathname.endsWith('/index.html') ||
                          pathname.endsWith('/index_en.html') ||
                          // 檢查是否包含 html_en/index_en.html（更寬鬆的匹配，處理各種路徑格式）
                          (pathname.includes('html_en') && pathname.includes('index_en.html'));

        const isEnglish = pathname.includes('_en.html') ||
                         pathname.includes('/html_en/') ||
                         pathname.includes('html_en') ||
                         filename.includes('_en.html');

        if (isHomePage) {
            // 首頁：完整側邊欄
            const menuTitle = isEnglish ? 'Tools Menu' : '工具選單';
            const languageText = isEnglish ? 'Switch Language' : '切換語言';
            const randomGroupText = isEnglish ? 'Random Grouping' : '隨機分組';

            // 根據當前路徑決定隨機分組工具的相對路徑
            // 如果路徑包含 html_en 或 html 目錄，通常需要多上一層（因為在子目錄中）
            let randomGroupLink = '../sidebar_tools/random_grouping.html';
            // 檢查是否在 html 或 html_en 子目錄下（需要上兩層才能到根目錄）
            if (pathname.includes('/html_en/') || pathname.includes('/html/')) {
                randomGroupLink = '../../sidebar_tools/random_grouping.html';
            }

            sidebar.innerHTML = `
                <div class="sidebar-toggle" id="sidebarToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="sidebar-menu" id="sidebarMenu">
                    <div class="sidebar-header">
                        <h3>${menuTitle}</h3>
                    </div>
                    <div class="sidebar-content">
                        <a href="#" class="sidebar-item" id="languageToggle">
                            <span class="sidebar-text">${languageText}</span>
                        </a>
                        <a href="${randomGroupLink}" class="sidebar-item" target="_blank">
                            <span class="sidebar-text">${randomGroupText}</span>
                        </a>
                    </div>
                </div>
            `;
        } else {
            // 其他頁面：只有回首頁按鈕
            const homeText = isEnglish ? 'Home' : '回首頁';
            // 判斷當前頁面位置，決定回首頁的路徑（不依賴特定目錄名稱）
            let homeLink;
            if (pathname.includes('/html/')) {
                // 在 html/ 目錄下的中文頁面，回到父層的 index.html（課程首頁）
                homeLink = '../index.html';
            } else if (pathname.includes('/html_en/')) {
                // 在 html_en/ 目錄下的英文頁面，回到父層的 index.html 或 index_en.html
                homeLink = '../index.html';  // 可以改為 index_en.html 如果英文首頁在父層
            } else {
                // 其他情況，根據語言回到對應的首頁
                // 嘗試找到同層或上層的 index 檔案
                if (isEnglish) {
                    homeLink = 'index_en.html';  // 嘗試同層
                    // 如果不在 html_en 下，可能需要調整路徑
                    if (!pathname.includes('/html_en/')) {
                        homeLink = '../html_en/index_en.html';
                    }
                } else {
                    homeLink = '../index.html';  // 回到上層的 index.html
                }
            }

            sidebar.innerHTML = `
                <div class="home-button" id="homeButton">
                    <a href="${homeLink}" class="home-link">${homeText}</a>
                </div>
            `;
        }

        return sidebar;
    }

    // 建立側邊欄樣式
    function createSidebarStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* 側邊欄樣式 */
            #sidebar {
                position: fixed;
                top: 0;
                left: 0;
                z-index: 1000;
                font-family: var(--font-family, 'Calibri', 'Noto Sans TC', sans-serif);
            }

            /* 側邊欄切換按鈕 */
            .sidebar-toggle {
                position: fixed;
                top: 1rem;
                left: 1rem;
                width: 30px;
                height: 30px;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                background: #4d4d3b;
                border-radius: 4px;
                padding: 6px;
                transition: all 0.3s ease;
                z-index: 1001;
            }

            .sidebar-toggle:hover {
                background: #3a3a2c;
                transform: translateY(-2px);
            }

            .sidebar-toggle span {
                display: block;
                width: 18px;
                height: 2px;
                background: #ffffff;
                border-radius: 1px;
                transition: all 0.3s ease;
            }

            /* 側邊欄選單 */
            .sidebar-menu {
                position: fixed;
                top: 0;
                left: -300px;
                width: 280px;
                height: 100vh;
                background: #F4F2EF;
                box-shadow: 2px 0 10px rgba(0,0,0,0.1);
                transition: left 0.3s ease;
                z-index: 1000;
                overflow-y: auto;
            }

            .sidebar-menu.active {
                left: 0;
            }

            .sidebar-header {
                background: #4d4d3b;
                color: #ffffff;
                padding: 1rem;
                text-align: center;
                border-bottom: 1px solid #d1d1c2;
            }

            .sidebar-header h3 {
                margin: 0;
                font-size: 1.1rem;
                font-weight: 400;
            }

            .sidebar-content {
                padding: 1rem 0;
            }

            .sidebar-item {
                display: block;
                padding: 0.8rem 1.5rem;
                color: #5a5a5a;
                text-decoration: none;
                transition: all 0.3s ease;
                border-bottom: 1px solid #d1d1c2;
            }

            .sidebar-item:hover {
                background: rgba(120, 120, 91, 0.1);
                color: #4d4d3b;
                transform: translateX(5px);
            }

            .sidebar-text {
                font-size: 0.9rem;
                font-weight: 400;
            }

            /* 遮罩層 */
            .sidebar-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.3);
                z-index: 999;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }

            .sidebar-overlay.active {
                opacity: 1;
                visibility: visible;
            }

            /* 回首頁按鈕樣式 */
            .home-button {
                position: fixed;
                top: 1rem;
                left: 1rem;
                z-index: 1001;
            }

            .home-link {
                display: inline-block;
                background: #4d4d3b;
                color: #ffffff;
                text-decoration: none;
                padding: 0.5rem 1rem;
                border-radius: 0.25rem;
                font-size: 0.9rem;
                transition: all 0.3s ease;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }

            .home-link:hover {
                background: #3a3a2c;
                color: #ffffff;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            }

            /* 手機版優化 */
            @media (max-width: 767px) {
                .sidebar-toggle {
                    top: 0.5rem;
                    left: 0.5rem;
                    width: 28px;
                    height: 28px;
                    padding: 5px;
                }

                .sidebar-toggle span {
                    width: 16px;
                    height: 2px;
                }

                .sidebar-menu {
                    width: 260px;
                }

                .sidebar-item {
                    padding: 0.7rem 1.2rem;
                }

                .sidebar-text {
                    font-size: 0.85rem;
                }

                .home-button {
                    top: 0.5rem;
                    left: 0.5rem;
                }

                .home-link {
                    padding: 0.4rem 0.8rem;
                    font-size: 0.8rem;
                }
            }
        `;
        return style;
    }

    // 初始化側邊欄
    function initSidebar() {
        // 檢查是否已經存在側邊欄
        if (document.getElementById('sidebar')) {
            return;
        }

        // 建立樣式
        const styles = createSidebarStyles();
        document.head.appendChild(styles);

        // 建立側邊欄
        const sidebar = createSidebar();
        document.body.appendChild(sidebar);

        // 建立遮罩層
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);

        // 綁定事件（只有首頁才有側邊欄功能）
        const toggle = document.getElementById('sidebarToggle');
        const menu = document.getElementById('sidebarMenu');
        const languageToggle = document.getElementById('languageToggle');

        if (toggle && menu) {
            // 切換側邊欄顯示/隱藏
            toggle.addEventListener('click', function(e) {
                e.stopPropagation();
                menu.classList.toggle('active');
                overlay.classList.toggle('active');
            });

            // 點擊遮罩層關閉側邊欄
            overlay.addEventListener('click', function() {
                menu.classList.remove('active');
                overlay.classList.remove('active');
            });
        }

        // 語言切換功能
        if (languageToggle) {
            languageToggle.addEventListener('click', function(e) {
                e.preventDefault();
                const currentPath = window.location.pathname;

                // 判斷當前語言並切換（不依賴特定目錄名稱）
                const currentFile = currentPath.split('/').pop() || '';

                // 處理首頁之間的語言切換
                if (currentFile === 'index.html' || currentPath.endsWith('/index.html')) {
                    // 中文課程首頁 → 英文課程首頁
                    // 檢查是否有 html_en 子目錄
                    if (currentPath.includes('/html/') || currentPath.includes('/html_en/')) {
                        // 在子目錄下，需要調整路徑
                        window.location.href = '../html_en/index_en.html';
                    } else {
                        // 在根目錄或父目錄下
                        window.location.href = 'html_en/index_en.html';
                    }
                    return;
                } else if (currentFile === 'index_en.html' || currentPath.endsWith('/index_en.html')) {
                    // 英文課程首頁 → 中文課程首頁
                    if (currentPath.includes('/html_en/')) {
                        window.location.href = '../index.html';
                    } else {
                        window.location.href = '../index.html';
                    }
                    return;
                } else if (currentPath.includes('/html_en/')) {
                    // 當前是英文版頁面，切換到中文版
                    // 英文投影片頁面 → 中文投影片頁面
                    const chinesePath = currentPath.replace('/html_en/', '/html/').replace('_en.html', '.html');
                    window.location.href = chinesePath;
                    return;
                } else if (currentPath.includes('/html/')) {
                    // 當前是中文版頁面，切換到英文版
                    // 中文投影片頁面 → 英文投影片頁面
                    const englishPath = currentPath.replace('/html/', '/html_en/').replace('.html', '_en.html');
                    window.location.href = englishPath;
                    return;
                } else {
                    // 其他情況（根目錄歡迎頁面不需要語言切換）
                    if (currentPath.endsWith('/index.html') || currentPath === '/') {
                        return;
                    }
                }
            });
        }

        // 點擊側邊欄項目後關閉側邊欄
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => {
            item.addEventListener('click', function() {
                // 如果是隨機分組，不關閉側邊欄（因為是新開分頁）
                if (this.getAttribute('target') === '_blank') {
                    return;
                }
                menu.classList.remove('active');
                overlay.classList.remove('active');
            });
        });
    }

    // 執行初始化
    initSidebar();
});
