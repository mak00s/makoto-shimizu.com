---
title: Demo 06. 長いLPのパーツごとに精読をカウント
date: 2020-05-19 00:30:00
permalink: demo/area-visibility
tags:
  - Demo
  - Google Analytics
thumbnailImage: 
---

LPのような長いページの場合、表示回数（PV）よりも、どこまでスクロールしてじっくりコンテンツを読み込んだか、が重要です。GTMを使うと、画面の何パーセントまでスクロールされたか、を簡単に計測できますが、ページによってパーセントの解釈が異なり、分析が難しくなるので、ページをセクション（パーツ）に分割し、その単位で画面にN秒間以上表示された、という計測方法がオススメです。

ただし、ページの作り方に合わせてGTMの設定を追加したり削除するのは運用が大変なので、ページ制作時に決められた属性を追加するだけで、GTMの設定を変更することなく計測すると良いでしょう。

このページ自体に実装してあるので、以下のセクションそれぞれを80%以上、ブラウザの画面に表示させた状態で3秒間が過ぎると、GAでイベントが計測され、画面右上に通知が表示されます。ゆっくりスクロールしてみてください。
<!-- more -->

## DEMO

{% alert success %}
### セクション1
<div data-track-name="Section 1" data-track-trigger="view3sec">
GTMで、この文章が含まれるセクション1の表示を計測するためには、idの値「sec1」をスクロール判定条件として指定するのが安直な設定方法ですが、

* セクションが増えたり、名前が変わった場合にGTMの設定も合わせて更新する必要があり、運用が面倒
* id属性は、別の目的で使っていて自由に設定できないこともある

という問題があります。

そこで、対象セクションを囲むdivタグに以下の属性を付与し、GTMがその値を読み取って自動的に計測するようにします。

まず、セクション名など、GAのレポート上で表示される文字列を指定します。
```html
data-track-name="sec1"
```
次に、計測の条件を指定します。
```html
data-track-trigger="view3sec"
```
「view」は「表示」の意味で、さらに続けて「3sec」、つまり3秒間、という表示計測のタイマー時間を指定しています。

応用例として、「click」や「hover」なども条件として考えられますね。
</div>
{% endalert %}

{% alert success %}
### セクション2
<div data-track-name="Section 2" data-track-trigger="view3sec">
これらの値を読み取ってGA計測するために、GTMの設定を行います。

まず、GTMのトリガーを作ります。
トリガーのタイプは「要素の表示」、
選択方法は「CSSセレクタ」、
要素セレクタには以下のように入力します。

> [data-track-trigger="view3sec"]

トリガーを起動するタイミングは「1要素につき1度」に変更します。一つのページにセクションが複数ある場合、それぞれのセクション単位で一回ずつ計測するためです。

画面上での最小表示時間を設定、には3000（3秒）

1秒、5秒、などエリアによって表示時間を変えたい場合は、同じようにトリガーを作成します。
</div>
{% endalert %}

{% alert success %}
### セクション3
<div data-track-name="Section 3" data-track-trigger="view3sec">
次に、表示されたエリアの名前を取得するために、GTMの変数を一つ作成します。

変数のタイプは「データレイヤーの変数」で、
変数名には以下を入力します。

> gtm.element.dataset.trackName

gtm.elementはGTM標準のデータレイヤー変数で、計測対象の要素（タグ）が格納されます。この要素に付与された「data-track-name」は、「data-」が削除され、ハイフン「-」も削除され、続く単語の頭が大文字に変換されるので、「dataset.trackName」という少し異なる表記で値を取り出しています。

参考：[データ属性の使用](https://developer.mozilla.org/ja/docs/Learn/HTML/Howto/Use_data_attributes) - MDN Web Docs
</div>
{% endalert %}

{% alert success %}
### セクション4
<div data-track-name="Section 4" data-track-trigger="view3sec">
最後に、セクション2で作成したトリガーを使ったGAのタグを作成します。

Event Categoryは「要素表示」などお好みで。

Event Actionには「3秒表示」などのアクションを。

Event Labelには、先ほど作成した変数を指定します。
</div>
{% endalert %}

GTMの設定は以上でおしまいです。今後は、ページに属性を追加するだけで、要素の表示をGoogle Analyticsで計測できるようになりました。GTMを毎回編集する必要はありません。

{% alert warning %}
今回は説明のために実装をシンプルにしましたが、「何秒間」という秒数の条件もdata-track-durationなどの属性でセクションごとに指定しても良いですし、＋３点、＋５点、とスコアリングの加点を指定したり、GAのカスタム指標の番号を指定するなど、いろいろな応用が可能です。
{% endalert %}