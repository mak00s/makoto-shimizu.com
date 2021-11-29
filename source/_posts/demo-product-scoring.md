---
title: Demo 02. ECサイトで商品の検討スコアリング
date: 2018-08-15 00:00:00
permalink: demo/product-scoring
tags:
  - Demo
  - Google Analytics
thumbnailImage: //res.cloudinary.com/mak00s/f_auto,w_auto:200:800/demo-product-scoring.png
---

効果測定はアナリティクス活用方法の１つでしかなく、顧客理解やセグメント発見も重要です。例えばECにおける売上データは事業パフォーマンスの把握に役立ちますが、顧客の理解には不十分です。
そこで、見込み顧客がどの商品をどれくらい真剣に検討しているかを数値化するデモを作ってみました。サンプルECサイトと実データのレポートも大公開！
<!-- more -->

## DEMO

サンプルサイトの[この商品詳細ページ](https://store.concept-diagram.com/products/detail/3)を開いて、以下のいずれかの検討アクションを行うと、それぞれ点数が加算されていきます。
<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/demo-product-scoring-page.png" alt="" sizes="100vw" />

- 写真の切り替え
- サイズの選択
- お気に入り追加
- メーカーサイトへのリンクのクリック
- レビューの全体表示

{% alert info %}
GAサーバーへデータが送信されてスコアが加算されると、マリオのコインGET音が鳴ります
{% endalert %}

## Google Sheetsのレポートに自動反映される

結果は[このGoogle Sheets](https://docs.google.com/spreadsheets/d/18O428V6gBE8X20WKqt7bHgDs9ePcCTCcouOFHTMRgyY/edit?usp=sharing)に1時間に1回、自動反映されます。

- スプレッドシートをコピー（複製して保存）すると自由に編集できるようになります

## 真似してみよう
1. 商品詳細ページ上の検討系アクションをGAでイベント計測する
2. Google Sheetを作成し、Googleアナリティクスのアドオンを使ってデータを抽出する（上記のシートを参考に）
