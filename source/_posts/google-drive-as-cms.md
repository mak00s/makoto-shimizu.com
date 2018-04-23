---
title: サイトの表データをGoogleスプレッドシートで楽々更新
categories:
date: 2013-01-04 12:40:27
tags:
  - CMS
---

面倒なので更新が遅れがちだった記事リストをGoogle Driveと自動連動させてみました。jQueryとDataTablesを使っているので、サクサクと並び替えやフィルタ、ページ移動ができます。いろいろ応用ができそうなので、方法についてメモしておきます。
<!-- more -->

<img src="//res.cloudinary.com/mak00s/image/upload/v1523896567/google-spreadsheet-before.png" alt="" sizes="100vw" />
<img src="//res.cloudinary.com/mak00s/image/upload/v1523896567/google-spreadsheet-after.png" alt="" sizes="100vw" />

## 1\. スプレッドシートを作成し公開

まずGoogleドライブ上でスプレッドシートを作成します。[実際に作ったシートを見る](https://docs.google.com/spreadsheet/ccc?key=0AsrjFAXlY190dFd1dmxNdi1jUW0yTVJ6Mi1xMzQ2YVE)

<a href="https://docs.google.com/spreadsheet/ccc?key=0AsrjFAXlY190dFd1dmxNdi1jUW0yTVJ6Mi1xMzQ2YVE"><img src="//res.cloudinary.com/mak00s/image/upload/v1523896567/google-spreadsheet.png" alt="" sizes="100vw" /></a>

※シートを分けたりVLOOKUPしたりしてますが、普通にべた書きでもokです。**1行目**はJSON中の項目名になるので、**英数字**にしておきます。

次に、「ファイル」メニューの「**ウェブに公開**」で公開します。「共有」ではなく「公開」です。

<img src="//res.cloudinary.com/mak00s/image/upload/v1523896566/google-spreadsheet-publish.png" alt="" sizes="100vw" />

## 2\. jQueryプラグイン「DataTables」をインストール

[jQuery](http://jquery.com/)と[DataTables](http://www.datatables.net/)をダウンロードし、ページにリンクします（headにscriptタグを追加）。

以下はGoogleスプレッドシートと連携させるために最低限必要な基本コードです。

```html
<script type="text/javascript" src="xxx/jquery.min.js"></script>
<script type="text/javascript" src="xxx/jquery.dataTables.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	$('#example').dataTable({
		"bServerSide": false,
		"bProcessing": true,
		"sAjaxDataProp": "feed.entry",
		"sAjaxSource": "https://spreadsheets.google.com/feeds/list/[keyをここへ]/od6/public/values?alt=json",
		"aoColumns": [{
			"mData": "gsx\$series.\$t"
		}, {
			"mData": "gsx\$published.\$t"
		}, {
			"mData": "gsx\$title.\$t"
		}, {
			"mData": "gsx\$media.\$t"
		}]
	});
});
</script>
...
<table id="example" width="100%">
	<thead>
		<tr>
			<th>連載名</th>
			<th>公開日</th>
			<th>記事タイトル</th>
			<th>サイト</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	</tbody>
</table>
```

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

[こんなだったページ](http://www.cms-ia.info/cms-ia-article/)（Before）が[こうなりました（After）](http://www.cms-ia.info/articles/)。これは便利！クールで使いやすい上に、更新が楽になってます。Google DriveのスプレッドシートならiPhoneでも気軽に更新できるので、長続きしそうです。
