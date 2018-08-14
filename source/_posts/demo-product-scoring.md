---
title: Demo 02. ECサイトで商品の検討スコアリング
date: 2018-08-14 23:49:00
permalink: demo/product-scoring
tags:
  - Demo
thumbnailImage: 
---

効果測定はアナリティクス活用方法の１つでしかなく、顧客理解やセグメント発見も重要です。例えばECにおける売上データは事業パフォーマンスの把握に役立ちますが、顧客の理解には不十分です。そこで、見込み顧客がどの商品をどれくらい真剣に検討しているかを数値化するデモを作ってみました。サンプルサイトと実データのレポートも大公開！
<!-- more -->

[このダミー商品ページ](https://store.concept-diagram.com/ec/html/products/detail/1)を開いて、以下の検討アクションを行うと、それぞれ点数が加算されていきます。
- 写真の切り替え
- サイズの選択
- レビューの全体表示
- 下までスクロールしてフッタを1秒以上表示

{% alert info %}
GAサーバーへデータが送信されてスコアが加算された時にマリオのコインGET音が鳴ります
{% endalert %}

- 結果は[このGoogle Sheets](https://docs.google.com/spreadsheets/d/18O428V6gBE8X20WKqt7bHgDs9ePcCTCcouOFHTMRgyY/edit?usp=sharing)に1時間に1回、自動反映されます。

#### 真似してみよう
1. 商品詳細ページ上の検討系アクションをGAでイベント計測する
2. Google Sheetを作成し、Googleアナリティクスのアドオンを使ってデータを抽出する（上記のシートを参考に）