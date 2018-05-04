---
title: Googleアナリティクス用Excelプラグイン
date: 2018-05-04 23:47:43
---

# Googleアナリティクス用Excelプラグイン

アクセス解析データは、Excelシート上に落とせると、加工やグラフ化ができて便利です。というよりも、アクセス解析ツールの画面で見るレポートは、素早く調べるためのプレビューでしかない、と考えた方が良いです。

ただし、CSVをダウンロードしてエクセルに貼り付けるような、手間がかかり、人的ミスの可能性が高いフローだと、長続きしません。

そこで活躍するのが、エクセルのセルに直接Google Analyticsのデータを挿入できるアドオンやマクロです。有料のものから無料のものまで、いくつかのソリューションがあるので、まとめてみました。

### Analytics Edge
<http://www.analyticsedge.com/simply-free/>
一斉を風靡したExcellent Analyticsの後継。よくメンテされている。無料版と有料版がある。

### Excellent Analytics
<https://github.com/Outfox/excellent-analytics/releases>
元祖。開発が終了しソースコードが公開されたが、作り方が古いこともありメンテされていない（APIも古いのでもう動作しないかも）

### Sumerpetrics Functions (旧GA data fetch)
<https://supermetrics.com/product/supermetrics-functions>
Windows版Excelに対応。年間$143.88
GA Data Grabberの作者による簡易VBAマクロ集が以前は無料で公開されていたが、Supermetrics Functionsの一部に取り込まれて有償化された。
機能的には十分だが、編集のUI画面が無く、関数を手で入力する必要があるので少し敷居が高い。インストールが不要なので、仕込んだファイルを誰でも開いたり更新できるのは良い。

### Sumerpetrics Data Grabber
<https://supermetrics.com/product/data-grabber>
Macにも対応。年間$468（デモ版あり）  
インストール不要のマクロ集。Excelファイルが肥大化するような気が...。UIがExcelシート上のセルやボタンなので、使用感が独特。  
14日間のデモ版がダウンロード可能。

### ShufflePoint for Excel
<http://www.shufflepoint.com/Excel.aspx>
WindowsはExcel 2000, 2003, 2007、MacはExcel 2001～2011に対応。Webクエリを使うのでインストールやマクロが不要。月間$49から（30日間のデモ版あり）

### Next Analytics
<https://www.nextanalytics.com/>
Windows版のみ。Excel 2003, 2007, 2010に対応したアドオン。年間$440

### Tatvic
<https://www.tatvic.com/excel-add-in-google-analytics/>  
Windows版のみ。Excel 2003, 2007に対応。月$29から。無料版あり。  
こちらもマクロなので、インストール不要。

## コメント

2012年のコメント：一時はこのようなソリューションが次々と登場していたのですが、最近は落ち着いてしまったカテゴリです。バージョンアップもされなくなった放置
モードのソリューションもあるので、可能なら自社開発した方が良いかもしれません。

2013年7月追記：久しぶりに調べたところ、データ統合のニーズが増えたためか、活性化しています。全体的に2倍近く値上がりしていました。

2018年追記：Excellent Analyticsが引退しAnalytics Edgeが急浮上。その他は全体的に値上がり。Analytics Edgeがあれば十分。