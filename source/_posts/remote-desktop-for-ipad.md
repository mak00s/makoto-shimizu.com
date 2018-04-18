---
title: iPhoneとiPad用リモートデスクトップアプリ13種類まとめ
categories:
-
date: 2013-09-01 23:11:59
tags:
  - iPhone
---

iPhoneやiPadからPCを操作できる**リモートデスクトップ**のアプリを13個評価しました。FXやテレワーク（自宅勤務）、サーバー管理、SEO調査などに便利です。

PCやMacのデスクトップを遠隔操作する規格は、VNCとRDPの二つあります（参考：[Wikipedia](http://ja.wikipedia.org/wiki/Remote_Desktop_Protocol)）

### RDP (Remote Desktop Protocol)

Microsoft純正の規格。接続先のWindowsはProfessionalエディション限定。家庭用のHomeエディションには接続できない。
接続元のクライアント側は、Windowsならアクセサリの中に「リモートデスクトップ接続」という接続アプリが入っている。MacやLinuxの場合はアプリのインストールが必要。iOS（iPhoneやiPad）用のアプリについては以下で紹介。

### VNC (Virtual Network Computing)

OSに依存しないオープンソースの規格。PCやMac、Linux用のアプリがいろいろ出ている。
接続先マシンにVNCサーバーのインストールが必要（Mac OS Xは標準装備：システム環境設定＞共有で「下面共有」にチェック）。

接続元のクライアント側はアプリのインストールが必要（Mac OS Xは標準装備：Fingerの「サーバーへ接続」でアドレスを指定）。

まとめると、Windows Professionalに接続するならRDP、Windows HomeやMac、Linuxに接続するならVNC、ですね。

このページでは、iPhoneやiPadなどのiOSデバイスからWindows Professionalのマシンをリモート操作するためのアプリについて紹介します。
VNC方式（LogMeInやPC2Me+などの独自方式も含む）については、[VNCクライアント16種類まとめ](../vnc-for-ipad-iphone/)のエントリーをどうぞ。

## iPhoneやiPadで使えるリモートデスクトップアプリ

iOS（iPhoneとiPad）で使えるリモートデスクトップのクライアントアプリを日本とUSのiTunes Storeで探し、見つかったものを全部、価格順に並べました。

いろいろ使ったり調べたりしてみましたが、違うポイントのは、マウスの操作方式、（iPhone/iPad側での）日本語入力への対応、サウンド再生、対応OS、iPadのフルスクリーン対応、外部モニタ対応、です。

### Microsoftリモートデスクトップ (無料) [Download](https://itunes.apple.com/jp/app/microsoft-%E3%83%AA%E3%83%A2%E3%83%BC%E3%83%88-%E3%83%87%E3%82%B9%E3%82%AF%E3%83%88%E3%83%83%E3%83%97/id714464092?mt=8)

Microsoft自身による公式アプリ。2018年現在はこれがベスト。以下で色々評価していましたが、ベストだったiTapをマイクロソフトが買収して公式アプリとして提供を開始したので、他のアプリの存在意義がほとんどなくなりました。

### iRdesktop by Thinstuff (無料) [Download](https://itunes.apple.com/jp/app/irdesktop/id311467740?mt=8)

無料アプリの中では唯一実用的。iPadのフルスクリーンにも対応。サウンドが再生されない、クリップボードを共有できない、など機能は限定的。2011年でアップデート停止。

対応OS：Windows XP, Vista, Server 2000/2003/2008
マウス操作：ポイント＆クリック方式。マウスが表示されないので、どこをクリックしているかが分からないのが不便。結果的にいつも大きくズームして操作することになる。</td>
サウンド再生：未対応
日本語入力：未対応
iPadのフルスクリーン：対応

### iRemoteDesktop by By Hana Mobile (600円) [Download](https://itunes.apple.com/jp/app/rimotodesukutoppu/id343556263?mt=8)

日本語では「リモートデスクトップ」という名称。iTunesの説明文は機械翻訳。英語でも情報不足のため、詳細不明。ネガティブなコメントも寄せられている。もっと良いのがあるので、選ぶ理由はあまり無い。無料版もある。最後にアップデートされたのは2016年。

### Remote Desktop by Mocha Soft (720円) [Download](https://itunes.apple.com/jp/app/remote-desktop-rdp/id288362053?mt=8)

ハイブリッドでiPadにも対応。2018年4月になってもまだアップデートされているが、サウンドと日本語入力に対応していないため、機能面で劣る。

対応OS：Windows XP, Vista, 7のみ。Windows Serverには未対応
マウス操作：ポイント＆クリック方式
サウンド再生：未対応
日本語入力：未対応
iPadのフルスクリーン：対応

### Remote Desktop Lite by Mocha Soft (無料) [Download](https://itunes.apple.com/jp/app/remote-desktop-lite-rdp/id288362576?mt=8)

上記の無料版。制限として右クリックやドラッグ、矢印やCtrl+Alt+Deleteなどの特殊キー入力ができないため、お試し版的な位置づけ。

### iTap mobile RDP by HLW (公開終了)

機能・操作性ともに最高峰。iPhone/iPad側の外部モニタ出力、クリップボード共有、各種セキュリティ設定などにも対応。頻繁にアップデートされている。iPadなら最も優秀。

2014年1月追記：買収されて公開終了。マイクロソフトのアプリとして生まれ変わった。

対応OS：Windows XP, Vista, 7, Server 2000/2003/2008
マウス操作：ポイント＆クリック方式。長押しでカーソル付近のみズーム表示されるので、細かい操作がしやすい。
サウンド再生：可能
日本語入力：対応
iPadのフルスクリーン：対応

### Desktop Connect by Antecea (1,800円) [Download](https://itunes.apple.com/jp/app/desktop-connect/id364907570?mt=8)

RDPとVNCの両方に対応しているので接続先が WindowsのHomeエディションやMacでも接続できるお得なアプリ。外部モニタ出力やクリップボード共有にも対応。最後にアップデートされたのは2014年。

対応OS：Windows XP, Vista, 7, Server 2003/2008
マウス操作：ポイント＆クリックとタッチパッド方式を切り替え可能
サウンド再生：可能
日本語入力：未対応
iPadのフルスクリーン：対応

### eZDesktop VNC and RDP by Antecea（開発終了）

2分間の限定お試ししかできないのに3,000円の有料アプリで、RDPとVNCそれぞれに対応するためにさらに850円のアプリ内課金が必要。苦情やサポートが放置されている。追記：2010年に開発終了。上記のDesktop Connectが後継版とのこと。

対応OS：Windows XP, Vista, 7, Server 2003/2008
マウス操作：ポイント＆クリックとタッチパッド方式を切り替え可能
サウンド再生：可能
日本語入力：未対応
iPadのフルスクリーン：未対応

### PocketCloud Remote Desktop Pro by Wyse (1,800円)（開発終了）

RDPとVNCの両方をサポート。外部モニタ出力も可能。アプリ内課金をすると、機能が増える。Android版アプリもある。日本語サイトや日本語サポートもあり、体制がしっかりしているのが安心。コストパフォーマンスが高い。

対応OS：Windows XP, Vista, 7, Server 2003/2008
マウス操作：ポイント＆クリック方式
サウンド再生：可能
日本語入力：対応
iPadのフルスクリーン：対応

### Jump Desktop by Phase Five Systems (1,800円) [Download](https://itunes.apple.com/jp/app/jump-desktop-remote-desktop/id364876095?mt=8)

RDPとVNCの両方をサポート。外部モニタ出力も可能。3Gで外部から接続するためのサポート機能もある。日本では知名度が低いが、海外では評判が高い。最後にアップデートされたのは2017年。

対応OS：Windows 2000, XP, Vista, 7, Server 2000/2003/2008
マウス操作：ポイント＆クリック方式
サウンド再生：可能
日本語入力：未対応
iPadのフルスクリーン：対応

### iTeleport: VNC/RDP by iTeleport (3,000円) [Download](https://itunes.apple.com/jp/app/iteleport-vnc-rdp/id286470485?mt=8)

操作性やパフォーマンスの面で評判が高かったJaadu Remote Desktopが名前を変えて復活。最後にアップデートされたのは2017年。

対応OS：Windows XP, Vista, 7, Server 2003/2008
マウス操作：マウスポインターを操作するタッチパッド方式
サウンド再生：可能
日本語入力：可能
iPadのフルスクリーン：対応

## 結論

**日本語入力ができるものは３つ**しかなさそう。

iPhoneで評判が良いのが[**iTeleport VNC/RDP**](https://itunes.apple.com/jp/app/iteleport-vnc-rdp/id286470485?mt=8)。最近になって、ようやくiPadにも対応しました。ただし2,200円と高いです。

2013年9月の時点でオススメなのは、iPadのフルスクリーンにも対応していて、比較的安価な **[iTap mobile RDP](https://itunes.apple.com/jp/app/itap-mobile-rdp-remote-desktop/id317062064?mt=8) **と **[PocketCloudリモートデスクトップPro](https://itunes.apple.com/jp/app/pocketcloud-rimotodesukutoppu/id326512817?mt=8) **。
私はこの二つを購入しました。ハイブリッドなのでiPhoneとiPadの両方で使えます。PocketCloudの方はVNCにも対応しています。

利用頻度が低く、iPhone/iPadのキーボードで日本語入力ができなくても良い、安い方が良い、という場合は、無料の[**iRdesktop**](https://itunes.apple.com/jp/app/irdesktop/id311467740?mt=8)でお試しを。

_2018年4月追記：iTap mobileをマイクロソフトが買収して公式アプリとして提供を開始したので、他のアプリの存在意義がほとんどなくなりました。_