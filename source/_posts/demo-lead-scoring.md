---
title: Demo 01. B2Bのリードを閲覧履歴でスコアリング
date: 2018-07-17 13:49:00
permalink: demo/lead-scoring
tags:
  - Demo
thumbnailImage: //res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1532158122/demo-lead-scoring.png
---

効果測定はアナリティクス活用方法の１つでしかなく、顧客理解やセグメント発見も重要です。例えば、資料請求のリード一覧にGAの閲覧履歴を合わせると、見込み顧客の関心エリアや本気度がわかるので、営業アプローチする際の参考になります。有料ツール（MA）を使わずに無料GAで実装してみました。
<!-- more -->

以下のフォームに記入して送信すると、その内容とGAの閲覧履歴データが結合されてGoogle Sheetsに自動反映されます。

{% raw %}
<div class="form-box">
<form action="javascript: postToGoogle()">
    <b>夏は好きですか？</b>
    <div>
    <input type="radio" id="qs1" name="qs1" value="はい" />
    <label for="qs1">はい</label>　
    <input type="radio" id="qs2" name="qs1" value="いいえ" />
    <label for="qs2">いいえ</label>
    </div>
    <div>
    <b>理由は？</b>
    <textarea name="kotae"></textarea>
    </div>
    <button type="submit" class="post-action-btn btn" disabled>
      送信する
    </button>
</form>
</div>
<style>
.form-box {
  max-width: 400px;
  margin: auto;
  padding: 30px;
  border: 10px solid #f2f2f2;
}
textarea {
  width: 100%;
}
</style>
{% endraw %}

- 送信結果は[このSpreadsheetに反映される](https://docs.google.com/spreadsheets/d/1LJsKR3eyBy34apzdVgtYV8d3mZT-mp3kA0pgV7oLAiw/edit#gid=418492740)ので個人情報は入力しないでください
- GAのデータは１時間ごとに更新されます

#### 真似してみよう
1. [Google Forms](https://www.google.com/forms/about/)でフォームを作る
2. 本ページを参考にしてフォームのHTMLページを作る
3. フォームを含むサイト全体にGAを導入し[client IDをカスタムディメンションへ入れる](/news/how-to-measure-google-analytics-client-id-with-gtm-2017/)
4. 回答が自動記入されるGoogle SheetsにGAのアドオンを入れてデータを抽出
5. [サンプル](https://docs.google.com/spreadsheets/d/1LJsKR3eyBy34apzdVgtYV8d3mZT-mp3kA0pgV7oLAiw/edit#gid=406719613)をコピーして参考にし、ビジュアライズ
