---
title: 爆速サイト構築に挑戦 その2.サーバーサイドGTM
date: 2020-08-30 14:00:00
permalink: fast-cms/02-server-side-gtm
categories:
  - ヘッドレスCMSで爆速サイト構築
tags:
  - GTM
  - Google Analytics
thumbnailImage: //res.cloudinary.com/mak00s/f_auto,w_auto:200:800/netlify-gatsby-cms-2.png
---

最新機能をフル活用して、**セキュアで爆速**、**SEOも最高**のサイトを（ほぼ無料で）実現するのがこの連載の目的です。前回は[GatsybyとNetlifyを使って爆速サイトを２時間で構築](/news/fast-cms/01-launch-gatsby-on-netlify/)しました。今回は、新しい**サーバーサイドGTM**の機能を使ってセキュアかつ負荷を下げる形で2種類のGAを導入し、さらにプライバシー保護と**iTP対応のためCookie管理を改善**します。

実はこの記事を早く書きたかったんですが「**爆速セキュアサイトを構築したいという前提**」がないとサーバーサイドGTMは意味がないので、先に[その1](/news/fast-cms/01-launch-gatsby-on-netlify/)を書きました。
<!-- more -->

## Day 2：サーバーサイドGTMでiTPに対応

### まず方針を固める

iTPは抜け道を探すのではなく、お客さまの**意思を尊重してパーソナルデータをしっかりセキュアに管理する**のが一番。タグマネージャーはそのために最も重要なパートを担うので、サイトの制作・開発・構築を進める前にデータやタグの活用と管理方法についてしっかり設計しておきたいところ。

今回の前提は

* Webの行動データを**イベント単位で細かく取得**し、一人ひとりの**行動や心理の変化に合わせてパーソナライズ**することを「**良い顧客体験（CX）**」とする。その実現がビジネス成功のために必須
* ただし、属性や心理データ、購買データを含む分析やターゲティングをする場合、個人情報は当然として**パーソナルデータの保護もかつてないほど重大な課題**
* ブラウザの商業主義から人権保護へのシフトはアップルを先導に**業界全体へ広がっていく**
* そのため、**タグを貼るだけで管理を丸投げするツール導入方式**は駆逐されていく

そこで、以下のような方針を立てました。

* **行動データは個人情報と同様**に扱い、社外サーバーへの送信を極力減らす
* ブラウザや訪問者を識別する**IDは自社で発行・管理**し、ツール横断で活用する
* 各種ツールへの行動・属性データ送信はサーバー間通信を基本とし、**タグを極力減らす**
* **タグ管理システムは一つのGTMに集約**し、社内で一元管理する

### 具体的な作業メモ：サーバーサイドGTM導入

構築中のサイトにタグマネとGAを導入し、サイトの制作とアナリティクスのカスタマイズをアジャイルに**同時進行**していきます。

#### 1. GTM用のサーバーを構築する

* GTMで**サーバー用のコンテナを新規作成**
  * 東京のサーバーを使いたいので**プロビジョニングは「手動」**
* クラウド (GCP)で**GTMサーバーを立ち上げる**
  * Google App Engine (GAE)を起動
  * そのマシンにGTMサーバーソフトウェア（GAEのApp）をインストール
  * さらに自己所有の**サブドメイン**を割り当てる
* **サーバー用GTMコンテナの設定を変更**
  * 「タグ設定サーバー」欄にサブドメインを設定

ここまでの手順はエクスチュア社のブログ「[Server-side GTM を Google AppEngine にデプロイする](https://ex-ture.com/blog/2020/08/13/deploy-server-side-gtm-on-gae/)」（参考になりました！）の２〜５の途中と同じです。今回は**iTP対策したいので、サブドメインの割り当ては必須**。５以降は少しアレンジしたので、続きは以下をどうぞ。

#### 2. ウェブ用GTMに新しいGA v2のタグを追加

ブラウザの負荷をなるべく減らしたいので、GA v1（Universal Analytics）ではなく**新しいGA v2（App + Web）のみをGTMではなくgtag.jsで導入**します。

{% alert info %}
サーバーサイドGTMでブラウザの負荷を減らし、送信データを極力減らしたい場合、従来のGA (Universal Analytics)ではなく、新しいGoogle Analytics v2 (Web + App)のみをクリーンに導入するのが良いと考えました。GA v2はイベント中心の考え方なので、デフォルト導入だけでもスクロールや離脱クリック、ダウンロード、動画再生などのイベントを計測でき、サーバーサイドGTMの思想にマッチします。GAのJavaScriptライブラリも新しいv2の方が開発の力が入っていて、より改善や進化を期待できます。
{% endalert %}

普通にGA v2（App + Web）のタグを入れて動作検証を終えたら、GAデータの送信先をGoogleのサーバーではなく、1で構築したサブドメイン上のGTMサーバーに変更するため、「**トランスポートURL**」を指定します。

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-EXAMPLE"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-EXAMPLE', {
    transport_url: 'https://analytics.example.com',
  });
