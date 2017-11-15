# WebTemp5
2017/11/07
## 專案目標
以Angular 5及ASP.NET Core 2.0建置網站  
## 需要
1. NodeJS: v8.9.0
1. .NET Core 2.0.2
1. @angular/cli : v1.5.0
## 檢查
1. $ node --version
1. $ dotnet --version
1. $ ng --version
## 開發工具
1. Visual Studio Code
1. 安裝C#
## 建立專案目錄
建立WebTemp4目錄
## 建立Frontend專案
```
WebTemp4>ng new Frontend --skip-install --routing --style=scss
```
刪除.git目錄
## 調整Frontend程式
修改Frontend/.angular-cli.json
```
"outDir": "../Backend/wwwroot",
```
新增proxy.conf.json
```
{
  "/api":{
    "target": "http://localhost:5000",
    "secure": false
  }
}
```
修改package.json
```
"start": "ng serve --proxy-config proxy.conf.json",
```
## 建立Backend專案
在WebTemp5目錄下新增Backend目錄
```
Backend>dotnet new webapi
Backent>echo. 2>.gitignore
```
到https://www.gitignore.io/
輸入VisualStudioCode及CSharp,執行Create, 複製內容到.gitignore
## 調整Backend程式
修改Backend/Startup.cs
```
app.UseMvc();
app.UseDefaultFiles();
app.UseStaticFiles();
```
## 加入版控
```
WebTemp5>git init
WebTemp5>git add --all
WebTemp5>git commit -m "first commit"
```
## 開始建置
```
WebTemp5\Fontend>npm install
WebTemp5\Fontend>ng build --prod --aot
WebTemp5\Backend>dotnet restore
WebTemp5\Backend>dotnet run
```
瀏覽 http://localhost:5000/

