---
title: サーチコンソールの詳細データをGoogleスプレッドシートに自動反映させてTableauにインポートする方法
permalink: automate-search-analytics-with-google-sheets-and-tableau
date: 2017-02-06 18:07:04
banner: //res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1523880524/tableau-google-spreadsheet.png
categories: 
tags:
- Tableau
- SEO
---
Google Search Console（旧ウェブマスターツール）の詳細データをGoogleスプレッドシートで自動抽出＆自動バックアップし、Tableauにインポートする方法について。

サーチコンソールのデータはウェブ上のレポート画面でも閲覧できますが、

- ランディングページとクエリを掛け合わせられない（個別にフィルタをかければできる）
- 90日以上前のデータを閲覧できない

といった制限があるのがイマイチ。
APIで細かいデータを取得してExcelやBIツールで分析・ビジュアライズするのがベストですね。

木田さんのTableau本「[できる100の新法則 Tableau タブロー](http://amzn.asia/3Y7zSXi)」 で紹介されているように、BigQuery経由でもGoogleサーチコンソールのデータをTableauに取り込めますが、敷居が高いので、今回はGoogleスプレッドシート経由でTableauに取り込む方法について紹介します。
<!-- more -->

## Googleスプレッドシートにサーチコンソールのデータを自動反映させる方法
いくつかの方法がありますが、多機能で使いやすく、かつ開発者の分析スキルが高そうな [Search Analytics for Sheets](https://searchanalyticsforsheets.com/) を使うことにします。

### 1. まずアドオン「Search Analytics for Sheets」をインストール
[Chrome Web Storeの該当ページ](https://chrome.google.com/webstore/detail/search-analytics-for-shee/ieciiohbljgdndgfhgmdjhjgganlbncj)にアクセスし、アドオンをインストールすると、Google Spreadsheetのアドオンメニューに「**Search Analytics for Sheets**」が表示されるようになります。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1523809411/google-spreadsheet-addon-menu-ja.png" alt="Google Spreadsheetのアドオンメニュー" sizes="100vw" />

### 2. アドオンを実行してデータを取得
スプレッドシートを開き、アドオン＞Search Analytics for Sheets＞**Open Sidebar**を選択してサイドバーを開きます。

Google認証を終えたら、各種の条件を設定します。

一番細かいデータが欲しいので、**Group By**（抽出するデータ指定）に全ての項目（Date, Device, Query, Page, Country)を指定しましょう。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1523809410/search-analytics-config-requests.png" alt="データ抽出の条件を指定" sizes="30vw" />

一番下の青い「**Request Data**」ボタンをクリックすると、シートのセルにデータが挿入されます。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1523809411/search-analytics-retrieved-data.png" alt="セルに記入されたデータ" sizes="100vw" />

はい、簡単ですね〜。

これは一番細かいデータなので、人間が見るためのレポートではありません。ピボットなどで集計する必要があります。

### 3. 毎月自動でデータを取得する
どうせなら定期的にモニタリングできるように、データ取得を自動化しましょう。月ごとにシートを分けて、バックアップしていきます。

設定サイドバーのタブ「**Backups**」に切り替えて、先程と同様に設定します。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1523809410/search-analytics-config-backups.png" alt="Backupタブでデータ抽出の条件を指定" sizes="30vw" />

**Period**：Monthlyを選択すると、毎月頭の3日に自動実行されるようになります。日付や時間は変更できません。
**Email me backup status**：バックアップが自動実行された後にメールが届くようにしておくと便利ですね。
**Run a backup cycle right away**：初めてなので、次の3日を待たずに今のタイミングでバックアップを実行してみましょう。

一番下の赤い**ENABLE BACKUP**ボタンをクリックすると、自動バックアップが有効化され、（「Run a backup cycle right away」にチェックを入れた場合は）先月分のバックアップが早速実行されます。

今後は月単位でシートが自動で作成されていくので、過去分も月単位でシートを分けてデータ取得しておきましょう。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1523809410/search-analytics-sheets-structure.png" alt="月別のシート構成" sizes="100vw" />

先月分はもうシートが作成されているはずなので、手動作成が必要なのは2ヶ月前と3ヶ月前だけです。月途中の不完全な今月分をシート作成すると、来月頭に自動バックアップ処理がスキップされてしまいます。今月の不完全な最新データが欲しい場合は、「今月」など別の名前で一時シートを作成します。

スプレッドシートに名前をつけて保存すれば、Googleサーチコンソールのデータを通常の画面よりも細かい単位でGoogleスプレッドシートに自動抽出＆自動バックアップする設定が完了です。

### 4. Tableauに取り込む
データを集計してビジュアライズするため、Tableauを起動してデータソースとして指定します。 認証を終えて読み込み対象ドキュメントを選択すると、データがつながってシートの一覧が表示されます。

月別にシートを分けたので、分断されたデータを統合するために「ユニオンの新規作成」（New Union）をドラッグ＆ドロップします。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1523809410/tableau-datasource-google-spreadsheet-union.png" alt="Tableauのデータソース設定" sizes="100vw" />

データのシートは月単位で毎月自動で追加されていくので、増えたシートを自動で追加するためにワイルドカード方式を選択します。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto/v1523809409/tableau-datasource-google-spreadsheet-union-wildcard.png" alt="Tableauのユニオン設定"  width="411" height="450" />

正規表現ではなく単なるワイルドカードです。

Dec 2016、Jan 2017、と増えていくので、「*20*」にしておけば80年は持つので十分！

### 5. データの前処理
使わないカラムは**非表示**にしておきましょう。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1523809410/tableau-datasource-hide.png" alt="Tableauのデータソース設定" sizes="100vw" />

- **Google Sheets**：Googleスプレッドシートのドキュメント名
- **Sheet**：対象シートの名前
- **CTR**：計算フィールドで再計算しないと値がおかしくなるので不要

シートに移動後、分析で必要な計算フィールドを作成します。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto/v1523809409/tableau-calc-field-ctr.png" alt="" width="450" height="168" />

**クリック率**：SUM( [Clicks] ) / SUM( [Impressions] )

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto/v1523809409/tableau-calc-field-position.png" alt="" width="450" height="149" />

**平均順位**：SUM( [Position] * [Impressions] ) / SUM( [Impressions] )

これで、Googleサーチコンソールの詳細データをGoogleスプレッドシート経由で自動抽出＆バックアップし、さらにTableauと連携できる状態になりました。無料のPower BI（Microsoft）を使うのも良いでしょう。無料化されたGoogle Data Studioにはコネクタがついてますが、バックアップができるのが今回のGoogleシート連携のメリットです。

一番細かいデータを長期間で取り出せるようになったので、通常画面では不可能だった色々な分析が可能になりました。長くなるので、今回の記事はここまで。 