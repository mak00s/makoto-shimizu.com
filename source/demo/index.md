---
title: Demo
date: 2018-07-17 13:49:00
comments: false
---

カスタマーアナリティクス体感Demoその１：送信内容がGoogle Sheetsへ反映され、GAの行動データと結合されます。

{% raw %}
<script>
  function postToGoogle() {
   var field1 = $("input[type='radio'][name='qs1']:checked").val();
   var field2 = $('#feed').val();
   var clientid = "x" + ga.getAll()[0].get('clientId');
   $.ajax({
     url: "https://docs.google.com/forms/d/e/1FAIpQLSewFdljex3bfTvxxc07HwpptyzTUx-j9-adEnbA8CK1_552IA/formResponse",
     data: {
       "entry.1340666436": clientid,
       "entry.877086558": field1,
       "entry.443565211": field2
     },
     type: "POST",
     dataType: "xml",
     statusCode: {
       0: function() {
         //Success message
       },
       200: function() {
         //Success Message
       }
     }
   });
 }
</script>

<form id="form" target="_self" onsubmit="" action="javascript: postToGoogle()">
  <fieldset>
    <label>夏は好きですか？</label>
    <input id="qs1_op_1" type="radio" value="はい" name="qs1" />はい
    <input id="qs1_op_2" type="radio" value="いいえ" name="qs1" />いいえ
  </fieldset>

  <fieldset>
    <label>ニックネーム</label>
    <textarea id="feed" name="feed"></textarea>
  </fieldset>
  <div style="width: 100%; display: block; float: right;">
    <button id="send" type="submit">
      送信する
    </button>
  </div>
</form>
{% endraw %}

※
送信しても画面は変わりません。送信結果は[このページに反映されます](https://docs.google.com/spreadsheets/d/1LJsKR3eyBy34apzdVgtYV8d3mZT-mp3kA0pgV7oLAiw/edit#gid=418492740)

再現方法
1. [Google Forms](https://www.google.com/forms/about/)でフォームを作る
2. このページのHTMLとJSをコピーしてURLやパラメータを修正
3. このページにGAを導入し[client IDをカスタムディメンションへ入れる](/news/how-to-measure-google-analytics-client-id-with-gtm-2017/)
4. 回答が記入されるGoogle SheetsにGAのアドオンを入れてデータ抽出
5. [サンプル](https://docs.google.com/spreadsheets/d/1LJsKR3eyBy34apzdVgtYV8d3mZT-mp3kA0pgV7oLAiw/edit#gid=406719613)を参考にまとめシートを作る