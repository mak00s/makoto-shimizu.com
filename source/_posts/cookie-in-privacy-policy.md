---
title: EUから学ぶ、プライバシーポリシーでのCookie説明方法
date: 2012-01-30 01:18:00
tags:
---

フジイさんのブログより。

> プライバシーポリシーに「ファーストパーティ cookie を使って匿名のトラフィックデータを収集しています」って書いてるサイトなんて、あんまり見たことないなあ。

[Google Analytics規約違反について、あるいは企業はプライバシーポリシーをどう扱うべきかって話など。](http://fujii-yuji.net/2012/01/google-analytics.html) - フジイユウジ::ドットネット

ちょうど先週、プライバシーポリシーの説明が上手なサイトを見つけたので、ご紹介します。
<!-- more -->

![](/images/privacy-policy-about-cookie.png)

プライバシーポリシーとは独立したページで、Cookie名ごとに用途、保存内容、期間などが記述されています。

> lpCookie：Forumなど、サイトの機能間でログイン状態を保持するために使われます。例えば、Groupsのページでログインしてから Thorn tree forumに移動しても、またログインする必要はありません。同様に、一度ログアウトすると、サイト内の全セクションからログアウトしたことになります。

* Cookieのメリットが利用者の視点で書かれています
* 技術的な知識が無くても分かるように書かれています

伝わらなければ私たちの責任です、という感じが出ていて好感を持てます。

後半は、サードパーティによって使われるCookieについて、サービス別に説明されています。

> Cookies set on our site by our commercial service providers
> 
> We use a range of third party services on our site - from statistics packages to advertising, video delivery, content delivery and even low level techie functions like load balancing our servers so that they are always available when you want to use them. Some of these services require the use of cookies to work properly. These services include:
> 
> Advertising
> 
> Some of the advertisers on our site may serve content and advertisements that place or recognize cookies on your browser.

翻訳すると：

> 私たちが利用する商用サービス提供者がセットするCookieについて
> 
> 私たちは、このサイトのために他の企業が提供する様々なサービスを利用しています。統計や広告、動画配信、コンテンツ配信、あるいはユーザーがサイトを利用したい時に常に利用できるように負荷を分散させるという技術的な機能などが含まれます。これらのうち、正常に動作するためにCookieを利用するサービスについて説明します。
> 
> 広告関連
> 
> 私たちのサイトの広告主は、広告やコンテンツを配信するためにユーザーのブラウザにCookieをセットまたは読み取ることがあります。

広告関連では、AudienceScienceとDoubleClick、旅行関連に特化したアドネットワークのAtlas（マイクロソフト）について解説されています。

さらに、統計（アナリティクス）関連のセクションが続きます。

> 統計情報
> 
> Omniture
> 
> Omniture（Omniture SiteCatalyst）は、利用者を特定しない形で統計的な情報を私たちに提供します。
> 
> 具体的には、サイトごとに3つのCookieが使われます。名前が似ていますが、以下の3つのIDでサイトごとにセットされます。
> 
> s_cc：Cookieが有効化されているかを調べるために、JavaScriptによってセット＆読み込みされます。
> s_sq：ClickMap機能が有効になっている場合、JavaScriptによってセット＆読み込みされます。前のページでどのリンクがクリックされたかが記録されています。
> s_vi{ID}：固有の訪問者IDです

「統計情報」にはAdWordsも含まれています。配信ではなく効果測定のためにCookieが使われている、という位置づけです。AdWordsなので「広告配信のために必要」などと書いてしまいそうですが、常識や技術を忘れて誰のためなのかについて考えると、確かにその通りですね...。

その後は、サーバー機能としてのAkamai、Facebookなどが続きます。最後には、オプトアウトの方法がまとめて説明されています。

## どんな会社？

今回ご紹介したページはこちら

[Privacy Policy > More about cookies](https://www.lonelyplanet.com/legal/cookies/) :: Lonely Planet

**サイトやページの構成方法**、**分かりやすい書き方**、そして何よりも「分かりやすく伝えるのは私たちの責任」という**真摯な姿勢**が参考になります。

「Lonely Planet」は、米国、英国、オーストラリアに拠点を持ち、450人の従業員を抱える創立30年のグローバル企業です。英国BBCの子会社で、旅行のガイドブック出版から始まり、最近はECやフォーラム、動画などデジタル化に力を入れているようです。

## プライバシー対策の進め方

以下の記事でも書きましたが、自社サイトでどのようなデータを収集・活用し、何のCookieを発行しているのか、棚卸をして常に把握しておくことがまず第一歩です。

[Web解析・広告で個人情報をどう扱うべきか？　プライバシー対策としての「Do Not Track」の現状と課題](https://markezine.jp/article/detail/14697)：MarkeZine（マーケジン）

それができて初めて、セキュリティ対策やGDPR対策、システムのエラー対策（Cookieは個数や容量に制限があり、ブラウザ側でもWebサーバー側でも不具合につながることがある）が可能になります。しっかり管理した上で、さらに説明責任を果たすのです。

1. 自社サイトで利用しているCookieの用途、内容、期間、削除による影響、オプトアウトの方法についてリスト化する
2. 個数や容量の基準を決めて、準拠するための社内プロセスを構築・運用する
3. プライバシーポリシーに用途や種類、処理方法、委託先について詳しく書く

ヨーロッパはプライバシー対策が厳しいという事情もあるかもしれませんが、システムとセキュリティをしっかり管理し、利用者の利便性について重視する文化とプロセスがあれば、義務的にならずに自然に対策が進むはずです。ぜひ参考にしてみてください。

### 関連

[Do Not Trackに対する業界の反応（2012年8月）](/news/do-not-track-and-analytics/)
