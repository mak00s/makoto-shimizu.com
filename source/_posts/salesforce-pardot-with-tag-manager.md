---
title: タグマネージャーでSalesforceのPardotを実装する方法
date: 2017-02-15 17:50:00
tags:
---

タグマネージャーでSalesforceの「**Pardot**」のタグを入れる方法について、公式ヘルプの説明がイマイチなのでメモを公開しておきます。

Pardotを導入するために発行されるのは以下のようなタグ。

{% gist mak00s/137c9b0d3760c7d41e12fc08351d8eb5 %}

グローバル変数に値をセットしてからJSファイルを非同期で読み込んでいるだけですね。

## Google Tag Managerの場合

[公式ヘルプ](https://help.salesforce.com/articleView?id=Using-Google-Tag-Manager-with-Pardot&language=en_US&type=1)に書かれている方法です。

カスタムHTMLタグを作り、Pardotのタグをそのまま貼り付けるという**安直な方法**です。

## Dynamic Tag Management (Adobe)の場合

### 安直な方法

DTMのルールを作り、Sequential HTMLタグとしてPardotのタグをそのまま貼り付けます。

![](/images/adobe/dtm-tag-sequential-html.png)

上記のGTMと同じ安直な方法です。これでも動作しますが、**タグマネの思想を無視した古風な方法**で、スマートではありません。

### タグマネージャーらしい方法

タグマネのメリットを活かして**改善**してみます。

ます、スクリプトをわざわざscriptタグで囲んでHTMLとして配信するのは無駄なので、JavaScriptコード用のタグに変更します。

Pardotは非同期ロードに対応しているので、Non-SequentialなJavaScriptタグを選択します。

![](/images/adobe/dtm-tag-sequential-js.png)

Pardotタグの最後の2行は外部JavaScriptファイルを非同期でロードする処理です。タグの発火タイミングを制御するのはタグマネに任せた方が良いので、この2行を削除します。

{% gist mak00s/3a60027585c6299968f27d577cf1b757 %}

ルールの条件指定の部分で、タグの発火タイミングをOnloadに変更します。

![](/images/adobe/dtm-rule-condition-onload.png)

さらに、変数をグローバル化するために「**Execute Globally**」にチェックを入れます。

![](/images/adobe/dtm-rule-condition-execute-globally.png)

勢いに乗って、さらに改善してみます。

{% gist mak00s/35c889849d2cf4e8763e5f0de278a45e %}

document と 'script' が何度も出現しているので、無名関数の引数として渡すことでスッキリさせてみました。

## 検証のポイント

コンソールで以下を確認します。

* 外部JSファイルの「pd.js」はロードされるか？
* piAId と piCId がグローバル変数になっているか？

以上、タグマネージャーを使ったタグの設定方法について紹介しました。
{% alert warning %}
タグはスマートに扱いたいものですが、あまり変更するとメーカーからの理解を得られなかったりサポートを断られることがあるので、よく理解した上で対応するようにしましょう！
{% endalert %}
