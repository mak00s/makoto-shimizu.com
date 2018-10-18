---
title: PythonでAdobe Analyticsの巨大Data Warehouse CSVを間引く
date: 2018-10-18 11:39:00
permalink: 
tags:
  - Python
  - Adobe Analytics
---

ユーザー単位で分析するカスタマーアナリティクスの場合、Google AnalyticsやAdobe Analyticsの画面で表示できるレポート機能が物足りないので、Data Warehouseなどで生データ（に近い集計データ）を抽出してTableauで集計することが多いですが、データが巨大だとBIツールで読み込めません。そんな時にPythonで巨大ファイルを並列処理し、不要なカラムやレコードを削除してからBIで読み込む方法についてです。
<!-- more -->

以下のように、Adobe AnalyticsのデータをData WarehouseでFTP配信したCSVファイルをPythonで前処理してみます。

元ファイルは18.5GBもあり、ExcelでもテキストエディタでもTableauでも開けません。少しでもデータ量を減らすためにセグメントを適用してありますが、Data Warehouseのセグメント機能には制約があり、どうしても不要なデータが混ざってしまいます。

データベースやGCPで処理するのが確実ですが、手元のパソコンでサクっと分析したいので、Pythonのライブラリ「[DASK](https://docs.dask.org/en/latest/)」を使いました。

使ったPythonコードはこちら。
pipやcondaでdaskをインストールしておく必要があります。

{% gist mak00s/b5a0a37a1d9caa00cb5a4412ed06eb1c %}


to_csvで普通にCSV保存すると、読み込みの時に分割されたパーティションの単位で分割された複数のCSVファイルが生成されます。時間はかかりますが、pandasで普通に処理した時のようにフリーズしたり待った挙句にエラーになったりしません。

メモリに読み込める程度までデータ量が減った場合は、一つにまとめて単一のCSVファイルとして保存することもできます。

上のコードを実行して生成されたのは3.6GBのCSV。Macbook上のTableauでも読み込めるようになりました。

pandasだけでも分割してループすることはできますが、DASKだと小さな単一ファイルと同じように処理しても自動で分割や並列処理してくれるのが便利！