# w12-mindfulness.html 格式調整計劃

## 調整原則
- **不改變內容**：只調整格式和結構，保持所有文字內容不變
- **遵循 style_1116.md**：嚴格按照規範調整 HTML 結構、樣式類別和格式
- **提升可讀性**：使用適當的容器和樣式類別，讓內容更易讀

---

## 一、純文字投影片結構化問題

### 問題說明
多個投影片只有純文字內容，沒有適當的 HTML 結構（標題、段落、容器等），不符合規範。

### 需要調整的投影片

#### 1. **Line 511-514: 介紹正念**
**現況**：純文字直接放在 `<section>` 中
**調整方案**：
- 添加 `<h2>` 標題：「正念的詞源」
- 抓出內容的重點，以列點的方式呈現，不要有太多文字。
- 使用 `.bunch-word-container` 或 `.content-section` 包裹內容

#### 2. **Line 516-519: 正念翻譯歷史**
**現況**：純文字 + 未格式化的 ref 連結
**調整方案**：
- 添加 `<h2>` 標題：「Mindfulness 的翻譯」
- 抓出內容的重點，以列點的方式呈現，不要有太多文字。
- 使用 `.content-section` 或 `.bunch-word-container` 包裹
- 將 ref 改為超連結格式（見下方「超連結格式問題」）

#### 3. **Line 522-533: 正念並非佛教獨有**
**現況**：純文字 + 未格式化的 ref 連結
**調整方案**：
- 添加 `<h2>` 標題：「正念的多元文化背景」
- 抓出內容的重點，以列點的方式呈現，不要有太多文字。
- 使用 `.bunch-word-container` 包裹（內容較多）
- 將內容拆分為多個 `.content-section` 區塊
- 將 ref 改為超連結格式

#### 4. **Line 537-545: 認知神經科學角度**
**現況**：純文字 + 未格式化的 ref 連結
**調整方案**：
- 添加 `<h2>` 標題：「正念的現代化轉折」
- 抓出內容的重點，以列點的方式呈現，不要有太多文字。
- 使用 `.content-section` 或 `.bunch-word-container` 包裹
- 將 ref 改為超連結格式

#### 5. **Line 548-550: 自主神經系統**
**現況**：純文字
**調整方案**：
- 添加 `<h2>` 標題：「自主神經系統的生理調節機制」
- 抓出內容的重點，以列點的方式呈現，不要有太多文字。
- 使用 `.content-section` 包裹

#### 6. **Line 591-597: 迷走神經**
**現況**：純文字
**調整方案**：
- 添加 `<h2>` 標題：「迷走神經（Vagus Nerve）」
- 使用 `.bunch-word-container` 包裹（內容較多）
- 將內容拆分為多個段落，使用 `<h4>` 作為小標題

#### 7. **Line 659-662: 自我覺察與後設認知**
**現況**：純文字
**調整方案**：
- 添加 `<h2>` 標題：「自我覺察與後設認知」
- 使用 `.content-section` 包裹
- 抓出內容的重點，以列點的方式呈現，不要有太多文字。

#### 8. **Line 665-677: 心中有雜念非常正常**
**現況**：純文字，包含列表內容但未使用列表標籤
**調整方案**：
- 添加 `<h2>` 標題：「正念訓練的四個神經認知階段」
- 使用 `.bunch-word-container` 包裹
- 將四個階段改為 `<ul>` 或 `<ol>` 列表格式
- 每個階段使用 `<h4>` 作為小標題

#### 9. **Line 680-687: 4-7-8 呼吸法**
**現況**：純文字 + 未格式化的 ref 連結
**調整方案**：
- 添加 `<h2>` 標題：「4-7-8 呼吸法」
- 使用 `.step-card` 或 `.content-section` 包裹
- 將步驟改為 `<ol>` 列表格式
- 將 ref 改為超連結格式

#### 10. **Line 690-695: 478 呼吸法的好處**
**現況**：純文字，類似列表但未使用列表標籤
**調整方案**：
- 添加 `<h2>` 標題：「4-7-8 呼吸法的好處」
- 使用 `.content-section` 包裹
- 將好處改為 `<ul>` 列表格式

---

## 二、超連結格式問題

### 問題說明
多處使用 `ref: https://...` 的純文字格式，不符合 HTML 規範，應該改為 `<a>` 標籤。

### 需要調整的位置

