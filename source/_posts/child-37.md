---
title: 波を見るより先にプログラムで再現する13歳
permalink: 13-years-old-boy-simulates-and-learns
categories:
  - こどもIA日記
date: 2014-01-20 00:30:13
tags:
thumbnailImage: /images/ia-kid/simulation-pendulum.png
---

[13歳のデジタルキッズと学ぶ2014年のWeb解析](../analytics-2014-with-my-son/)で書いたような経緯で、子どもは４つのサイトを立ち上げ、がんばって更新しています。

中学1年生の授業では「**物理**」はまだ始まってませんが、冬休み中に**塾で習って**興味を持ったようです。
<!-- more -->

塾から家に帰る途中の電車の中でさっそく、振り子を**プログラミングでシミュレーション**してみた様子。

息子のブログ記事「[振り子もどき](http://simsizer.blogspot.jp/2014/01/processing_12.html)」から引用：

> 電車内で物理の勉強をしていたら振り子を再現するプログラムを作りたくなり、とりあえずここまで作ってみました。

え、**習った理論をプログラミングで再現して確かめる**ってこと？！

## スゲー！！！

![](/images/ia-kid/simulation-pendulum.png)

動く結果はこちら→「[振り子もどき](http://simsizer.blogspot.jp/p/blog-page_12.html)」

※まだ途中のため重力を加味した動きにはなってません

## さらに波をシミュレーション

その二日後には、[波をシミュレーションした結果](http://simsizer.blogspot.jp/2014/01/processing_14.html)をブログにポストしてました。

動く実物はこちら

{% raw %}
<canvas height="400" width="400"></canvas>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.1/processing.min.js"></script>
	<script>
    window.onload = function() {
      // canvas要素
      var canvas = document.getElementsByTagName('canvas')[0];
      // Proccessingのコードが書かれたscript要素
      var codeElm = document.getElementById('processing-code');
      // 上記要素の内容を取得
      var code = codeElm.textContent || codeElm.innerText;
      // 実行
      new Processing(canvas, code);
    };
  </script>
  <script id="processing-code" type="application/processing">
float seido = 1;
float haba = 100;
float syuuki = 200;
float speed = 16;
float henka = 110;
float default_haba;
float trans = 0;
//0,255,0,50
void setup(){
  size(400,400);
  smooth();
  noStroke();
  default_haba = haba;
}
void draw(){
  fill(0,20);
  rect(0,0,width,height);
  fill(20,31,230,20);
  trans = 50*sin((float)frameCount/21);
  translate(0,height);
  haba = default_haba*sin((float)frameCount/henka);
  for(float x=0; x<=width;x+=seido){
    rect(x,0,seido,trans-height/2+haba*sin((speed*frameCount+x)/syuuki));
  }
}
</script>
{% endraw %}

本人いわく

> 本物の波を見る機会は少ないのでうまく再現できているかどうかはわかりませんが

そういえば海に行ったことがなかったよね...（ディズニーシーで見たかも？という程度）。

**順番が逆**になったけど、今度波を見にいこうね！

次回は、[4〜13歳までを振り返ってまとめてみましょう](../13-year-old-programmer/)。