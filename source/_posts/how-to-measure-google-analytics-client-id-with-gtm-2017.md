---
title: GTMでGoogleアナリティクスのClient IDを取得する一番確実で楽な方法（2018年版）
date: 2017-10-12 13:27:00
tags:
  - Google Analytics
  - GTM
thumbnailImage: //res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1523889243/gtm-ga-client-id-01.png
---
GTM (Google Tag Manager) でGAのClient IDを取得する最新で確実な方法について。
<!-- more -->

## 今までの問題点
Cookieから取得する、Callbackで取得するなど、いろいろな方法がありましたが、新規訪問の最初の1ページ目で取得できない、無駄なイベントトラッキングが増える、GAのタグをそのままカスタムJavaScriptタグとして貼り付けるので タグマネUIの便利機能を使えない、などの 不便な点があり、イマイチな状況が続いていました。

2017年10月の今では、7月に最近GA (analytics.js)に追加されたTaskという機能を使うのが一番楽で確実です。

### 1. GA管理画面でカスタムディメンションを作る
Client IDを格納するカスタムディメンションをGAの管理画面で作成しておきます。範囲はユーザーで。

### 2. カスタムJavaScript変数を作る
カスタムJavaScript変数を作って以下のコードを入力します。

```javascript
function() {
  return function(model) {
    model.set('dimension1', model.get('clientId'));
  }
}
```

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1523889243/gtm-ga-client-id-01.png" alt="" sizes="100vw" />
* カスタムディメンションの番号は適宜変更してください

### 3. customTaskを追加する
GAのタグ（または使っている場合はGA設定の変数）で、「customTask」という名前のフィールドを作成し、値で前述の変数を指定します。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1523889243/gtm-ga-client-id-02.png" alt="" sizes="100vw" />
* フィールド名の名前は変更しないでください（頭のcは小文字、スペース無し）

はい、これだけ。簡単ですねー。

とはいえ、公開前のテストをお忘れなく。

元ネタ：[#GTMTips: Use customTask To Access Tracker Values In Google Tag Manager](https://www.simoahava.com/gtm-tips/use-customtask-access-tracker-values-google-tag-manager/) - Simo Ahava's blog

2018年7月追記：GTMを使わない場合はGAタグのsend previewよりも上に以下のコードを追加します。

 ga('set', 'customTask', function(model) {
   model.set('dimension9', model.get('clientId'));
 };
