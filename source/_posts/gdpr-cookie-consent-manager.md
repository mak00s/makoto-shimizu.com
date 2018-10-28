---
title: GDPR対策のためにCookie利用の同意を得る方法
date: 2018-05-20 11:20:00
tags:
  - Privacy
  - Google Analytics
thumbnailImage: //res.cloudinary.com/mak00s/f_auto/eu-flag.png
---

[GDPRの対策としてWebアナリストがすべきこと](/news/gdpr-for-analysts/)の記事の中で、個人データの取得には同意が必要、と書きました。その具体的な方法と注意点について紹介します。
<!-- more -->

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/gdpr-consent-manager2.png" alt="" sizes="100vw" />

{% alert info %}
以下は技術情報です。対応の必要性については法務担当や専門家に相談してください。
{% endalert %}

## 同意を得るだけでは足りない

プライバシー保護のために個人データの取得に関して本人（データ主体）から明示的な同意を得るためには、以下の対応が必要です。

* 初めてサイトを訪問した時に**通知を表示**する
  * データ取得の概要を説明する
  * 詳細はプライバシーポリシーやCookieポリシーへ誘導する
* 個人データ取得の**拒否（オプトアウト）**を可能にする
  * 対象Cookieを消去する
  * GoogleやAdobe Analyticsへのデータ送信やCookie発行を止める
* 必要に応じて個人データ取得の**明示的なオプトイン**を可能にする
  * オプトインがあるまではGoogleやAdobe Analyticsへのデータ送信やCookie発行を止める
* オプトインやオプトアウトの選択を一定期間保存しておき、**次回からは通知を表示しない**
  * ログインが必要な会員制サイトの場合は、サーバー側の会員情報にも反映させ、別のブラウザでログインした時も選択内容が反映されるようにする

このように書き出してみると、色々な仕組みが必要なことがわかります。

「簡単だからJavaScriptで自作できそう」と思いがちですが、既存のツールを活用した方が楽なだけでなく、ツールの機能や説明ドキュメント、アップデート内容から**一般的なEU企業が抱えるニーズや解決アプローチが垣間見えて参考になる**というメリットもあります。

## オプトインの方式
同意の明確性によって以下のようなパターンがあります。どの方式にするかを指定できるツールもあります。

1. 通知のみ（詳細へのリンクを含む）
2. 通知＋Opt-outボタン（デフォルトはオプトイン）
3. 通知＋Opt-inボタン（閉じる、スクロール、他ページへの遷移などサイトの利用を継続する場合は同意とみなす）
4. 通知＋Opt-inボタン（デフォルトはオプトアウト）

下に行くほど厳格な運用になります。訪問者のIPアドレスからEU（EEA）からのアクセスを判定し、対応レベルを切り替えられるツールもあります。

## 無料で使える同意・Cookie管理ツール

