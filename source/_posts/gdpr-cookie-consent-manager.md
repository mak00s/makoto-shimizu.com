---
title: GDPR対策のためにGA計測の同意を得る方法
date: 2018-05-20 11:20:00
tags:
  - Privacy
  - Google Analytics
thumbnailImage: //res.cloudinary.com/mak00s/image/upload/f_auto/v1526433637/eu-flag.png
---

[GDPRの対策としてWebアナリストがすべきこと](/news/gdpr-for-analysts/)の記事の中で、個人データの取得には同意が必要、と書きました。その具体的な方法と注意点について紹介します。
<!-- more -->

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1526826147/gdpr-consent-manager2.png" alt="" sizes="100vw" />

{% alert info %}
対応の必要性については法務部門や専門家に相談してください。
{% endalert %}

## 同意を得るだけでは無い

プライバシー保護のために個人データの取得に関して本人から明示的な同意を得るためには、以下の対応が必要です。

* 初めてサイトを訪問した時に**通知を表示**する
  * データ取得の概要を説明する
  * 詳細はプライバシーポリシーなど別ページへ誘導する
* 個人データ取得の**拒否（オプトアウト）**を可能にする
  * 対象Cookieを消去する
  * GoogleやAdobe Analyticsへのデータ送信やCookie発行を止める
* 必要に応じて個人データ取得の**明示的なオプトイン**を可能にする
  * オプトインがあるまではGoogleやAdobe Analyticsへのデータ送信やCookie発行を止める
* オプトインやオプトアウトの選択を一定期間保存しておき、**次回からは通知を表示しない**
  * ログインが必要な会員制サイトの場合は、サーバー側の会員情報にも反映させ、別のブラウザでログインした時も選択内容が反映されるようにする

このように書き出してみると、色々な仕組みが必要なことがわかります。

自前で実装するよりも、既存のツールを活用した方が楽なだけでなく、ツールの機能や説明ドキュメント、アップデート内容から**一般的なEU企業が抱えるニーズや解決アプローチが垣間見えて参考になる**ので、オススメです。

### 無料で使える同意・Cookie管理ツール

色々ありますが、今回は無料で使えるものを2つ紹介します。

[InsitesのCookie Consent](https://cookieconsent.insites.com/)
初回訪問時の**お知らせ表示と同意取得に特化**したオープンソースの無料JavaScriptツール。見た目や文言を細かくカスタマイズできます。[デモのページ](https://cookieconsent.insites.com/demos/)で各種カスタマイズ結果を確認できます。Cookieの削除やオプトアウト機能は持たず、同意の取得のみに特化しています。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1526715357/gdpr-consent-manager-insites.png" alt="" sizes="100vw" />

[CIVICのCookie Control](https://www.civicuk.com/cookie-control)
同意取得というよりも**Cookieのオプトイン・オプトアウト管理**ツール。カテゴリやツール毎にCookieのON・OFFを切り替えられます。デフォルトがオプトアウト状態になっていて、ONにして明示的にオプトインする必要がある、ONからOFFに切り替えると指定Cookieが即削除される、というストリクトなポリシーが前提です。

無料版は、初回訪問時にお知らせを表示することができない、見た目のカスタマイズが限定される、ツールのAboutページへのリンクが入る、などの機能制限があります。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1526715691/gdpr-consent-manager-civic.png" alt="" sizes="100vw" />

## CIVIC Cookie Controlを導入する方法

本サイトでは、[GDPRに関連したページ](/news/gdpr-for-analysts/)にのみ、CIVIC Cookie Control V8を実験導入しています（デモ用なのでオプトアウトは機能しません）。インストールと設定方法が難しく、日本語の情報も無いので、メモを残しておきます。

### まず設定情報を入力してダウンロード（タグ取得）

[Cookie Controlのサイト](https://www.civicuk.com/cookie-control)からDownloadページへ進み、Editionを選択します。V8の場合、Community Editionは無料です。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1526705876/civic-1-edition.png" alt="" sizes="100vw" />

さらに、名前やEmailアドレス、サイトのドメインなどを記入していきます。

Cookieをカテゴリやツール単位で分類し、その単位でオプトイン・アウトできるのがCIVIC Cookie Controlの一番の特徴です。そのカテゴリを編集や削除、追加します（後でJavaScriptで変更することも可能）。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1526736945/civic-2-category.png" alt="" sizes="100vw" />

サイト下部に表示される（C）アイコンの位置（左／右）、テーマ（ダーク／ライト）を指定します。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1526736945/civic-3-appearance.png" alt="" sizes="100vw" />

これ以外のカスタマイズ、文字色やサイズ、背景色、アイコン、Aboutリンク削除などは有償のPRO版のみで可能です。

PRO版には、さらにEUとUKからのアクセス時のみ同意を必要とするジオロケーション機能やマルチドメイン対応、多言語対応が含まれます。

最後に規約に同意してボタンをクリックすると、APIキーが発行され、実装用タグが表示されます。

### Google Tag Managerでタグを入れる
発行されるタグは、HTMLソースにベタ張りするためのものです。

私はGoogle Tag Managerで管理するために、以下のように修正しました。

{% gist mak00s/4ebe86efb72cd382378dc78be28f7988 %}

文言も全て日本語に変更しています。設定の詳細は[公式ドキュメント](https://www.civicuk.com/cookie-control/v8/documentation)をどうぞ。

## Googleアナリティクスのオプトアウト方法
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

以上、CIVICのCookie Control V8について詳しく紹介しました。これは明示的にオプトインしないとCookieをセットしない、というかなりストリクトなポリシーを前提としているので、[InsitesのCookie Consent](https://cookieconsent.insites.com/)の方が要件に合うかもしれません。

通知のみで良いのか、オプトアウトの方法を伝えるだけで良いのか、明示的なオプトインを必要とするのか。また、サイト全体でざっくりとオプトイン・アウトすれば良いのか、それともカテゴリごとに細かい制御をするのが望ましいのか。通知はどの程度目立たせるべきか？ビジネスと顧客の双方の視点で要件を決めてから、どのツールがベストなのかを選択すると良いでしょう。