#### 1. **Line 518**
**現況**：`ref: https://psychcentral.com/lib/a-brief-history-of-mindfulness-in-the-usa-and-its-impact-on-our-lives`
**調整方案**：
```html
<p style="margin-top: 1.5rem; font-size: clamp(0.9rem, 1.5vw, 1.1rem); color: var(--accent-color);">
    參考資料：<a href="https://psychcentral.com/lib/a-brief-history-of-mindfulness-in-the-usa-and-its-impact-on-our-lives" target="_blank" style="color: var(--accent-color); text-decoration: underline;">PsychCentral - A Brief History of Mindfulness</a>
</p>
```

#### 2. **Line 525**
**現況**：`ref: https://pmc.ncbi.nlm.nih.gov/articles/PMC10063990/`
**調整方案**：
```html
<p style="margin-top: 1rem; font-size: clamp(0.9rem, 1.5vw, 1.1rem); color: var(--accent-color);">
    參考資料：<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10063990/" target="_blank" style="color: var(--accent-color); text-decoration: underline;">PMC - Mindfulness Research</a>
</p>
```

#### 3. **Line 531**
**現況**：`ref: https://plato.stanford.edu/entries/japanese-zen/#TheAdjMin`
**調整方案**：
```html
<p style="margin-top: 1rem; font-size: clamp(0.9rem, 1.5vw, 1.1rem); color: var(--accent-color);">
    參考資料：<a href="https://plato.stanford.edu/entries/japanese-zen/#TheAdjMin" target="_blank" style="color: var(--accent-color); text-decoration: underline;">Stanford Encyclopedia - Japanese Zen</a>
</p>
```

#### 4. **Line 544**
**現況**：`ref: https://www.tandfonline.com/doi/full/10.1080/14639947.2011.564844`
**調整方案**：
```html
<p style="margin-top: 1rem; font-size: clamp(0.9rem, 1.5vw, 1.1rem); color: var(--accent-color);">
    參考資料：<a href="https://www.tandfonline.com/doi/full/10.1080/14639947.2011.564844" target="_blank" style="color: var(--accent-color); text-decoration: underline;">Taylor & Francis - MBSR Definition</a>
</p>
```

#### 5. **Line 569**
**現況**：`ref: https://www.utoledo.edu/studentaffairs/counseling/anxietytoolbox/breathingandrelaxation.html`
**調整方案**：
```html
<p style="margin-top: 1rem; font-size: clamp(0.9rem, 1.5vw, 1.1rem); color: var(--accent-color);">
    參考資料：<a href="https://www.utoledo.edu/studentaffairs/counseling/anxietytoolbox/breathingandrelaxation.html" target="_blank" style="color: var(--accent-color); text-decoration: underline;">UToledo - Breathing and Relaxation</a>
</p>
```

#### 6. **Line 686**
**現況**：`ref: https://www.medicalnewstoday.com/articles/324417`
**調整方案**：
```html
<p style="margin-top: 1rem; font-size: clamp(0.9rem, 1.5vw, 1.1rem); color: var(--accent-color);">
    參考資料：<a href="https://www.medicalnewstoday.com/articles/324417" target="_blank" style="color: var(--accent-color); text-decoration: underline;">Medical News Today - 4-7-8 Breathing</a>
</p>
```

#### 7. **Line 1171**
**現況**：`作業繳交 Google Form: https://forms.gle/JhRrmnsk2kH5Mxv8A 繳交期限 11/28 23:59 前`
**調整方案**：
```html
<p style="margin-bottom: 2rem; font-size: clamp(1.1rem, 2vw, 1.4rem);">
    作業繳交：<a href="https://forms.gle/JhRrmnsk2kH5Mxv8A" target="_blank" style="color: var(--accent-color); text-decoration: underline;">Google Form</a> | 繳交期限：11/28 23:59 前
</p>
```

---

## 三、程式碼區塊格式問題

### 問題說明
程式碼區塊使用了 `<pre><code>` 嵌套，但根據規範應該使用 `.code-block` 類別。

### 需要調整的位置

#### 1. **Line 774-787: 提示詞區塊**
**現況**：使用 `.code-block` 類別
**調整方案**：
- 改為使用 `.prompt-block` 類別（根據 style_1116.md，提示詞應該使用 `.prompt-block`）
- 保持內容不變

#### 2. **Line 796-1085: 程式碼展示區塊**
**現況**：使用 `.code-block` 包裹 `<pre><code>` 嵌套
**調整方案**：
- 保持 `.code-block` 類別
- 移除 `<pre>` 標籤，直接使用 `<code>` 標籤
- 或者保持現狀（因為程式碼較長，`<pre>` 可能有助於保留格式）

