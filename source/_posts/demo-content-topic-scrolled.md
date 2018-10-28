---
title: Demo 04. コンテンツのトピックを精読ベースでスコアリング
date: 2018-09-10 10:05:00
permalink: demo/content-topic-scrolled
tags:
  - Demo
  - Google Analytics
thumbnailImage: //res.cloudinary.com/mak00s/f_auto,w_auto:200:800/demo-content-topic-scrolled.png
---

効果測定はアナリティクス活用方法の１つでしかなく、**顧客理解やセグメント発見も重要**です。例えばコンテンツマーケティングにおける単純なページ閲覧数や訪問者数は**企業努力の効果を測定する指標**でしかなく、顧客の理解には役立ちません。一人ひとりのサイト**体験をデータを活用して理解**できれば、コミュニケーション施策の立案や改善が可能になります。

そこで、訪問者がどんなトピックのコンテンツをじっくり読んでいるかをデータで把握できるデモを作ってみました。実データのレポートもリアルタイム公開！
<!-- more -->

## DEMO

本サイトに全体的に導入しています。例えばこのページを下の方までスクロールしてタグや関連リンクのエリアを**１秒以上表示させる**と、ポコっと音が鳴って画面右上に通知が表示され、そのページに設定されたトピック（タグ）である「Demo」と「Google Analytics」にそれぞれ１点が加算されます。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/demo-content-topic-scrolled.png" alt="" sizes="100vw" />

{% alert info %}
GAサーバーへデータが送信されると、画面右上に通知が表示されます
{% endalert %}

### ポイント
- 単なるページ表示ではなく、スクロール後の表示時間で精読を判定
- 長いランディングページでも複数のエリア毎に精読を判定できる
- 訪問者の関心をタグでざっくり把握できる

## Google Sheetsのレポートに自動反映される

タグごとの精読状況がわかる[Google Sheetsを公開](https://docs.google.com/spreadsheets/d/1Wg81YpMDcZ2VLWAhXqlg_GU1pQRCrWy4CZGJZTXfez0/edit#gid=0)しておきます。

<a href="https://docs.google.com/spreadsheets/d/1Wg81YpMDcZ2VLWAhXqlg_GU1pQRCrWy4CZGJZTXfez0/edit#gid=0"><img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/demo-content-topic-report.png" alt="" sizes="100vw" /></a>

- データは1時間に1回、自動反映されます。
- スプレッドシートをコピー（複製して保存）すると自由に編集できるようになります

## 真似してみよう
1. どの要素がどこまで何秒間表示されたら精読とみなすかを決める
2. それを条件とするGTMの「要素の表示」トリガーを作る
3. そのトリガーでGTMのGAタグを作り、イベントを計測
4. Google Sheetを作成し、Googleアナリティクスのアドオンを使ってイベントデータを抽出する（上記のシートを参考に）

↑↑↑↑↑（コンテンツはここまで）↑↑↑↑↑