</script>
```

参考：ウェブ用のGTMでGA v2を導入する場合は、以下のようにフィールドを追加します。
<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/gtm-ga-tag-for-server-side.png" alt="" sizes="100vw" />

#### 3. サーバー用GTMコンテナでクライアントを設定

サーバー用GTMの「**クライアント**」は**GAのビーコン（計測用データ）を受け取るレシーバー**です。サーバーサイドGTMの設定に基づいてデータを処理し、GAなどのサーバーへデータを送信します。

サーバーサイドGTMのコンテナではデフォルトで２種類の「クライアント」が作成されますが、設計思想的に、この**両方のクライアントを同時に使うことはあまり無いはず**。今回はGA v2のビーコンのみを受け取るので、「Universal Analytics」のクライアントは削除しました。

**サーバーサイドでデータの加工を行う場合、クライアントのテンプレートを自作する**ことになりますが、今回はデフォルトの「App + Web」をそのまま使います。よりセキュアにするため、１箇所だけ設定を変更。

「**詳細設定＞SameSite**」
詳細設定では、「_ga」Cookieとは別の、訪問者（ブラウザ）を識別するIDを格納するために**GTMサーバーから送信される「FPID」Cookieの設定**ができます。SameSiteは「**Lax**」に変更しました。現時点ではiTPとは関係ないですが、なるべくセキュアにしておきたいので。

#### 4. サーバー用GTMコンテナでトリガーを作成

**サーバーサイドGTMのタグの発火条件とするトリガー**を、サーバーサイドGTMのコンテナ内で作ります。トリガーの種類は「**カスタム**」のみで、クライアントがデータを受信した時に反応します。

今後対象サイトやビーコンの種類が増えた場合、トリガーが全てのデータに反応してしまうとゴミデータが増えるので、ビーコンの種類と計測IDで制限をかけます。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/gtm-server-trigger.png" alt="" sizes="100vw" />

「**Client Name**」は組み込み変数で、有効化が必要です。受信データに反応したGTMクライアントの名前がセットされます。
「**Query String**」も組み込み変数です。ビーコンのURL中の「?」以降の文字列（パラメータの組み合わせ）が格納されます。

#### 5. サーバー用GTMコンテナでタグを作成

最後に、4で作成したトリガーを条件としたGAタグを作ります。

今回は爆速セキュアなサイトを作るのが趣旨なので、サイトにはGA v2のみをgtag.jsでミニマム実装し、**GTMサーバー側で受信するデータを分解・複製してサーバー間通信でGA v1とGA v2の計測を行います**。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/gtm-server-gtag-flow.png" alt="" sizes="100vw" />

**GA v2** (App + Web)のタグは、受信したデータをそのまま送信する場合は、設定は不要です。サーバー側でデータの分解や加工、マッピングなどの処理をしたいので、後日必要に応じてカスタマイズの設定を行います。

**GA v1** (Universal Analytics)のタグでは「UA-xxxxxxxxx-x」という**GAのプロパティIDを上書き指定**します。GTMサーバーが受信するのはGA v2用ビーコンなので、GA v1用のプロパティIDは含まれていません。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/gtm-server-tag-2ga.png" alt="" sizes="100vw" />

これで最低限の設定は終わり。**検証して公開**します。

#### 6. サーバーサイドGTMでGAをカスタマイズ

今回は爆速セキュアなサイトを作るのが趣旨なので、カスタムディメンションへ値をセットするなどの**カスタマイズは極力サーバーサイドで**行います。

無料のGA v1（Universal Analytics）はBigQueryで生データを抽出できないので、カスタムディメンションに追加のデータをセットしておくと何かと便利。今回はGTMサーバー側でそのカスタマイズを行ってみます。

カスタムディメンションに入れるデータ

* **クライアントID** (client_id)
* **セッションID** (ga_session_id)

この2つのデータはgtag.jsからのストリームを受け取ったGTMサーバー上のクライアントが分解して「イベントデータ」として利用可能になっているので、それを取り出して格納するGTM変数を２つ作成します。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/gtm-server-variable.png" alt="" sizes="100vw" />

この２つをカスタムディメンションにセットするため、**GA v2のタグにフィールドを追加**します。カスタムディメンション用の入力欄がないので、ビーコンのパラメータと同じ「cd＋数字」と言う書式でフィールドを指定します。

GA側でもカスタムディメンションを定義し、サーバーサイドGTMのコンテナを検証・公開して終わり。２種類のGAのデータ計測を開始しました。

### よりセキュアになったCookie

Safari 13.1.2でサイトにアクセスすると、従来の「**_ga**」に加えて「**FPID**」Cookieが発行されました。

**_ga**：iTPにより期限が２年から**１週間に短縮**された
**FPID**：期限は**２年間**、Secure、HttpOnly、Lax

**どちらかを削除しても、リロードすると同じ値で復活**します。FPIDの値に_gaの一部が含まれているので、お互いリンクしているようです。

ブラウザからのビーコンでは今まで通りcidパラメータに_gaの値がセットされますが、**GTMサーバーはFPIDを優先**し、それをGAサーバーに送信するようです。

### ここまでで約５時間

調べながら試行錯誤したので時間がかかってしまいました。最初から正解がわかっていれば、２時間で終わるかも？

[構築中のサイトはこちら](https://netlify.concept-diagram.com/)。これからサイト名の変更、コンテンツ投入、デザイン変更を進めていきます。