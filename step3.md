# WebTemp5
2018/03/09
## 專案目標
使用SignalR
## 安裝
```
Backend>dotnet add package Microsoft.AspNetCore.SignalR --version 1.0.0-preview1-final
```
## 程式開發
## 安裝
```
Frontend>npm install --save @aspnet/signalr
```
## 程式開發

## 問題處理
Web更新了之後Electron顯示一樣的畫面是因為有Cache  
\<yourAppName\>為ElectronNET.Host
Windows:  
C:\Users\<user>\AppData\Roaming\<yourAppName>\Cache  
Linux:  
/home/<user>/.config/<yourAppName>/Cache  
OS X:  
/Users/<user>/Library/Application Support/<yourAppName>/Cache  

