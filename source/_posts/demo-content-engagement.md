---
title: Demo 05. 直帰してもページの滞在時間とスクロール量をGTMで正確に計測する方法
date: 2019-04-19 20:30:00
permalink: demo/content-engagement
tags:
  - Demo
  - Google Analytics
thumbnailImage: 
---

広告やキャンペーン用のページ（LP）は、情報を詰め込んで長くし、離脱につながるリンクを最低限に抑えることが多いですが、色々工夫をしても、直帰率が高くなりがちですよね。直帰しているなら、せめて**長い時間をかけてページをスクロールしながらコンテンツをじっくりと精読しているのか知りたい**ところです。どこまで見ているか、どこで去っているかがわかれば、ページの改善ヒントも得られますね。

ところが、Google Analyticsのレポートで表示される滞在時間は、直帰や離脱した場合が計測されないので、不正確です。そこで、正確に滞在時間やスクロールを計測するデモを作ってみました。

<!-- more -->

## DEMO

このページを開くとタイマーがスタートします（毎秒だと細かすぎるので3秒毎）

{% raw %}
<div id="timer" style="margin-right:auto;margin-left:auto;width:140px;border:10px solid #ccc;text-align:center;font-size:36px">00:00</div>
{% endraw %}
別のページへ移動したりタブやウィンドウを閉じる時にタイマーが停止して最終的な滞在時間が確定し、GAへデータが送信されます。

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
6. データレイヤー変数「DL - timerEventNumber」を作る
7. データレイヤー変数「DL - timerInterval」を作る
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

### 参考
- [#GTMTips: Fire Trigger When User Is About To Leave The Page](https://www.simoahava.com/analytics/fire-trigger-when-user-about-to-leave-page/) - Simo Ahava's blog
- [How to Use Timer triggers in Google Tag Manager V2](https://www.clickinsight.ca/blog/timer-triggers-google-tag-manager-v2)
