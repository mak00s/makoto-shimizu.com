---
title: GTMでGoogleアナリティクスのアクセス時間を計測しよう
date: 2017-10-24 18:00:00
tags:
  - Google Analytics
  - GTM
thumbnailImage: /images/ga/custom-dimension-timestamp.png
---

Googleアナリティクスでカスタマー（ユーザー）一人ひとりの行動を分析（＝カスタマーアナリティクス）するためには、Googleアナリティクスのカスタムディメンションに**Client IDとタイムスタンプ**を格納しておき、ヒット単位のデータをGAから取り出して時系列で並べて処理・集計する必要があります。
<!-- more -->

GTMでGoogleアナリティクスのカスタムディメンションにClient IDをセットする方法については、[前回の記事](/news//how-to-measure-google-analytics-client-id-with-gtm-2017/)で紹介しました。今回は、さらにGTMでアクセス時間（タイムスタンプ）をセットする方法について紹介します。

## なぜタイムスタンプもカスタムディメンションに入れるのか？

Googleアナリティクスに標準装備されている「日付」(ga:date)、「時間」(ga:hour)、「分」(ga:minute)のディメンションを取り出して結合させることもできますが、

* 秒単位が無い
* APIで一度に取り出せるディメンションの最大数７のうち３つを消費してしまう

というデメリットがあるので、秒単位のタイムスタンプをカスタムディメンションに格納しておく方がベターです。

Simo Ahava氏はさらに[セッションIDも取得](https://www.simoahava.com/analytics/improve-data-collection-with-four-custom-dimensions/)することを推奨していますが、[ga:sessionCount](https://developers.google.com/analytics/devguides/reporting/core/dimsmets#view=detail&group=user&jump=ga_sessioncount)などでも代用可能なので、私が分析するサイトにはClient IDとこのタイムスタンプを標準導入しています。

## 1. GA管理画面でカスタムディメンションを作る
Client IDを格納するカスタムディメンションをGAの管理画面で作成しておきます。時間はヒット単位で変わっていくので、範囲は「ヒット」で作成します。

## 2. GTMのカスタムJavaScript変数を作る

<img src="//res.cloudinary.com/mak00s/image/upload/v1523899539/GTM-Timestamp-variable.png" alt="" sizes="100vw" />

カスタムJavaScript変数を作って、以下のようなコードを入力します。

```javascript
function() {
    var tz = -9, // JST
        now = new Date(Date.now() - (tz * 60 - new Date().getTimezoneOffset()) * 60000),
        pad = function (n){return n<10 ? '0'+n : n};
    return now.getFullYear()
        + '-' + pad(now.getMonth()+1)
        + '-' + pad(now.getDate())
        + ' ' + pad(now.getHours())
        + ':' + pad(now.getMinutes())
        + ':' + pad(now.getSeconds());
}
```

* ローカルタイムに関わらず強制的に日本時間に変換しています
* 必要に応じてミリ秒を追加してください

## 3. GTMの変数を作る
GAのタグまたはGA設定の変数で、1で作成したインデックス（番号）のカスタムディメンションに2の変数を指定します。

<img src="//res.cloudinary.com/mak00s/image/upload/v1523899538/GTM-Timestamp-Custom-Dimension.png" alt="" sizes="100vw" />

* インデックスの数字はプロパティの設定次第なので適宜変更してください

## 4. 確認する
カスタムレポートを作って確認します。

<img src="//res.cloudinary.com/mak00s/image/upload/v1523899539/GTM-Timestamp-Report.png" alt="" sizes="100vw" />

以上、簡単ですねー。過去のデータは取得できないので、早めに設定しておくことをお勧めします。

{% alert success %}
さらに、Client ID（Cookieに格納されるランダムのID）も別のカスタムディメンションへ入れるのがオススメです。一人ひとりの行動データをAPIやGoogle Sheetsで抽出できるようになります。
詳しくはこちら：[GTMでGoogleアナリティクスのClient IDを取得する](/news/how-to-measure-google-analytics-client-id-with-gtm-2017/)
{% endalert %}

Client IDとタイムスタンプをカスタムディメンションに入れるとどんな分析が可能になるかについては後日に。