Cookie管理ツールから包括的なプライバシー管理ソリューションまで色々あります。[iapp.orgのPrivacy Tech Vendor Report](https://iapp.org/resources/article/2018-privacy-tech-vendor-report/)では、Consent Manager（同意管理）のカテゴリだけで36ものツールが紹介されています。

今回は、無料で使えるものを5つ紹介します。

### [InsitesのCookie Consent](https://cookieconsent.insites.com/)
初回訪問時の**通知表示と同意取得に特化**したオープンソースの無料ツール。見た目や文言を細かくカスタマイズできます。[デモのページ](https://cookieconsent.insites.com/demos/)で各種カスタマイズ結果を確認できます。Cookieの削除やオプトアウト機能はありません。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/gdpr-consent-manager-insites.png" alt="" sizes="100vw" />

### [Cookiebot](https://www.gdpr.ga/cookiebot)
通知表示と同意取得に加えて、サイトをスキャンしてCookie表を自動生成したり、EUからのアクセス時のみ機能をONにする機能もあります。デンマークのCybot社によるサービスを日本企業のクラスメソッド社が日本語化を行い、日本円による請求書対応を行なっています。

無料版は、100ページ以内のみに対応（超えたら有料プランへ自動移行）。多言語対応やカスタマイズができず、基本機能のみ。本番利用は現実的ではないので、事実上お試しプランという位置づけですね。

### [OneTrust](https://onetrust.com/)
機能的にはCookiebotに似ていて、通知表示と同意取得に加えて、サイトをスキャンしてCookie表を自動生成したり、EUからのアクセス時のみ機能をONにする機能もあります。本サイトはこれを採用しました。

無料版でも多言語対応やカスタマイズ、サイトをスキャンしたCookie表の自動生成、入力フォーム自動検出が可能。ただしオンライン登録したすぐ使えるようにはならず、何日か経って審査を通った場合に登録の通知メールと営業担当からの個別フォローメール（英語）が届きます。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/onetrust-registration.png" alt="" sizes="100vw" />

まずサイト全体を自動スキャンし、Cookieや入力フォーム、LocalStorageを検知することから始めます。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/onetrust-scan-result.png" alt="" sizes="100vw" />

検知したCookieは、設定内容だけでなく、データベースと照合して何のCookieなのか説明文も表示してくれます。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/onetrust-cookie-notice.png" alt="" sizes="100vw" />

この情報をもとにサイト上のCookie Notice（利用するCookieの説明表）ページを自動生成できます。

同意の通知は、表示場所や色、項目をカスタマイズできます。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/onetrust-cookie-banner.png" alt="" sizes="100vw" />

Cookieのオプトイン・オプトアウト用UIもあります。

### [COOKIE INFO SCRIPT](https://cookieinfoscript.com/)
通知表示のみに特化した無料JavaScriptライブラリ。詳細リンクを含む通知を表示するだけで、同意の管理機能はありません。デザインや文言をカスタマイズできます。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/cookieinfoscript-demo.png" alt="" sizes="100vw" />

### [CIVICのCookie Control](https://www.civicuk.com/cookie-control)
同意取得というよりも**Cookieのオプトイン・オプトアウト管理**ツール。カテゴリやツール毎に細かくCookieのON・OFFを切り替えられます。デフォルトがオプトアウト状態になっていて、ONにして明示的にオプトインする必要がある、ONからOFFに切り替えると該当Cookieが即削除される、というストリクトなポリシーが前提。イギリスの公的機関ICOが採用しています。

無料版は、初回訪問時にお知らせを表示することができない、見た目のカスタマイズが限定される、ツールのAboutページへのリンクが入る、などの機能制限があります。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/gdpr-consent-manager-civic.png" alt="" sizes="100vw" />

本サイトでは、[GDPRに関連したページ](/news/gdpr-for-analysts/)にのみ、CIVIC Cookie Control V8を実験導入しています（デモ用なのでオプトアウトしてもCookieは消えません）。インストールと設定方法が難しく、日本語の情報も無いので、以下にメモを残しておきます。

#### まず設定情報を入力してダウンロード（タグ取得）

[Cookie Controlのサイト](https://www.civicuk.com/cookie-control)からDownloadページへ進み、Editionを選択します。V8の場合、Community Editionは無料です。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/civic-1-edition.png" alt="" sizes="100vw" />

さらに、名前やEmailアドレス、サイトのドメインなどを記入していきます。

Cookieをカテゴリやツール単位で分類し、その単位でオプトイン・アウトできるのがCIVIC Cookie Controlの一番の特徴です。そのカテゴリを編集や削除、追加します（後でJavaScriptで変更することも可能）。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/civic-2-category.png" alt="" sizes="100vw" />

サイト下部に表示される（C）アイコンの位置（左／右）、テーマ（ダーク／ライト）を指定します。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/civic-3-appearance.png" alt="" sizes="100vw" />

これ以外のカスタマイズ、文字色やサイズ、背景色、アイコン、Aboutリンク削除などは有償のPRO版のみで可能です。

PRO版には、さらにEUとUKからのアクセス時のみ同意を必要とするジオロケーション機能やマルチドメイン対応、多言語対応が含まれます。

最後に規約に同意してボタンをクリックすると、APIキーが発行され、実装用タグが表示されます。

#### Google Tag Managerでタグを入れる
発行されるタグは、HTMLソースにベタ張りするためのものです。

私はGoogle Tag Managerで管理するために、以下のように修正しました。

{% gist mak00s/4ebe86efb72cd382378dc78be28f7988 %}

文言も全て日本語に変更しています。設定の詳細は[公式ドキュメント](https://www.civicuk.com/cookie-control/v8/documentation)をどうぞ。

#### オプトアウト時にGoogleアナリティクスを無効化
[Googleが提供するブラウザのアドオン](https://tools.google.com/dlpage/gaoptout?hl=ja)を紹介してインストールしてもらうのは昔の方式です。手間がかかるだけでなく、サイトに関わらずGoogleアナリティクスへのデータ送信が全て止まってしまうので、特定のサイトのみGoogleアナリティクスを無効化する**新方式が望ましい**です。

Googleアナリティクスのプロパティ単位でオプトアウトするには、
```
window['ga-disable-UA-XXXXX-Y'] = true;
```
を、**GAへのデータ送信よりも前のタイミングで**セットします。

参照：[GA公式ヘルプ](https://developers.google.com/analytics/devguides/collection/analyticsjs/user-opt-out)

タイミングの制御が難しいので、Cookie Controlのオプトイン時に実行されるfunctionの中にGAのタグを、オプトアウト時に実行されるfunctionの中に上記のGA無効化のJavaScript文を入れるのが確実で楽です。

{% gist mak00s/9081be5898e94c571b0dacb0925979f2 %}

onAcceptのfunctionは、オプトインした時と、次回の訪問時を含む以降のページ閲覧時に毎回実行されます。

タグマネージャーを使っている場合は、onAcceptのfunctionの中でDataLayerのイベントを発生させ、それをタグマネージャーのトリガーとしてGAの計測をすると良いでしょう。

## 要件を決めてから選定と導入を

以上、CIVICのCookie Control V8について詳しく紹介しました。これは明示的にオプトインしないとCookieをセットしない、というかなりストリクトなポリシーを前提としているので、日本では[InsitesのCookie Consent](https://cookieconsent.insites.com/)の方が要件に合うかもしれません。

通知のみで良いのか、オプトアウトの方法を伝えるだけで良いのか、明示的なオプトインを必要とするのか。また、サイト全体でざっくりとオプトイン・アウトすれば良いのか、それともカテゴリごとに細かい制御をするのが望ましいのか。通知はどの程度目立たせるべきか？ビジネスと顧客の双方の視点で要件を決めてから、どのツールがベストなのかを選択すると良いでしょう。