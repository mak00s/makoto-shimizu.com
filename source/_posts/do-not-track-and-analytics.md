---
title: Do Not Trackに対する業界の反応まとめ（2012年8月）
date: 2012-08-08 15:30:00
tags:
---

EUはCookie Lawにより**明示的なオプトインが必要**になりましたが、USではオプトアウトの「Do Not Track」が支持を集めつつあります。Googleを中心に広告業界による華麗なスルーがしばらく続いていましたが、オバマ政権が2012年2月に「Privacy Bill of Rights」を議会に提出したことで、業界が動き出しました。最近の動きとしては
<!-- more -->

### 2012-02-23
**Google**がChromeにDo Not Trackの機能を実装することを発表（Firefox、IE、Mac OS 10.7 Lion上のSafariは既に対応済み）- [WSJ記事](https://www.wsj.com/articles/SB10001424052970203960804577239774264364692)

### 2012-04-02
**Yahoo! Web Analytics**が夏には[Do Not Trackをサポートすると表明](http://www.yanalyticsblog.com/blog/2012/04/yahoo-web-analytics-supports-do-not-track-dnt/)
（その後、6/12にYWAのサービス自体を8月いっぱいで終了すると発表）

### 2012-05-12
**Twitter**が[Do Not Trackのサポートを表明](https://twitter.com/twitter/status/203133041160364033)

### 2012-05-31
**マイクロソフト**が[Internet Explorer 10のDo Not TrackをデフォルトでONにすると発表](https://blogs.technet.microsoft.com/microsoft_on_the_issues/2012/05/31/advancing-consumer-trust-and-privacy-internet-explorer-in-windows-8/)　→広告業界から批判が巻き起こる

### 2012-06-03
オープンソースの解析ツール「**Piwik Analytics**」が最新バージョン1.8で[Do Not TrackをデフォルトONにしたと発表](https://matomo.org/blog/2012/06/piwik-1-8-release-new-features-screenshots-overview/)

### 2012-06-06
W3C**がDNTのドラフトに「ユーザーによる明示的な同意なくDNTを設定するのはW3C仕様に準拠しているとは言えない」と追記（ドラフトなので、最終決定ではない）

> An ordinary user agent MUST NOT send a Tracking Preference signal without a user’s explicit consent.

参考：[Wired解説記事](https://www.wired.com/2012/06/default-do-not-track/)

一方、EUは「ブラウザの仕様はユーザーの意図とは無関係。デフォルト設定まで規定するのは行き過ぎ」というレターをW3Cへ送付

参考：[ClickZ記事](https://www.clickz.com/do-not-track-standards-not-settled-in-w3c-meetings/44813/)

### 2012-06-12
**セキュリティソフト**「AVG Anti-Virus Free Edition 2012」「AVG Internet Security 2012」がCookieを無効化できるDo-Not-Track機能を実装

参考：[PCMagのレビュー](https://www.pcmag.com/article2/0,2817,2402146,00.asp)

## まだ議論が継続中

EUからの圧力、オバマ政権の積極的な推進を受け、W3Cでは７か月も議論が続いていますが、未だに合意には至っていません。論点は、

* ブラウザのデフォルト状態をどう解釈するか
* ターゲティングを停止すれば良いのか、それともデータ収集も停止すべきか
* サードパーティCookieのセットはOKか

プライバシー保護派と、データ収集まで禁止するとオンライン広告の成長に悪影響を与えるという慎重派の間で**議論と歩み寄り**が続いています。

このW3Cによる自主規制が年内にまとまらなければ法規制が必要になる、と政権はプレッシャーをかけています。来年頭にはさらに動きがありそうです。

### 関連
* [EUから学ぶ、プライバシーポリシーでのCookie説明方法](/news/cookie-in-privacy-policy/)
* [Web解析・広告で個人情報をどう扱うべきか？プライバシー対策としての「Do Not Track」の現状と課題](https://markezine.jp/article/detail/14697) (MarkeZine)
* [電話版オプトアウト「Do Not Call Registry」体験レポート](/news/do-not-call/)
