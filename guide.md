# 說明
2017/12/07
## 目標
CRUD
## 環境
```
>dotnet add package System.Data.SQLite --version 1.0.106
>dotnet add package Dapper --version 1.50.4
>dotnet add package Dapper.Contrib --version 1.50.4
>dotnet add package Autofac --version 4.6.2
>dotnet add package Autofac.Extensions.DependencyInjection --version 4.2.0
>dotnet add package NLog --version 4.5.0-rc02
>dotnet add package NLog.Web.AspNetCore --version 4.5.0-rc1
```
## 新增Controller
在Controllers\新增CRUD1Controller.cs
```cs
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using Microsoft.Extensions.Options;
using Backend.Configuration;
using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    public class CRUD1Controller : Controller
    {
        private readonly ConfigData _configData;
        private readonly ILogger<CRUD1Controller> _logger;
        private readonly IDbConnection _conn;
        public CRUD1Controller(IOptions<ConfigData> configData,ILogger<CRUD1Controller> logger, IDbConnection conn)
        {
            _configData = configData.Value;
            _logger = logger;
            _conn = conn;
        }

        // GET api/crud1
        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInformation("api/crud1, Get");
            _conn.ConnectionString = _configData.ConnectionString;
            return Ok(_conn.GetAll<RegionResult>());
        }

        [Table("Region")]
        class RegionResult
        {
            [ExplicitKey]
            public int Id { get; set; }
            public string RegionDescription { get; set; }
        }
    }
}
```
## 修改Program.cs
```cs
using Autofac.Extensions.DependencyInjection;
using NLog.Web;
```
...
```cs
    public static IWebHost BuildWebHost(string[] args) =>
        WebHost.CreateDefaultBuilder(args)
            .ConfigureServices(services => services.AddAutofac())
            .UseStartup<Startup>()
            .UseNLog()
            .Build();
```
## 新增AutofacModule.cs
```cs
using System.Data;
using System.Data.SqlClient;
using Autofac;
using Microsoft.Data.Sqlite;

namespace Backend
{
    public class AutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<SqliteConnection>().As<IDbConnection>();
        }
    }
}
```
## 修改Startup.cs
```cs
using NLog.Web;
```
...
```cs
public void ConfigureServices(IServiceCollection services)
{
    services.Configure<ConfigData>(Configuration.GetSection("ConfigData"));
    services.AddMvc();
}

// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }
    
    env.ConfigureNLog("./Config/nlog.config");

    app.UseMvc();
    app.UseDefaultFiles();
    app.UseStaticFiles();
    app.Run( async (context) =>
    {
        if (!Path.HasExtension(context.Request.Path.Value))
        {
            await context.Response.SendFileAsync(Path.Combine(env.WebRootPath,"index.html"));
        }
    });
}
public void ConfigureContainer(ContainerBuilder builder)
{
    builder.RegisterModule(new AutofacModule());
}
```
## 新增組態類別
新增Configuration/ConfigData.cs
```cs
namespace Backend.Configuration
{
    public class ConfigData
    {
        public string ConnectionString { get; set; }
    }
}
```
## 修改組態
在appsettings.Development.json及appsettings.json
```json
  "ConfigData" : {
    "ConnectionString" : "data source = Northwind.sqlite"
  }
```
## 加入組態檔
新增Config/nlog.config
```xml
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      autoReload="true"
      internalLogLevel="trace"
      internalLogFile="./Logs/internal-nlog.txt">
  <targets aync="true">
    <target xsi:type="File" name="nlog" fileName="./Logs/nlog.log"
            layout="${longdate}|${uppercase:${level}}|${logger}|${message} ${exception}" />
    <target xsi:type="Null" name="blackhole" />
  </targets>
  <rules>
    <logger name="Microsoft.*" minlevel="Trace" writeTo="blackhole" final="true" />
    <logger name="*" minlevel="Trace" writeTo="nlog" />
  </rules>
</nlog>
```
## 排除Logs目錄
.gitignore
```
# Logs
Logs/
```
## Frontend
```bat
>npm install bootstrap@4.0.0-beta.2 --save
>npm install @progress/kendo-theme-bootstrap --save
```
## styles.scss
```ts
@import "~bootstrap/scss/bootstrap";
@import "~@progress/kendo-theme-bootstrap/scss/all";
```
## Grid
```bat
>npm install --save @progress/kendo-angular-grid @progress/kendo-angular-dropdowns @progress/kendo-angular-inputs @progress/kendo-angular-dateinputs @progress/kendo-data-query @progress/kendo-angular-intl @progress/kendo-angular-l10n @progress/kendo-drawing @progress/kendo-angular-excel-export @angular/animations
```
## crud1read
```bat
>ng g component crud1read
```
## app.module.ts
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Crud1readComponent } from './crud1read/crud1read.component';

@NgModule({
  declarations: [
    AppComponent,
    Crud1readComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
## crud1read.component.ts
```ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';

@Component({
  selector: 'app-crud1read',
  templateUrl: './crud1read.component.html',
  styleUrls: ['./crud1read.component.scss'],
})
export class Crud1readComponent implements OnInit {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private apiUrl = 'api/crud1';
  public list: Array<RegionResult>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getList();
  }

  getList(): void {
    this.http.get<RegionResult[]>(this.apiUrl)
      .subscribe(list => {
        this.list = list;
      });
  }
}
class RegionResult {
  id: number;
  regionDescription: string;
}
```
## crud1read.component.html
```html
<ul>
  <li *ngFor="let row of list"> {{row.id}}, {{row.regionDescription}} </li>
</ul>
<kendo-grid [data]="list" [height]="410">
  <kendo-grid-column field="id" title="ID" width="40">
  </kendo-grid-column>
  <kendo-grid-column field="regionDescription" title="Description" width="250">
  </kendo-grid-column>
</kendo-grid>
```
## app.component.html
```html
<div class="container">
  <router-outlet></router-outlet>
</div>
```
## app-routing.module.ts
```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Crud1readComponent} from './crud1read/crud1read.component';

const routes: Routes = [
  { path: '', redirectTo: '/crud1read', pathMatch: 'full' },
  { path: 'crud1read', component: Crud1readComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```