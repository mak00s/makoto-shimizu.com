---
title: GDPR対策のためにGAとAAのIPアドレスを匿名化する方法
date: 2018-05-18 12:52:00
tags:
  - Privacy
thumbnailImage: //res.cloudinary.com/mak00s/image/upload/f_auto/v1526433637/eu-flag.png
---

[GDPRの対策としてWebアナリストがすべきこと](/news/gdpr-for-analysts/)の記事の中で、不要な個人データを匿名化する方法の一つとしてGAやAAにはIPアドレスを匿名化する機能がある、と書きました。その具体的な方法と注意点についてです。
<!-- more -->

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1526614534/gdpr-ip-anonymization-in-analytics.png" alt="" sizes="100vw" />

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

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1526610784/gtm-ga-ip-anonymization.png" alt="" sizes="100vw" />

{% alert success %}
プライバシー保護を強化するため、ついでにforceSSLも設定しておくと良いでしょう。
{% endalert %}

### 検証方法
GAのビーコンに **&aip=** が付与されていれば成功です。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1526611364/ga-ip-anonymization-debugging.png" alt="" sizes="100vw" />

サーバー側でデータが処理・保存されるよりも前の段階で、IPアドレスの一部が「0」で置き換えられるようになります。

### IPフィルタは更新が必要

自分や社内からのアクセスを除外するためにIPを使ってフィルタしている場合は、最後の桁（オクテット）が0で置き換わるので、IPの指定方法を「**前方が一致**」方式に変えるなどの対応が必要です。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1526612284/ga-filter-by-ip.png" alt="" sizes="100vw" />

{% alert warning %}
0〜255の範囲でざっくりとフィルタされるのが困る場合は、GAのフィルターではなくタグマネージャーやブラウザプラグインなどの別の除外方法を検討しましょう。
{% endalert %}

### 地域レポートの精度が落ちる

IPアドレスで判定している地域（都道府県・市区町村）のレポートは、元データの粒度が荒くなるので、精度が下がります。GAのIPアドレスを他のシステムと連携させていないか確かめるなど、影響範囲を把握してから設定を変更すると良いでしょう。

## Adobe Analyticsの場合
（準備中）