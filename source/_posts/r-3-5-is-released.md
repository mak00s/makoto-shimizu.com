---
title: Rが3.5.0へメジャーアップデートしたので簡単アップデート
date: 2018-04-25 11:00:00
categories: 
tags:
  - 
thumbnailImage: /images/R-logo.png
---

Rが1年ぶりに3.5.0へとメジャーアップデートしたので、今後に主流となるであろう楽なアップデート方法についてメモ。

アップデートが無いかオンラインで確認し、ある場合はアップデートをダウンロードして適用する、という一連の作業がRのコマンド一発で可能です。
<!-- more -->

## Macの場合
まず、パッケージを2つインストールしておきます。
```
install.packages("devtools")
devtools::install_github("AndreaCirilloAC/updateR")
```

![](/images/R-updateR.png)

上記2つをインストールした後は、以下の2行を実行するだけ。

```
library(updateR)
updateR(admin_password = "Macのパスワードをここへ")
```

## Windowsの場合
パッケージをインストールしておき
```
install.packages("installr")
```

以下のコマンドを実行。

```
setInternet2(TRUE) # Rが3.3.0よりも古い場合のみ必要
installr::updateR()
```

（私はWindowsでは試していません）

この「updateR」というパッケージは、年内には本体へ組み込む予定だそうです。

参考：[R 3.5.0 is released! (major release with many new features)](https://www.r-bloggers.com/r-3-5-0-is-released-major-release-with-many-new-features/) | R-bloggers
