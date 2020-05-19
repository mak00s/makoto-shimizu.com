---
title: Demo 06. 長いLPのパーツごとに精読をカウント
date: 2020-05-19 12:30:00
permalink: demo/area-visibility
tags:
  - Demo
  - Google Analytics
thumbnailImage: 
---

LPのような長いページの場合、表示回数（PV）よりも「どこまでスクロールしてじっくりコンテンツを読み込んだか」が重要です。GTMを使うと、画面の何パーセントまでスクロールされたか、を簡単に計測できますが、ページによってパーセントの解釈が異なり、分析が難しいので、ページをセクション（パーツ）に分割し、その単位で画面にN秒間以上表示された、という計測方法がオススメです。

ただし、ページの作り方に合わせてGTMの設定を追加したり削除するのは運用が大変なので、ページ制作時に決められた属性を追加するだけで、GTMの設定を変更することなく計測すると良いでしょう。

このページ自体に実装してあるので、ゆっくりスクロールしながら以下のセクション2以降をブラウザの画面に表示させた状態で2秒などの指定時間が過ぎると、GAでイベントが計測され、画面右上に通知が表示されます。
<!-- more -->

## DEMO

{% alert info %}
### セクション1（設定なし）
<div id="sec1">
GTMでコンテンツ要素の表示を計測するためには、idやclassなどのタグの属性を判定条件として指定するのが安直な設定方法ですが、

* セクションが増えたり、名前が変わった場合にGTMの設定も合わせて更新する必要がある
* idやclass属性は、別の目的で使っていて自由に設定できないこともある

という問題があります。

そこで、対象セクションを囲むdivタグに以下のような計測目的に特化した属性を付与し、GTMがその値を読み取って自動的に計測するようにすれば、GTMの運用が不要になります。

まず、セクション名など、アナリティクスのレポート上で表示される文字列を指定します。
```html
data-track-name="Section 2"
```
次に、計測の条件を指定します。
```html
data-track-trigger="view"
data-track-duration="2000"
```
「view」は「表示」の意味。
durationは表示期間で、ミリセカンドで指定します。2000ミリセカンド＝２秒間、です。

応用例として、「click」や「hover」なども条件として考えられますね。

実際に以下の「セクション2」に設定してあるので、セクション2の高さのうち20%以上を2秒間表示させると、Google Analyticsのイベント計測が発火します。
</div>
{% endalert %}

{% alert success %}
### セクション2（20%を2秒間）
<div data-track-name="Section 2" data-track-trigger="view" data-track-duration="2000">
このセクションのdivタグに設定された
```html
data-track-name="Section 2"
data-track-trigger="view"
data-track-duration="2000"
```

という3種類の値を読み取ってGoogle Analyticsで計測するために、Google Tag Manager（GTM）の設定を行います。

#### （１）GTMの変数を作る
まず、HTMLタグの属性として設定された各種設定内容を取得するために、「データレイヤーの変数」の変数を２つ作成します。

1. エリアの名前
変数名には以下を入力します。
> gtm.element.dataset.trackName

2. 表示時間（ミリセカンド）
変数名には以下を入力します。
> gtm.element.dataset.trackDuration

変数名の中の「gtm.element」はGTM標準のデータレイヤー変数で、計測対象の要素（タグ）が格納されます。属性の名前「data-track-name」のうち、「data-」の部分は自動で削除され、ハイフン「-」も削除され、続く単語の頭が大文字に変換されるので、「dataset.trackName」という少し異なる表記になります。

参考：[データ属性の使用](https://developer.mozilla.org/ja/docs/Learn/HTML/Howto/Use_data_attributes) - MDN Web Docs
</div>
{% endalert %}

{% alert success %}
### セクション3（20%を1秒間）
<div data-track-name="Section 3" data-track-trigger="view" data-track-duration="1000">
（このセクションは表示条件を1秒間に設定してあります）
```html
data-track-name="Section 3"
data-track-trigger="view"
data-track-duration="1000"
```

#### （２）GTMのトリガーを作る
次に、「要素の表示」タイプのトリガーを作ります。
選択方法は「CSSセレクタ」、要素セレクタには以下のように入力します。

> [data-track-trigger="view"]

「トリガーを起動するタイミング」は「1要素につき1度」に変更します。一つのページにセクションが複数ある場合、それぞれのセクション単位で一回ずつ計測するためです。

「画面上での最小表示時間を設定」には、先ほど作成したGTM変数を指定します。
</div>
{% endalert %}

{% alert success %}
### セクション4（20%を4秒間）
<div data-track-name="Section 4" data-track-trigger="view" data-track-duration="4000">
（このセクションは表示条件を4秒間に設定してあります）
```html
data-track-name="Section 4"
data-track-trigger="view"
data-track-duration="4000"
```

#### （３）GTMのタグを作る
最後に、作成したトリガーを使ってGAのタグを作成します。

Event Categoryは「精読」など、お好みで。

Event Actionには「要素表示」などのアクションを。

Event Labelには、先ほど作成したtrackNameの変数を指定します。
</div>
{% endalert %}

GTMの設定は以上でおしまい。今後は、どのページでも、divなどのタグに属性を追加するだけで、要素の表示をGoogle Analyticsで計測できるようになりました。もうGTMを毎回編集する必要はありません。運用が劇的に楽になりました。楽というより、運用フリー、不要になりました！

{% alert warning %}
今回は説明のために実装をシンプルにしましたが、「20%」という表示条件も変数にしたり、＋３点、＋５点、といったスコアリングの加点を指定したり、GAのカスタム指標の番号を指定するなど、いろいろな応用が可能です。クリックやオンマウスの計測も同じ方式で実現できます。
{% endalert %}