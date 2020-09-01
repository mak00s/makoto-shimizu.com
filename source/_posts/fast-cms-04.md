---
title: 爆速サイト構築に挑戦４.Netlify CMSでコンテンツ編集
date: 2020-09-01 13:00:00
permalink: fast-cms/04-netlify-cms
categories:
  - ヘッドレスCMSで爆速サイト構築
tags:
  - CMS
thumbnailImage: //res.cloudinary.com/mak00s/f_auto,w_auto:200:800/netlify-cms-preview.png
---

最新機能をフル活用して**セキュアで爆速**、**SEOも最高**のサイトを（ほぼ無料で）実現する考え方と方針については[GatsbyとNetlifyを使って爆速サイトを２時間で構築](/news/fast-cms/01-launch-gatsby-on-netlify/)をどうぞ。早くCMS画面でコンテンツを修正できるようにしたいので、今回は**Netlify CMSを設定**し、コンテンツの編集に着手します。
<!-- more -->

## Day 4：Netlify CMSでコンテンツ編集を可能に

### まず方針を固める

GatsbyはWebブラウザで動作するフロントエンドのアプリで、**CMSの「ヘッド」部分**にあたります。コンテンツの編集や管理、保管の機能はなく、[Contentful](https://www.contentful.com/)や[Prismic](https://prismic.io/)のようなヘッドレスCMSや、プラグインでヘッドレス化したWordPressからAPI経由でコンテンツを取得する設計になっています。今回のサイトは小規模なので、**GitHubのリポジトリにマークダウン形式でコンテンツを格納**することにしました。

エンジニアなら、GitHubだけでもマークダウン形式のテキストファイルの編集やレビュー・承認ワークフローを運用できると思いますが、コンテンツのライターや編集者には、**もっと使いやすい編集画面が必要**です。

そこで、今回はNetlifyの無料オマケ機能「**[Netlify CMS](https://www.netlifycms.org/)**」を使います。これはGatsbyと同様にReactのアプリで、GitHubのリポジトリ上の.mdファイルを読み書きする編集画面や簡易ワークフロー機能が使えるようになります。

### 1. CMS管理画面を使ってみる

Netlify CMSは今回ベースにした[Gatsby + Netlify CMS Starter](https://github.com/netlify-templates/gatsby-starter-netlify-cms)に最初から含まれているので、**Netlifyの開発サーバーを起動するとNetlify CMSも起動**します。

以下のように、起動時にコンソールに表示されるメッセージにNetlify CMSのURLが表示されるので、アクセスしてみます。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/netlify-cms-top.png" alt="" sizes="100vw" />

CMS画面は至ってシンプル。**コンテンツ**（ページ）と**メディア**（画像）を管理します。コンテンツはさらにブログエントリと固定ページに分けて管理するようStarterのCMSは設定されています（変更可能）。

Pages＞Landing Pageがトップページ。開いて編集し、Publishすると、変更されたマークダウンのファイルがGitHubにコミットされ、その結果Netlifyがデプロイを開始。本番ページに反映されます。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/netlify-cms-preview.png" alt="" sizes="100vw" />

商用CMSほど作り込まれていないので、入力欄の順番が実際の画面と一致しなかったり、レイアウトがズレたりし、完全なプレビューにならない点はガマン。


### 2. ワークフロー機能を有効化する

「**Publish**」をクリックするとすぐにGitHubにファイルがコミットされて本番デプロイが開始するのは困るので、**ワークフロー機能を有効化**します。

Netlify CMSのファイルは全て/static/admin/ の中に格納されています。この中の「config.yml」を編集し、以下の行を追加します。

> publish_mode: editorial_workflow
> site_url: https://YOUR-SITE.com
> display_url: https://YOUR-SITE.com

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/netlify-cms-config.png" alt="" sizes="100vw" />

ついでにサイトのURLを設定すると、ヘッダにサイトへのリンクが追加され、ドラフト保存したページをプレビューできるようになります。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/netlify-cms-workflow.png" alt="" sizes="100vw" />

### 3. 変更したパスを反映させる

[前回](/news/fast-cms/03-customize-gatsby/)にディレクトリ構成を変更したので、それらのページがCMS画面に表示されなくなりました。設定ファイル「config.yml」中のパスを更新して直します（上の図を参照）。

これでようやく、コンテンツを編集できるようになりました。

この [Starterのテンプレ](https://gatsby-netlify-cms.netlify.app/) を [このサイト](https://concept-diagram.com/) に近づけようとしています。今のところ [こんなサイト](https://netlify.concept-diagram.com/) になってます。

次回は、ページの構造やお問い合わせ機能をチューニングします。
