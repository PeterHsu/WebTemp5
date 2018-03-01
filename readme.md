# WebTemp5
2018/03/01
## 專案目標
使用Electron建立Windows程式  
## 安裝
```
Backend>dotnet add package ElectronNET.API --version 0.0.9
```
.csproj
```
<ItemGroup>
  <DotNetCliToolReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Tools" Version="2.0.2" />
  <DotNetCliToolReference Include="ElectronNET.CLI" Version="0.0.9" />
</ItemGroup>
```
```
Backend>dotnet restore
```
## 程式開發
Program.cs
```
using ElectronNET.API;
// ...
public static IWebHost BuildWebHost(string[] args) =>
    WebHost.CreateDefaultBuilder(args)
        .UseElectron(args)
        .UseStartup<Startup>()
        .Build();

```
Startup.cs
```
using ElectronNET.API;
// ...
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }
    else
    {
        app.UseExceptionHandler("/Home/Error");
    }

    app.UseStaticFiles();

    app.UseMvc(routes =>
    {
        routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}");
    });
    Task.Run(async () => await Electron.WindowManager.CreateWindowAsync());

```
## 建置
初始
```
Backend>dotnet electronize init
```
測試
```
Backend>dotnet electronize start
```
建置
```
Backend>dotnet electronize build /target win
```
執行
```
Backend>./bin/desktop/ ElectronNET.Host-win32-x64/ ElectronNET.Host.exe
```
