---
title: サイトの表データをGoogleスプレッドシートで楽々更新
categories:
date: 2013-01-04 12:40:27
tags:
  - CMS
thumbnailImage: /images/cms/google-drive-as-cms.png
---

面倒なので更新が遅れがちだった記事リストをGoogle Driveと自動連動させてみました。jQueryとDataTablesを使っているので、サクサクと並び替えやフィルタ、ページ移動ができます。いろいろ応用ができそうなので、方法についてメモしておきます。
<!-- more -->

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:710/v1524580366/google-drive-as-cms.png" alt="" sizes="100vw" />

## 1\. スプレッドシートを作成し公開

まずGoogleドライブ上でスプレッドシートを作成します。[実際に作ったシートを見る](https://docs.google.com/spreadsheet/ccc?key=0AsrjFAXlY190dFd1dmxNdi1jUW0yTVJ6Mi1xMzQ2YVE)

<a href="https://docs.google.com/spreadsheet/ccc?key=0AsrjFAXlY190dFd1dmxNdi1jUW0yTVJ6Mi1xMzQ2YVE"><img src="//res.cloudinary.com/mak00s/image/upload/v1523896567/google-spreadsheet.png" alt="" sizes="100vw" /></a>

※シートを分けたりVLOOKUPしたりしてますが、普通にべた書きでもokです。**1行目**はJSON中の項目名になるので、**英数字**にしておきます。

次に、「ファイル」メニューの「**ウェブに公開**」で公開します。「共有」ではなく「公開」です。

<img src="//res.cloudinary.com/mak00s/image/upload/v1523896566/google-spreadsheet-publish.png" alt="" sizes="100vw" />

## 2\. jQueryプラグイン「DataTables」をインストール

[jQuery](http://jquery.com/)と[DataTables](https://www.datatables.net/)をダウンロードし、ページにリンクします（headにscriptタグを追加）。

以下はGoogleスプレッドシートと連携させるために最低限必要な基本コードです。

{% gist mak00s/0b28eae5a5326e98433a6c2f18fa7d70 %}

* [keyをここへ]の部分にはスプレッドシートのURLに含まれる長い英数字を入れる
* GoogleドライブのJSONはXML構造が特殊なので、aoColumnsでデータの場所を指定する（gsx$[ここに項目名].$t）
* series, published, title, mediaの部分はシート1行目の項目名にする
* tableのカラム数は項目の数に合わせる

## 3\. カスタマイズ

データが表示されることを確認できたら、DataTablesのオプションを指定し、CSSで整形します。

私の場合は以下の点を変更しました：

* デフォルトで連載名と日付によりソートされるよう変更 (aaSorting)
* デフォルトの表示行数を50に変更 (iDisplayLength)
* 非表示にした第一カラム（連載名）で行をグループ化 (aaSortingFixed, fnDrawCallback)
* 一部のカラムのみ列幅を指定 (sWidth)
* URLが記入されている場合は自動でリンク (mRender)
* ページ移動のUIを1 2 3 4...方式に変更
* jQuery UIのThemeRollerスキンを適用

## 4\. 完成！

[こうなりました](/articles/)。これは便利！クールで使いやすい上に、更新が楽になってます。Google DriveのスプレッドシートならiPhoneでも気軽に更新できるので、メンテが長続きしそうです。
