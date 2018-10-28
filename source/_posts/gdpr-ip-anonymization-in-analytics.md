---
title: GDPR対策のためにアナリティクスのIPアドレスを匿名化する方法
date: 2018-05-18 12:52:00
tags:
  - Privacy
  - Google Analytics
thumbnailImage: //res.cloudinary.com/mak00s/f_auto/eu-flag.png
---

[GDPRの対策としてWebアナリストがすべきこと](/news/gdpr-for-analysts/)の記事の中で取り上げた、不要な個人データを匿名化する方法の一つとしてGAやAAでIPアドレスを匿名化する方法と注意点について。GAの場合、訪問者のIPアドレスをレポート画面で表示することはできませんが、システム内部に保存されています。GDPRでは、個人データを取得し保存しているだけで、ツールベンダーや代理店ではなく事業会社のデータ管理責任が問われるので要注意。
<!-- more -->

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/gdpr-ip-anonymization-in-analytics.png" alt="" sizes="100vw" />

{% alert info %}
日本向けの日本語のみサイトでここまで対応すべきか、は法務と相談してください。
{% endalert %}

## Googleアナリティクスの場合

[GA公式ヘルプ](https://support.google.com/analytics/answer/2763052?hl=ja)を見ながら設定しましょう。

GAのタグをHTMLソースにベタ張りしている場合は、**pageviewを送信するよりも前（上）に以下のようなコードを追加**します。

gtag.jsの場合
```javascript
gtag('config', 'UA-********-*', { 'anonymize_ip': true });
```
ga.jsの場合
```javascript
ga('set', 'anonymizeIp', true);
ga('send', 'pageview');
```

analytics.jsの場合
```javascript
_gaq.push(['_gat._anonymizeIp']);
_gaq.push(['_trackPageview']);
```

{% alert warning %}
実装方法によっては他の書き方もあります
{% endalert %}

Google Tag ManagerでGAを実装している場合は、GAタグの詳細設定で「**anonymizeIp**」というフィールドを追加します。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/gtm-ga-ip-anonymization.png" alt="" sizes="100vw" />

{% alert success %}
プライバシー保護を強化するため、ついでにforceSSLも設定しておくと良いでしょう。
{% endalert %}

### 検証方法
GAのビーコンに **&aip=** が付与されていれば成功です。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/ga-ip-anonymization-debugging.png" alt="" sizes="100vw" />

サーバー側でデータが処理・保存されるよりも前の段階で、IPアドレスの一部が「0」で置き換えられるようになります。

### IPフィルタは更新が必要

自分や社内からのアクセスを除外するためにIPを使ってフィルタしている場合は、最後の桁（オクテット）が0で置き換わるので、IPの指定方法を「**前方が一致**」方式に変えるなどの対応が必要です。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/ga-filter-by-ip.png" alt="" sizes="100vw" />

{% alert warning %}
0〜255の範囲でざっくりとフィルタされるのが困る場合は、GAのフィルターではなくタグマネージャーやブラウザプラグインなどの別の除外方法を検討しましょう。
{% endalert %}

### 地域レポートの精度が落ちる

IPアドレスで判定している地域（都道府県・市区町村）のレポートは、元データの粒度が荒くなるので、精度が下がります。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/ga-report-region-compared.png" alt="設定前後の比較" sizes="100vw" />

GAのIPアドレスを他のシステムと連携させていないか確かめるなど、影響範囲を把握してから設定を変更すると良いでしょう。

## Adobe Analyticsの場合

管理画面（レポートスイートマネージャー）の「一般的なアカウント設定」だけで対応可能です。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/aa-rs-manager-ip-obfuscation.png" alt="設定前後の比較" sizes="100vw" />

#### IPアドレスの最後のオクテットを0に置き換える
GAと同じ方式です。IP除外よりも先に置き換えられるので、GAと同様にフィルタ設定を見直す必要があります。

#### IPアドレスを不明化
IPアドレスをハッシュ化された文字列で置き換えます。IP除外や地域特定の処理が行われた後に不明化されるので、IP除外の設定変更は不要です。

#### IPアドレスを削除
IPアドレスを一律の固定文字列（x.x.x.x）で置き換えます。EMEA向けのレポートスイートでは、これがデフォルトで有効になります。IP除外や地域特定の処理が行われた後に削除されるので、IP除外の設定変更は不要です。