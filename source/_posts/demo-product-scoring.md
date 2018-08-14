---
title: Demo 02. ECサイトで商品の検討スコアリング
date: 2018-08-14 23:49:00
permalink: demo/product-scoring
tags:
  - Demo
thumbnailImage: 
---

どの商品をどれくらい真剣に検討しているかを数値化します。[このダミー商品ページ](https://store.concept-diagram.com/ec/html/products/detail/1)を開いて、写真の切り替え、サイズの選択、レビューの全体表示、下までスクロールしてフッタを1秒以上表示すると、それぞれ点数が加算されていきます。
<!-- more -->
{% alert info %}
GAサーバーへデータが送信されてスコアが加算された時にマリオのコインGET音が鳴ります
{% endalert %}

- 結果は[このGoogle Sheets](https://docs.google.com/spreadsheets/d/18O428V6gBE8X20WKqt7bHgDs9ePcCTCcouOFHTMRgyY/edit?usp=sharing)に1時間に1回、自動反映されます。

#### 真似してみよう
1. 商品詳細ページ上の検討系アクションをGAでイベント計測する
2. Google Sheetを作成し、Googleアナリティクスのアドオンを使ってデータを抽出する