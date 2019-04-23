---
title: Demo 05. 直帰してもページの滞在時間とスクロール量をGTMで正確に計測する方法
date: 2019-04-19 20:30:00
permalink: demo/content-engagement
tags:
  - Demo
  - Google Analytics
thumbnailImage: 
---

「直帰率が高いキャンペーン用LPがあり、時間をかけてスクロールしながら読まれているのか知りたい」というご質問をいただいたので、ここで回答します。
GTMとGAで実装しやすいように、ページのスクロール（10％間隔）の最大量と滞在時間（3秒間隔）をGTMの機能を使って計測し、ページを移動や離脱する時に最終的な値をイベント計測するというアプローチをおすすめします。実際にこのページに実装し、計測データとレポートも共有しておきました。

<!-- more -->

## DEMO

このページを開くとタイマーがスタートします（毎秒だと細かすぎるので3秒毎）

{% raw %}
<div id="timer" style="margin-right:auto;margin-left:auto;width:140px;border:10px solid #ccc;text-align:center;font-size:36px">00:00</div>
{% endraw %}
別のページへ移動したりタブやウィンドウを閉じる時にタイマーが停止して最終的な滞在時間が確定し、GAへデータが送信されます。

こんなデータが取れるようになります。
<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/demo-scrolldepth-report" alt="" sizes="100vw" />

## Google Sheetsのレポートに自動反映される

結果は[このGoogle Sheets](https://docs.google.com/spreadsheets/d/1pvFWLc_07BDMdV7zL8CDiz2140Y4tG_puJfwZNbJ_mA/edit#gid=1115641289)に1時間に1回、自動反映されます。

<a href="https://docs.google.com/spreadsheets/d/1pvFWLc_07BDMdV7zL8CDiz2140Y4tG_puJfwZNbJ_mA/edit#gid=1115641289"><img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/demo-scrolldepth-report-gs" alt="" sizes="100vw" /></a>

### この方式の特徴や注意点
- GTMの標準機能をなるべく使っているので、実装が比較的楽
- GTMのタイマーはブラウザがバックグランドになっていたりタブが非アクティブになっていても止まらない
- 間隔を短くしすぎるとブラウザに負荷がかかるのでご注意
- ％形式のスクロールは解釈が難しいので、LPの主要エリアが「N秒以上表示された」という精読の計測も併用すると良い

## 真似してみよう
GTMで
1. カスタムHTMLのタグ「JS - 離脱前にdataLayerへevent送信」を作る
```
<script>
  window.addEventListener('beforeunload', function() {
    window.dataLayer.push({
	  event: 'beforeunload'
	});
  });
</script>
```
2. そのタグが送信するカスタムイベント「beforeunload」を受け取るトリガー「beforeunload」を作る
3. スクロール距離のトリガー「Scroll Depth」を作る
<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/gtm-trigger-scrolldepth" alt="" sizes="100vw" />
4. 組み込み変数「Scroll Depth Threshold」を有効にする
5. タイマーのトリガー「Timer 3sec」を作る
<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/gtm-trigger-timer" alt="" sizes="100vw" />
6. データレイヤー変数「DL - timerEventNumber」を作る（データレイヤーの変数名は「gtm.timerEventNumber」）
7. データレイヤー変数「DL - timerInterval」を作る（データレイヤーの変数名は「gtm.timerInterval」）
8. カスタムJS変数「Time on Page」を作る
```
function() {
  var elapsed = {{DL - timerEventNumber}} * {{DL - timerInterval}} / 1000;
  var min = Math.floor(elapsed / 60);
  var sec = elapsed % 60;
  return ('0'+min).slice(-2) + ':' + ('0'+sec).slice(-2);
}
```
9. GA計測用のタグ「GA - ページ離脱」を作る
<img src="//res.cloudinary.com/mak00s/f_auto,w_auto:200:800/gtm-tag-beforeunload" alt="" sizes="100vw" />
- ページ離脱後でもバックグラウンドでビーコンが送信されるようtransportをbeaconにしておくと良い
- イベント、カテゴリ、アクションのどこに何を入れるかはお好みで（計測中の他のデータと形式を合わせる）

2019年4月23日：データレイヤー変数自体の名前と設定画面中の「データレイヤー変数の名前」は別物です。後者で指定すべき文字列について追記しました。

### 参考
- [#GTMTips: Fire Trigger When User Is About To Leave The Page](https://www.simoahava.com/analytics/fire-trigger-when-user-about-to-leave-page/) - Simo Ahava's blog
- [How to Use Timer triggers in Google Tag Manager V2](https://www.clickinsight.ca/blog/timer-triggers-google-tag-manager-v2)