**建議**：檢查 `.code-block` 的 CSS 定義，確認是否需要 `<pre>` 標籤。如果 `.code-block` 已經有適當的樣式，可以移除 `<pre>`。

---

## 四、內聯樣式過多問題

### 問題說明
多處使用 `style="..."` 內聯樣式，應該盡量使用 CSS 類別。

### 需要調整的位置

#### 1. **Line 555, 558, 565: 兩欄佈局中的空段落**
**現況**：`<p style="font-size: clamp(2rem, 4vw, 3rem); margin: 1rem 0;"></p>`
**調整方案**：
- 移除這些空段落，或使用 CSS 類別來控制間距

#### 2. **Line 579, 583, 640, 641: 內聯字體大小**
**現況**：多處使用 `style="font-size: clamp(...)"`
**調整方案**：
- 這些內聯樣式可以保留（因為是特定情境的調整），但建議統一檢查是否有重複的樣式可以提取為類別

#### 3. **Line 723-724: 超連結未格式化**
**現況**：URL 直接放在 `<p>` 標籤中
**調整方案**：
- 改為 `<a>` 標籤格式：
```html
<p style="font-size: clamp(1.1rem, 2vw, 1.4rem);">
    <a href="https://www.w3schools.com/html/tryit.asp?filename=tryhtml_basic" target="_blank" style="color: var(--accent-color); text-decoration: underline;">W3Schools Tryit</a>
</p>
<p style="font-size: clamp(1.1rem, 2vw, 1.4rem);">
    <a href="https://codeshack.io/html-viewer/" target="_blank" style="color: var(--accent-color); text-decoration: underline;">CodeShack HTML Viewer</a>
</p>
```

---

## 五、列表格式問題

### 問題說明
部分內容應該使用列表格式但未使用。

### 需要調整的位置

#### 1. **Line 665-677: 四個神經認知階段**
**現況**：純文字列舉
**調整方案**：
- 改為 `<ul>` 或 `<ol>` 列表
- 每個階段使用 `<h4>` 作為標題，內容放在 `<p>` 中

#### 2. **Line 680-685: 4-7-8 呼吸法步驟**
**現況**：純文字列舉
**調整方案**：
- 改為 `<ol>` 列表格式

#### 3. **Line 690-695: 478 呼吸法的好處**
**現況**：純文字列舉
**調整方案**：
- 改為 `<ul>` 列表格式

---

## 六、容器類別使用問題

### 問題說明
部分投影片應該使用 `.scrollable` 類別但未使用，或應該使用特定容器但未使用。

### 需要調整的位置

#### 1. **Line 511-514, 516-519, 522-533, 537-545, 548-550, 591-597, 659-662, 665-677**
**現況**：內容較多但未使用 `.scrollable` 類別
**調整方案**：
- 添加 `.scrollable` 類別到 `<section>` 標籤
- 使用 `.bunch-word-container` 包裹內容（內容較多時）

---

## 七、特殊格式問題

### 1. **Line 1171: 作業繳交資訊**
**現況**：純文字，未格式化
**調整方案**：
- 放在 `.content-section` 或獨立區塊中
- 超連結格式化（見上方）

### 2. **Line 757, 760, 763: code 標籤**
**現況**：使用 `<code>` 標籤但可能沒有樣式
**調整方案**：
- 確認 CSS 中有 `<code>` 的樣式定義
- 如果沒有，添加：
```css
code {
    background: rgba(0, 0, 0, 0.05);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
    color: var(--accent-color);
}
```

---

## 總結

### 主要調整項目
1. **11 個純文字投影片**需要添加標題和適當的容器結構
2. **7 處超連結**需要格式化為 `<a>` 標籤
3. **3 處列表內容**需要改為 `<ul>` 或 `<ol>` 格式
4. **1 處提示詞區塊**需要改為 `.prompt-block` 類別
5. **多處內聯樣式**可以優化但非必須

### 調整優先級
1. **高優先級**：純文字投影片結構化、超連結格式化
2. **中優先級**：列表格式調整、容器類別添加
3. **低優先級**：內聯樣式優化、code 標籤樣式

### 注意事項
- 所有調整都**不改變文字內容**
- 保持現有的視覺效果和功能
- 遵循 `style_1116.md` 的規範和設計原則

