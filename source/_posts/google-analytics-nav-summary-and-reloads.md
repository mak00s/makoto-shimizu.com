---
title: GoogleAnalyticsのナビゲーションサマリーはリロードにご注意
date: 2011-03-01 22:22:00
categories: 
tags:
  - Google Analytics
---

Google Analyticsのナビゲーションサマリーが怪しかったので、仕様を正確に理解するために検証してみました。
<!-- more -->

## 知りたかったのは下記の３点

* 前後をつなげるために**リファラ**を見ているのか？
* **リロード**は無視される？
* ナビゲーションサマリーって**正確**？

## 実験のために発生させたアクセス

![Testのために発生させたセッション](/images/ga/navigation-summary-sessions.png)

セッションA： / → /cms/ → /cms/（リロード） → /ia/  
セッションB： /ia/ → /cms/ （リファラを無効化）  
セッションC： /ia/  
セッションD： /ia/ → 外部リンク  
セッションE： /  
セッションF： /

## 結果

以下のように結果がレポートに反映されました。

### ＜コンテンツサマリー＞

**ページビュー数**：10
**ユニーク表示数**：9
_※リロードした1回分減っています_
**直帰率**：66.67%
_※直帰したセッションはCとDとEとFなので、4セッションを全体のセッション数6で割った結果です_

### ＜上位のコンテンツ＞

![Google Analytics - Top Content](/images/ga/top-content.png)

ページビュー数とページ別セッション数が正確に反映されました。  
直帰率と離脱率は、リロードを含むページビュー単位で算出されています。

### ＜ナビゲーションサマリー＞

![Google Analytics - Navigation Summary:/](/images/ga/navigation-summary-top.png)

![Google Analytics - Navigation Summary:/ia/](/images/ga/navigation-summary-ia.png)

![Google Analytics - Navigation Summary:/cms/](/images/ga/navigation-summary-cms.png)

/cms/の「次のページ」、が変です。  
このページはビューが3回で、うち1回はリロード、離脱は1回のみです。  
「次のページ」が66%ということは、/cms/のリロード分が含まれて2回としてカウントされていますが、コンテンツの一覧からは/cms/は除外されています。残った/ia/だけが次のページの一覧に表示され、その結果100%として表示されています。このまま/cms/のページビュー「3」と66%をかけると、/cms/から/ia/への遷移が2回、になってしまいます。

一方、「前のページ」にはリロード分の/cms/自身が含まれません。「%クリック」に「ページ別セッション数」をかければ、遷移回数の近似値を算出できそうですが、同じセッションで同じページを何度も通ることもあるので、正確な数字は算出できません。

## 検証結果

### Q：前後をつなげるためにリファラを見ているのか？

A：リファラは考慮されない。リファラは詐称したり無効にできるので、信頼できない情報です。これは妥当な設計でしょう。SiteCatalystも同様に、リファラを使わずCookieに保存したIDと時間で前後をつなげます。

ということはつまり、複数のタブを切り替えながらリンクをクリックしていくと、遷移が混ざってしまいます。ありえない遷移が発生する場合の多くは、これが原因です。

### Q：リロードは無視される？

A：ナビゲーションサマリーの「前のページ」ではリロードは完全に無視されるが、「次のページ」ではリロード分のPVが非直帰の母数に含まれてしまうので注意が必要。

### Q：ナビゲーションサマリーは正確か？

A：「次のページ」でリロード分のPVが「次のページ」（非離脱）に含まれているのを除けば、相対的な割合としては正確。ただし、母数としてのリロードを除くページビュー数が分からないため、クリック数を正確に実数で算出することができない。近似値でもよければ、該当ページのPV数に「次のページ」の割合（非離脱散率）をかけて、さらにコンテンツの「%クリック」をかければ遷移回数に近い数字になります。例えば、/cms/から/ia/への遷移回数は、3（/cms/のPV数）×66.67%（次のページへの遷移率＝非離脱率）×100%（次のページのうち、/ia/が占める割合）＝2回、になります。

いずれにせよ、サイト全体の流れを把握するというよりも、一つのページを起点とした前後の遷移を傾向値として把握する程度にとどめた方が良さそうです。