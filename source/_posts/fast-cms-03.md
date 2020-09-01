---
title: 爆速サイト構築に挑戦３.Gatsbyをカスタマイズ
date: 2020-08-31 10:15:00
permalink: fast-cms/03-customize-gatsby
categories:
  - ヘッドレスCMSで爆速サイト構築
tags:
  - CMS
---

最新の思想・機能・ツールをフル活用して**セキュアで爆速**、**SEOも最高**のサイトを（ほぼ無料で）実現する連載その１では[GatsbyとNetlifyを使って爆速サイトを２時間で構築](/news/fast-cms/01-launch-gatsby-on-netlify/)しました。まだデフォルトのダミーサイトのままなので、今回は**Gatsbyを設定**してサイト名や構成を修正します。
<!-- more -->

## Day 3：CMSでサイトの形を整える

### まず方針を固める

３日目の今回は、最低限の設定を行い、今回使ったテンプレート ([Gatsby + Netlify Starter](https://github.com/netlify-templates/gatsby-starter-netlify-cms))に含まれているNetlify CMSというコンテンツ編集の画面が使えるようにします。サイト名やメニュー構成、URLの変更までで、デザインやコンテンツは今回は変更しません。

画像の管理と配信は**Cloudinary**を使います。デバイスやブラウザに応じて最適な解像度で最適なサイズの画像をサーバー側で生成してくれるので、**画像の質を落とさずにサイトの速度を向上**できます。今回のテンプレート（Gatsby + Netlify Starter）はUploadcareにも対応していますが、Uploadcareは有料プランのみの提供に方針を変えたようです。継続的な無償利用はできなくなりました。

### 1. PCでGatsbyの開発環境を作る

GitHubのリポジトリ中でコンテンツ（.mdファイル）の追加や更新を行う（コミットする）と、Netlifyが自動でデプロイを開始し、HTMLやJSが生成され、ホスティングのサーバーに転送される、というのが日々の運用の流れです（今回の構成の場合。GitHubではなくヘッドレスCMSやWordPressと連携させることも可能）。

一方、**サイトやCMSのカスタマイズ**をするためには、手元のPC（やMac）でもGatsbyサーバを走らせて開発環境を作る必要があります。

まず、Gatsbyが動作するフレームワークの「Node」と、作業で使うコマンドラインのツールをインストールします。
* Node
* [Gatsby CLI](https://www.gatsbyjs.com/docs/)
* [Netlify CLI](https://github.com/netlify/cli)

次に、**GitHubのリポジトリをローカルにダウンロード**。

> git clone https://github.com/[GITHUB_USERNAME]/[REPO_NAME].git

続いて、**必要なモジュールのインストール**。

> cd [REPO_NAME]
> yarn

ここまでは、初回のみの作業です。

**開発サーバーを起動**するために（プロジェクトのディレクトリで）以下を実行します。

> netlify dev

しばらくしてから

> You can now view gatsby-starter-netlify-cms in the browser.
>   http://localhost:8000/

と表示されれば、開発サーバーの起動に成功。そのURLをブラウザで開き、作業を続けます。

{% alert info %}
* 通常はGatsbyサーバーを起動しますが、今回はNetlify上でGatsbyサーバーをホスティングしているので、Gatsbyサーバーを内包し、さらにNetlify側の機能も含めたNetlifyの開発サーバーを起動しています。
* ESLintのエラーがたくさん出る場合は、ディレクトリ直下に空の「.eslintrc」ファイルを作成するとESLintのチェック機能を停止できます。
{% endalert %}


### 2. サイト名を変更

Gatsby全体の設定は、ルート直下の「gatsby-config.js」に書かれています。
まず、冒頭のサイト名とサイト説明を編集。

{% gist mak00s/d01f13053ec7a37b6de3994684d35589 %}

全ページのtitleタグとmetaタグにすぐ反映されました。開発サーバーの場合、ファイルを変更しても**再起動やブラウザのリロードは不要**です。

なお、次回に使うCMS画面では、各ページごとに異なるタイトルとdescriptionを設定できます。このconfigファイルの設定は、個別設定をしなかった場合のデフォルト値になります。


### 3. ディレクトリ構成を変える

デフォルトのサイト構成を以下のように変えたいので、/src/pages/のディレクトリ名とファイル名を変更します。

* /about/　→ そのまま
* /products/　→ /seminar/に名称変更
* /blog/　→ /note/に名称変更
  * 記事　→ 後で個別に変更
* /contact/　→ そのまま
  * examples　→ 不要なので削除
  * file-upload　→ 不要なので削除

/contact/の中の不要な２つのファイルを削除し、/blog/ と /products/ のディレクトリ名を変更しました。変更直後はブラウザがエラー画面になりますが、気にしないで/products/（変更後はseminar）の中のindex.mdを開いて、冒頭の

> path: /products

を

> path: /seminar

に変更し、開発サーバーを再起動（Control＋Cで停止してもう一度netlify devを実行）します。
どのファイルのどこを変更するのかは、Gatsbyサイトの作り方次第です。


### 4. メニューとフッタのリンクを直す

URLが変わったので、各種メニューのリンクが切れてしまいました。リンクはURLのパスを直書きする作りになっているので、以下のファイルを修正します。

* /src/components/**Navbar.js**
* /src/components/**Footer.js**

ついでに使わないSNSアイコンも削除。ロゴ画像のAltとサイズが直書きされているので修正。


### 5. ロゴとfaviconを変更

/src/img/logo.svg　にロゴ画像
/static/img/　に各種favicon

のファイルが格納されているので、同じファイル名で画像を上書きすると楽です。


### 今日は約４時間

テンプレのサイトがどう構築されているかを理解するのに時間がかかりました。所要時間は、Node環境の有無や、サイトの構成・デザインをテンプレからどれくらい変更するかによって変わると思います。

[構築中のサイトはこちら](https://netlify.concept-diagram.com/)。次回は[コンテンツを編集するCMS管理画面を設定](/news/fast-cms/04-netlify-cms/)し、コンテンツの更新を開始します。