---
title: Google Analyticsのビーコンに効果音をつけてトースト通知する方法
date: 2018-09-06 11:22:00
permalink: demo/ga-notification
tags:
  - Demo
  - Google Analytics
thumbnailImage: //res.cloudinary.com/mak00s/f_auto,w_auto:200:800/demo-ga-notification.png
---

アナリティクスのDEMOページが地味なので、Google Analyticsへデータを送信するたびに音を鳴らしたり通知トーストを表示する仕組みをGTMで実装してみました。とっても実用的で流行しそうですが（笑）、実はいろんな用途で応用できます。
<!-- more -->

## DEMO

[このページ](https://store.concept-diagram.com/ec/html/products/detail/6)にアクセスしてみてください。ページ読み込み時に通常のページビューが計測され、右上に通知が表示されて「ポコっ」と音が鳴ります。

さらに、商品画像を切り替えたり、「お気に入りに追加」をクリックするたびにイベントが計測されて、今度はコインGET音とともに違うデザインの通知が表示されます。

<a href="https://store.concept-diagram.com/ec/html/products/detail/6"><img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/demo-ga-notification.png" alt="" sizes="100vw" /></a>

## 真似してみよう

2017年にanalytics.jsに追加された新機能「[Task](https://developers.google.com/analytics/devguides/collection/analyticsjs/tasks)」の「customTask」を使って、GAへデータが送信される直前の処理を追加します。

### 1. 通知用ライブラリを組み込む

まず、GTMで組み込み変数「**Container ID**」と「**HTML ID**」を有効化しておきます。

次に、通知用のJavaScriptライブラリ「[Toastr](https://codeseven.github.io/toastr/)」を読み込むためのGTMタグを作成します。

{% gist mak00s/884fc489972d0e858842a8ba853d720e %}

単に外部のCSSとJavaScriptファイルをロードするだけですが、この外部JavaScriptファイルがロードされた後にGoogle Analyticsタグを発火させたいので、少し複雑になっています。

そのため、トリガーの指定は不要です。「トリガーがないよ」とアラートが出ますが、気にしないで保存してください。

続いて、（すでに作ってあるはずの）GA基本タグの**詳細設定**を開き、「**タグの順序付け**」の「...**が発効する前にタグを配信**」に上のタグを設定します。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/gtm-tag-sequence.png" alt="" sizes="100vw" />

### 2. データ送信時に処理されるcustomTaskを設定する

customTaskとして以下のような**カスタムJavaScript変数**を作成します(既にある場合は追記)。

{% gist mak00s/333ff4eec07d542f14b35baad7c193fa %}

- MP3ファイルのURLは適宜変えてください
- サウンド再生の実装はシンプル化したので、タイミングや環境によって鳴らないことがあります（WebAudio APIで実装する方が確実）
- Toastrの読み込みや実行に失敗してもGA計測が継続されるように、try-catchで囲んでいます

これをGA設定の「フィールド」に「**customTask**」として追加します。その方法については「[GTMでGoogleアナリティクスのClient IDを取得する一番確実で楽な方法](https://makoto-shimizu.com/news/how-to-measure-google-analytics-client-id-with-gtm-2017/)」を参照してください。

## いろいろ応用できる

以上、customTaskの活用方法について紹介しました。

今回のGA計測の通知は誰も真似しなさそうですが（笑）、以下のような応用が可能です。

#### 応用例
- GDPRのオプトインFlagに応じて計測を停止したりパーソナルデータのみ匿名化する
- HTMLでベタ書きされたイベント計測の修正に時間がかかるのでGTMで送信前にインターセプトしてデータを改変する
- GTMのUIでは指定できないGAの詳細設定を行う
- ClientIDやTimestampなどをカスタムディメンションで計測する
- 外部APIと連携する
- GAの計測データをクラウド（GCPなど）に送信して別途記録する