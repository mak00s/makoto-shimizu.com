---
title: キャンペーン用URLパラメータは#を使えばキレイにできる
permalink: hash-for-campaign-tracking
date: 2011-07-07 00:36:59
categories: 
tags:
- Google Analytics
---
流入元を特定するためにURLにパラメータを付与するのはデメリットが多いので、ハッシュを使ってキレイに消し去る方がベターです。その方法を紹介します。
<!-- more -->

## リファラの代わりにURLパラメータを使うようになった背景
サイトにどこから訪問したかを特定するため、アクセス解析のツールはブラウザが送信するリンク元のURL（リファラー）を使いますが、リファラーは完全ではなく、URLがセットされないことがあります。

リファラーが使えない場合のために普及したのが、リンク先URLのクエリ文字列（[RFC 3986の定義](http://tools.ietf.org/html/rfc3986#section-3.4)では、URI中の「?」以降の文字列、ただし「#」以降を含まない）にパラメータを追加する方法です。

### Adobe Analyticsの場合
    http://www.cms-ia.info/?scid=tw20110718

### Google Analyticsの場合
    http://www.cms-ia.info/?utm_source=Twitter&amp;utm_medium=Social&amp;utm_campaign=20110718

ツールに関わらず基本は同じですが、Adobe Analyticsは一つのパラメータのみを付与し、計測後にそのメタデータをCSV(TSV)でサーバーにアップロードするので、URLは短めです。

一方、Google Analyticsは決められた種類のメタデータをURLに含めるため、URLが長くなりがちです。

## クエリ文字列にパラメータを足す方式のデメリット
この方式のデメリットについては、Web担当者Forumの安田編集長が「[長くて汚いutm_*パラメータ付きURLをキレイにするGoogle Analytics用の少しマニアックなスクリプト](https://web-tan.forum.impressrd.jp/e/2010/11/02/9114)」でまとめられたように、

- 見た目に悪い
- メールやTwitterでURLを伝えにくい
- 検索エンジンのリンク評価が分散される
- ソーシャルブックマークなどが分散される

という４つのデメリットがあります。また、

- パラメータ付きのURLが別の場所で流通してしまい、計測の精度が落ちる
- 動的プログラムとパラメータ名がコンフリクトするリスクがある

というデメリットもあります。

## リダイレクトという解決策
この解決策として、計測した後にパラメータなしのページへリダイレクトし、その場合の読み込みはGoogle Analyticsのページビューとしてカウントしない、という方式もありますが、

- 実装が少し複雑
- Google Analytics以外に導入しているツールがある場合はそれぞれ個別対応が必要
- 再読み込みするのでユーザーにとっての体験が犠牲になる

というデメリットが残ります。

そこで、少し割り切った妥協案を考えてみました。

## ハッシュという解決策

- URLのタグ付にクエリ文字列「**?**」ではなくハッシュ「**#**」を使う
- 計測後にページを再読み込みすることなく#以降を消す（ただしURLの最後に「#」が残る）
- HTML5対応ブラウザのみ#以降を完全に消す

実装は割とシンプルです。

### Google Analyticsの場合

### 1.ハッシュに対応するため、Google Analyticsの計測タグに下記を追加

    _gaq.push(['_setAllowAnchor', true]);

これだけで、

    http://demo.ga7.org/hash.html#utm_source=cms-ia&amp;utm_medium=web&amp;utm_campaign=blog0727

というURLを認識できるようになります。

### 2.計測後にURLを操作するためのコールバック関数を指定
非同期の場合、関数そのものをpushすると、trackPageviewが実行された後にその関数が実行されるようになります

{% gist mak00s/b4c4b3d1281dc46978544ee824867380 %}

- クロスドメインの_linkerでhashを使う設定にした場合のURLも認識できます
- HTML5対応ブラウザでは、計測後に「#」以降が完全に消えます。
- 未対応ブラウザだと、URLの最後に「#」だけ残り、ブラウザの履歴に元のURLが残ります（何もしないよりは良いですよね）


### Adobe Analyticsの場合

### 1. クエリのかわりにhashを読むプラグインを導入する
[Kevinのサイト](http://webanalyticsland.com/sitecatalyst-implementation/track-hash-query-parameters/)からダウンロードしてください。

### 2. キャンペーン変数をセットする行を以下のように書き換える。
{% gist mak00s/15d0fed9cb242cc742c65adcccc19d3c %}

### 3. s.t();の後に下記を追加する
{% gist mak00s/fcff3d70aa8b4690bb9e49c38f726617 %}