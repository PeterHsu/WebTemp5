# WebTemp5
2018/03/02
## 專案目標
使用Serilog, 因為NLog會讓Electron程式啟動不了
## 安裝
```
Backend>dotnet add package Serilog.AspNetCore --version 2.1.1-dev-00022
Backend>dotnet add package Serilog.Settings.Configuration --version 2.6.0-dev-00081
Backend>dotnet add package Serilog.Sinks.Console --version 3.1.1
Backend>dotnet add package Serilog.Sinks.RollingFile --version 3.3.1-dev-00771
```
## 程式開發
Program.cs
```
using Serilog;
// ...
public static IWebHost BuildWebHost(string[] args) =>
    WebHost.CreateDefaultBuilder(args)
        .UseElectron(args)
        .UseStartup<Startup>()
        .UseSerilog((ctx,cfg)=>cfg.ReadFrom.Configuration(ctx.Configuration))
        .Build();

```
appsettings.json
```
"Serilog": {
  "MinimumLevel": {
      "Default": "Debug",
      "Override": {
          "Microsoft": "Warning"
      }
  },
  "WriteTo": [
    { "Name": "Console" },
    { "Name": "RollingFile", "Args": { "pathFormat" : "Logs/log-{Date}.txt"}}
  ]
}

```
ValuesController.cs
```
using Serilog;
...
[HttpGet]
public IEnumerable<string> Get()
{
    Log.Information("api/Values,GET");
    return new string[] { "value1", "value2" };
}
```
## 排除Logs目錄
.gitignore
```
# Logs
Logs/
```
## 建置
###測試
```
Backend>dotnet run
```
###瀏覽
http://localhost:5000/api/values
###檢查
應該會產生Backend/Logs/log-{Date}.txt
