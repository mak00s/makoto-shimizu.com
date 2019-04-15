---
title: Google ColaboratoryでR言語を使う一番簡単な方法
date: 2019-04-15 18:31:00
categories: 
tags:
  - R
thumbnailImage: /images/R-logo.png
---

Google ColaboratoryでR言語を使うためには、追加インストールやセッション強制終了などが必要で、毎回数分間かかるという状況でしたが、2月頃にRのカーネルがこっそりと追加されたようで、面倒なハックは不要になりました。その方法についてのメモ。

<!-- more -->

## カーネルを確認

まず、Google Colaboratoryにデフォルトでインストールされているカーネルを確認するため、以下を実行します。

    !jupyter-kernelspec list

kernels/irが表示されれば、Rのカーネルが入っているということ。

<img src="//res.cloudinary.com/mak00s/f_auto/google-colaboratory-kernel-list" alt="Google Colaboratoryのカーネル一覧" />

2019年4月3日時点で、Swiftも入っているようです。

## Rのカーネルに切り替える

カーネルは入っているのにGoogle Colaboratoryのランタイム変更画面に「R」がまだ表示されず、選択できないので、Notebook（.ipynb）ファイルをダウンロードし、テキストエディタで開いて以下の部分を編集します。

```
"kernelspec": {
  "name": "ir",
  "display_name": "R"
}
```

<img src="//res.cloudinary.com/mak00s/f_auto/google-colaboratory-edit-ipynb" alt="NotebookをText Editorで開く" />

終わったらこのNotebookをアップロードして開くだけ。
ランタイムのタイプを確認すると「R」に切り替わっていることがわかります。

<img src="//res.cloudinary.com/mak00s/f_auto/google-colaboratory-kernel" alt="NotebookのKernel設定がRになった" />

あとは普通にRが使えます。

<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/google-colaboratory-in-r" alt="Google ColaboratoryでR言語が使える" sizes="100vw" />

簡単！

元ネタ：
- [jupyter notebook - How to use R with Google Colaboratory? - Stack Overflow](https://stackoverflow.com/questions/54595285/how-to-use-r-with-google-colaboratory) (2/8)
- [YanaiさんのTweet](https://twitter.com/mrtec_y/status/1111609620865286145) (3/29)