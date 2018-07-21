---
title: Demo
date: 2018-07-17 13:49:00
comments: false
---

カスタマーアナリティクスを体感できるDemoです。

## #01. B2Bのリードを閲覧履歴でスコアリング
資料請求のリード一覧にGAの閲覧履歴を合わせると、関心エリアや本気度がわかるので、営業アプローチの参考になります。有料ツール（MA）を使わずに無料GAで実装してみました。
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
    <b>ニックネーム</b>
    <textarea name="feed"></textarea>
    </div>
    <button type="submit" class="post-action-btn btn">
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

- 手抜き実装なので送信しても画面は変わりません
- 送信結果は[このページに反映されます](https://docs.google.com/spreadsheets/d/1LJsKR3eyBy34apzdVgtYV8d3mZT-mp3kA0pgV7oLAiw/edit#gid=418492740)
 - ので個人情報は入力しないでください
 - GAのデータは１時間ごとに更新されます

#### 真似する方法
1. [Google Forms](https://www.google.com/forms/about/)でフォームを作る
2. このページを参考にしてフォームのHTMLページを作る
3. そのページにGAを導入し[client IDをカスタムディメンションへ入れる](/news/how-to-measure-google-analytics-client-id-with-gtm-2017/)
4. 回答が記入されるGoogle SheetsにGAのアドオンを入れてデータ抽出
5. [サンプル](https://docs.google.com/spreadsheets/d/1LJsKR3eyBy34apzdVgtYV8d3mZT-mp3kA0pgV7oLAiw/edit#gid=406719613)を参考にまとめシートを作る

## #02. ECサイトの検討・回遊スコアリング
商品の検討度合いや、関心商品カテゴリの広がり、価格帯の高まりといった心理の変化をスコアリングする方法について。
（準備中）

## #03. GAデータのクロスデバイス対応
ログインできるサイトで会員IDを取得したGAデータを処理してデバイスやブラウザを超えた人単位の分析ができるかのデモ。
（準備中）
まず[元データ](https://docs.google.com/spreadsheets/d/1cxbK9nelOBEL7KAhiha9fsJ0Gcw9X7aXQykPGej7T6Q/edit#gid=613290869)を作りました。
