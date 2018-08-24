---
title: Demo 03. NPSアンケート回答をGAでセグメント分析
date: 2018-08-24 09:00:00
permalink: demo/nps-analytics
tags:
  - Demo
thumbnailImage: //res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1535034668/demo-nps-analytics.png
---

効果測定はアナリティクス活用方法の１つでしかなく、顧客理解やセグメント発見も重要です。例えば、NPS算出のためにアンケートで取得する**推奨度をGoogle Analyticsで計測**すると、推奨度の違いによる訪問や閲覧パターンがわかるので、サイト改善やリマーケティングなどの施策につなげることができます。KARTEと無料GAで実装してみました。
<!-- more -->

## NPS用アンケートを実装
本ページに[KARTE](https://karte.io/)を使ってアンケートを実装しました。
- ページが読み込みされてから３秒後に表示されます
- ２回閉じると、もう表示されなくなります（テストしやすいよう無効化しました。毎回表示されます）
- ０〜１０の項目をクリックすると、KARTEとGoogle Analyticsでデータが記録されます
  - 「閉じる」をクリックしないと記録されません（KARTEの仕様？）

## Google Sheetsで自動レポート

GAで計測されたイベントのデータを[１時間に一度自動更新するGoogle Sheet](https://docs.google.com/spreadsheets/d/14KiWRaWSqkPfXfxzTf5huk1u_MIJ1ITr_TJsgCjXaek/edit?usp=sharing)を作りました。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1535035603/demo-nps-analytics-report.png" alt="" sizes="100vw" />

数字とグラフの部分は全て自動で更新されます。

回答データはKARTEからCSVでダウンロードするのが通常の方法です。GA計測には、以下のようなメリットがあります。
- Google Sheetsと組み合わせると柔軟なレポートを自動化しやすい
- GAでセグメントを作成できる
 - 回答者の前後の動きを追える
 - セグメントをリマーケティングの対象にできる

## 真似する方法

KARTE自体のレポート機能よりも多くのディメンションや指標を使って長期の間接効果も把握したいので、アンケートが表示されたタイミング（KARTEの接客時）と、送信時の回答をGoogle Analyticsで計測します。

### アンケート回答を計測するためのKARTE接客サービスを作る

表示されたKARTE接客に反応して回答を送信した時に、その回答内容を計測するため、KARTEの接客サービスを一つ作成します。

- Webhookのテンプレートを使ってMeasurement ProtocolでGAにデータを送信する
- 対象イベントは「アンケート回答が存在する」を指定する
- 自力でできない場合はプレイド社から有償のテンプレートを入手するとサポートを受けられる

### 表示を計測するためのKARTE接客サービスを作る

さらにアンケート表示も計測するには、KARTEのGA連携機能が便利です。テンプレート「GA cid取得_接客イベント送信（tracker名指定）」をプレイド社から入手し（有償）、接客サービスを作成します。通常のタグ導入の場合は通常版を、GTMやカスタマイズによってトラッカー名が変更されている場合はtracker名指定版を追加します。

これは汎用的な計測用の「接客サービス」です。一つ作ると全ての接客を計測できるようになります。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1534837181/demo-nps-karte-1.png" alt="" sizes="100vw" />

KARTE接客の表示をもれなく全員分GAで計測するため、**「未実施時」は使いません**。名前がランダムで設定されている上のアクションに名前をつけて、表示率を**100%**にしてから、その編集画面に移動します。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1534838740/demo-nps-karte-3.png" alt="" sizes="100vw" />

- GTMでGAを導入している場合はトラッカー名を変更
- KARTEのVisitor IDをセットするカスタムディメンション番号を指定
- KARTEに会員IDを送信している場合は「user_id送信設定」でGAのカスタムディメンション番号を指定
- 「cid送信設定」では、GAのClient IDをセットするカスタムディメンション番号を指定
- 「ga_event送信設定」では、KARTEのどの接客のどのアクションが表示されたかを計測するためにGAのイベントカテゴリ、イベントアクション、イベントラベルを指定

続いて、「接客サービスが表示されたら」という条件の配信トリガーを設定します。

<img src="//res.cloudinary.com/mak00s/image/upload/f_auto,w_auto:200:800/v1534838083/demo-nps-karte-2.png" alt="" sizes="100vw" />

保存して公開すれば設定完了。KARTEの接客が表示された時点でGAのイベントを計測できるようになりました。
