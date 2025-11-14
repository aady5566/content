# 專案：期中成績計算 (V2.3)
## 計分邏輯與曲線校正

---

### Slide: 標題頁

# 期中成績計算
## 計分邏輯與曲線校正

---

### Slide: 目標 (The Goal)

**標題：** 目標：公平、有區別力、符合教學期望

1.  **整合 (Integrate):**
    * 合併 5 次作業 (50%) 與 1 次期中報告 (25%)。
2.  **計算 (Calculate):**
    * 計算出 0-100 範圍的「原始分數」。

---

---

### Slide: 平時作業

**標題：** 平時作業

* **資料：** 5 次作業
* **尺度：** 每次作業皆已評定為 1-5 分，依照作業完整度、作業指示要求、產出品質進行評分

---

### Slide: 期中報告

**標題：** 輸入變數 (B): 期中報告

腳本 (Script) 會讀取 1 個報告欄位 (例如 `AE`)。

* **重要：** 腳本讀取的是一個**已計算完成的「個人期中報告成績」**(1-5 分)。
* 此分數已綜合考量 (Rubric) 以下指標：
    * 內容完整性 (30%)
    * 執行與分析 (30%)
    * 簡報製作 (10%)
    * 口頭報告 (10%)
    * 問答 (20%)
* 此分數已納入「最佳貢獻者」或「組內互評」的個人加分。

---




---

### Slide: 步驟一：計算「原始分數」與加權

**標題：** 步驟二：計算「原始分數」 - 標準化

**A. 標準化 (Standardization)**
將 1-5 分的尺度，轉換為 0-1 (0% ~ 100%) 的表現百分比。

* **作業平均 ($A_{avg}$):** $$S_{hw} = \frac{A_{avg} - 1}{4}$$
* **期中報告 ($M_{pers}$):**
    $$S_{rep} = \frac{M_{pers} - 1}{4}$$

    **B. 加權平均 (Weighted Average)**
根據 (Slide 3) 的 **2:1** 權重進行加權。

$$W_{avg} = \frac{(S_{hw} \times 2) + (S_{rep} \times 1)}{3}$$

**C. 原始分數 (Original Score)**
將加權後的百分比 (0-1) 轉為 0-100 分。

$$Score_{Orig} = W_{avg} \times 100$$

---

### Slide: 步驟二：找出全班基準與校正

**標題：** 步驟三：找出全班基準與校正

腳本 (Script) 會先計算出**全班**的「原始分數」($Score_{Orig}$)。

* **範例數據:**
    `[66.3, 51.7, 36.7, 33.3, ... , 22.0, 69.0]`

然後，找出這群分數中的實際最大值與最小值：

* **實際最低分 ($ActualMin$):** `22.0`
* **實際最高分 ($ActualMax$):** `69.0`

重新校正「原始分數」，使其符合教學目標區間 (Target Range)。

* **新最低分 ($NewMin$):** `60.0`
* **新最高分 ($NewMax$):** `92.0`

$$Score_{Final} = \text{NewMin} + \left( \frac{Score_{Orig} - \text{ActualMin}}{\text{ActualMax} - \text{ActualMin}} \right) \times (\text{NewMax} - \text{NewMin})$$

**套入 V2.3 參數：**

$$Score_{Final} = 60 + \left( \frac{Score_{Orig} - 22.0}{69.0 - 22.0} \right) \times (92 - 60)$$

---

### Slide: 最終公式 (The Formula)

**標題：** 最終公式

$$Score_{Final} = \text{NewMin} + \left( \frac{Score_{Orig} - \text{ActualMin}}{\text{ActualMax} - \text{ActualMin}} \right) \times (\text{NewMax} - \text{NewMin})$$

**套入 V2.3 參數：**

$$Score_{Final} = 60 + \left( \frac{Score_{Orig} - 22.0}{69.0 - 22.0} \right) \times (92 - 60)$$

$$Score_{Final} = 60 + \left( \frac{Score_{Orig} - 22.0}{47} \right) \times 32$$

---

### Slide: 期中報告簡報分數

group score
1 2.6
2 3.8
3 4.2
4 3
5 3

---

### Slide: 最佳貢獻者

**標題：** 期中簡報，貢獻者加分

**被提名的組員貢獻者：**
汪宏駿
温睿奇
何圳秞
張鈺彗
陳芯瑩
楊沁儒
黃郁昕
周辰瑄
曹鈞諺

原始總分增加 6.67 分（加大粗體）