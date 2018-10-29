---
title: Netflixも使ってるnteract（Jupyter用UI）が直感的で心地よい
date: 2018-10-29 09:03:00
tags:
  - Python
thumbnailImage: //res.cloudinary.com/mak00s/f_auto,w_auto:200:800/nteract-graph
---

Jupyter Notebookの利便性はそのままで、操作性とデータビジュアライズ機能が改善された[nteract](https://nteract.io/)を最近よく使っています。日本ではあまり知られていないようなので、デモ動画を作ってみました。

<!-- more -->

# nteractがJupyter Notebookよりもスゴイ点

{% youtube 58uI07gbr7U %}

## キーボードショートカットに依存しない直感的なGUI

Jupyter Notebookはキーボードショートカットを使う前提のUIになっているのか、とっつきにくく、慣れるまで時間がかかります。

[nteract](https://nteract.io/)の場合、セルをドラッグ＆ドロップで移動したり、ゴミ箱アイコンをクリックして削除したりと直感的に利用できるので、エンジニアではないマーケターやビジュアル派のアナリストにフレンドリー。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/nteract-cell" alt="" sizes="100vw" />

## データの確認や探索が簡単

操作性やデザインも大事ですが、データ分析の場合はこちらの方が重要ですね。
nteractには、データをインタラクティブに確認や探索できるData Explorerの機能が内蔵されています。

テーブル形式の場合はカラムの幅を変更したり、ヘッダをクリックして並び替えしたり、一度に表示される行数を変更してページ分割できます。ヘッダは固定表示されるので、大量データを確認しやすくなっています。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/nteract-table" alt="" sizes="100vw" />

さらに、インタラクティブなグラフ表示も簡単。Pythonモジュールをimportしたり設定用のコードを書くことなく、クリックだけで表示方法を切り替えられます。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/nteract-graph" alt="" sizes="100vw" />

{% alert info %}
詳細は開発者のブログ記事をどうぞ：[Designing the nteract Data Explorer](https://blog.nteract.io/designing-the-nteract-data-explorer-f4476d53f897)（英語）
{% endalert %}

# インストールと起動方法

Jupyter Notebookに慣れた人なら、より機能的なWeb版がオススメ。

コマンドラインを使いたくない、エンジニアではないのでGUIで使いたい！という人は、シンプルなデスクトップ版が使いやすいでしょう。

## Web版のインストールと起動

    pip install nteract_on_jupyter

（やcondaなど）でインストールし、

    jupyter nteract

で起動できます。Jupyter Notebookと同じ要領です。

## デスクトップ版のインストールと起動

公式サイトからダウンロードしたインストーラを実行した後に（前でも可）

    pip install ipykernel
    python -m ipykernel install --user

を実行し、裏で動くカーネルを設定しておく必要があります。

# まとめ

nteractは[Netflixの社員ブログ](https://medium.com/netflix-techblog/notebook-innovation-591ee3221233)で知りました。

Pythonの各種ライブラリを活用するとデータ分析が一気にレベルUPするので、GoogleアナリティクスやAdobe Analytics、エクセルのようなツールの限界を感じているアナリストは、これを機会にぜひ挑戦してみてください。
