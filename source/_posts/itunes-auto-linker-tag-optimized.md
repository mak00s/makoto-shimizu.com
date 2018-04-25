---
title: iTunes Auto Linkerのタグを最適化
date: 2018-04-20 22:04:30
tags:
  - GTM
thumbnailImage: /images/apple/itunes-auto-link-maker-tag.png
---

iTunesストアのアプリDownloadページへのリンクを自動でアフィリエイト対応してくれるAuto Link Makerのタグがダラダラと長くて古風なので改善。
<!-- more -->

iTunesのアフィリエイト管理画面で発行されるタグの問題点は

* HTMLのバージョンが古い
* 冗長で長い
* SSL対応は今ドキは必須

そこで、以下のように改善してから導入しました。

{% gist mak00s/b173d4e6a84934c3ff1387d87c4a9010 %}

{% alert info %}
分かりやすくするために改行や空白を入れて整形しています
{% endalert %}

短くなってスッキリ。改善点は
* HTML5を前提としscriptのtype属性を省略
* httpとhttpsの判別をやめて常にhttpsに統一
* リピートするオブジェクト「document」と文字列「script」を変数化
* ２つのvarを１つにまとめた

参考にしたのはGoogle Tag Managerのタグです。

ツールが提供するタグは鵜呑みにしないで、自分のサイトや時代に合った形で入れるようにしたいものです。
（少しでもタグを変えると「サポートできない」という外資ベンダーの日本法人も存在するので要注意）