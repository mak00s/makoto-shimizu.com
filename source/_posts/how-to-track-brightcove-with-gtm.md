---
title: Brightcove動画の再生完了をGTMとGAで簡単に計測する方法 (2019年版)
date: 2019-07-04 07:00:00
tags:
  - Google Analytics
  - GTM
thumbnailImage: //res.cloudinary.com/mak00s/f_auto,w_auto:200:800/brightcove-gtm-ga
---
企業で採用されることが多いBrightcove動画。動画ごとの再生回数や完了はBrightcoveの管理画面でも調べられますが、Google AnalyticsやAdobe Analyticsなどのサイト内の行動データと統合すると、顧客体験を点ではなく線で理解できるようになります。

- どの広告からの訪問者がコンテンツや動画の消費につながるのか？
- 動画の閲覧体験はサイトへの定着に寄与するのか？
- ニーズや意識を広げる系の動画によって、興味関心や検討対象の商品ジャンルは広がるのか？
- 手厚いサポート系の動画はNPSに影響を与えるのか？

Brightcoveの計測をGAやAAで実装する機会は数年おきに何度もあるのですが、YouTubeと違ってBrightcoveの情報は少なく、公式サイトも散らかっていて日本語が変（ネイティブのレビューをしていない機械翻訳？）なので、メモを残しておきます。
<!-- more -->

## 前提となるBrightcoveの実装方法

Brightcoveの動画が以下のような形式でページに埋め込まれていて、そのページにはすでにGTMとGAが導入されているとします。

```html
<video
 data-video-id="xxxxxxxx"
 data-account="yyyyyyyyy"
 data-player="zzzzzzzz"
 data-embed="default"
 data-application-id controls class="video-js"></video>

<script src="//players.brightcove.net/yyyyyyyyy/zzzzzzzz_default/index.min.js"></script>
```

## GTMで計測を実装する
Google Tag Managerの標準機能であるYouTube計測機能を流用することで、最低限の手間とコードで実装するという方針で進めます。

{% alert info %}
以下で紹介するのはBrightcoveのGAプラグインを使わない方法です。Brightcoveのアカウントがなくても計測開始できます。
{% endalert %}

### タグを作る

まず、埋め込まれた一つまたは複数の動画にイベント処理を仕込むため、
以下のコードをGTMのHTMLタグとして作成します。
```html
<script>
var track = function(a, b){
  dataLayer.push({
    'event': 'gtm.video',
    'gtm.videoTitle': a,
    'gtm.videoStatus': b
  });
}
for (var i in videojs.getPlayers()){
    videojs(i).ready(function(){
    this.one('play', function(){
      track(this.mediainfo.name, 'start');
    });
    this.one('ended', function(){
      track(this.mediainfo.name, 'complete');
    });
  });
}
</script>
```

- 同じページ内に複数の動画がある場合でも対応可能
- 再生開始と再生完了のみ計測
- 動画IDは内容を把握しにくいので動画タイトルを取得
- ページのHTMLが完成してから実行したいので、トリガーはDOM Ready以降で

{% alert warning %}
BrightcoveのJavaScriptライブラリ（videojs）がロードされていないとエラーになるので、このタグはBrightcoveの動画が存在するページでのみ発火させます（タイミングにも注意）
{% endalert %}

### 変数を有効化する

このタグが送信するdataLayerを受け取るための組み込み変数「Video Status」と「Video Title」を有効にします。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/gtm-brightcove-var" alt="" sizes="100vw" />

### トリガーを作る
dataLayerへpushされるeventを受け取るためのトリガーを作成します。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/gtm-brightcove-trigger" alt="" sizes="100vw" />

- YouTubeの動画計測機能を流用するので、トリガータイプは「YouTube動画」

### タグを作る
続いて、上記のトリガーで発火するGA計測用のタグを作ります。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/gtm-brightcove-tag" alt="" sizes="100vw" />

- イベントカテゴリ、アクション、ラベルに何を入れるかはお好みで
- Video StatusとVideo Titleは、先ほど有効化した組み込み変数

これで、動画の再生開始と再生完了時にイベント計測できるようになります。

## Google Analyticsで目標を設定する
GAのイベント計測だけだと「どの動画が何回再生開始や完了されたのか」という点の分析になってしまいがちなので、動画の再生完了（や再生開始）をGAの目標として設定します。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/gtm-brightcove-ga-goal" alt="" sizes="100vw" />

この設定によって再生完了を指標として使えるようになるので、以下のように顧客の長期的な変化を把握できるカスタマーアナリティクス流のレポートを作れるようになります。
<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/gtm-brightcove-report" alt="" sizes="100vw" />

## 今回のポイント
- BrightcoveのAPIを使って動画タイトルや再生開始、再生完了のタイミングを取得する
- 分析しやすいように最低限のデータのみ取得する
- タグマネージャーの標準機能を使ってなるべく楽をする
- レポートはカスタマー視点で作る

必要に応じてカスタマイズや応用してみてください。
