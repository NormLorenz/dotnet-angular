![angular](angular-logo.png)

# IDEA Session
This presentation is a follow up from the talk given last week by Andres with some additional ideas how to set up an Angular project. The difference is that I'm not only going to talk about Angular but also talk about the middle tier. I will show a template provided by Microsoft that is part of the .NET Core framework. The advantage of this template is to build a single deploy containing both the front end JavaScript client and the middle tier Web API.

* I'll demonstrate how to create a project from scratch and show you the Production Tracking POC I'm working on.

*	Along the way I will talk about:
	* .NET Core
	* Angular CLI
	* Karma/Jasmine testing
	* Entity Framework
	* Controllers
	* Scaffolding
	*	Angular Materials
	* Building a deployable package

* After the presentation I'll post these set of instruction to our group.

## The Template
> The template provided is used to create a Single Page Application (SPA) end to end Angular 5 CLI application using platform independent .NET Core 2.1.302, C# controller backend and Karma/Jasmine test framework. The template is equivalent to creating an ASP.NET Core project to act as an API backend and an Angular CLI project to act as a UI. The template offers the convenience of hosting both project types in a single application project. Consequently, the project can be built and published as a single unit.

## Install .NET Core (use version 'dotnet-sdk-2.1.302-win-gs-x64.exe')
* [Linux (Ubuntu)](https://www.microsoft.com/net/learn/get-started/linux/ubuntu16-04)
* [Windows](https://www.microsoft.com/net/learn/get-started/windows)

## Install Visual Studio Code
* https://code.visualstudio.com/Download?wt.mc_id=DotNet_Home&dotnetid=602653416.1520350690

## Create our first Angular Application
* https://docs.microsoft.com/en-us/aspnet/core/client-side/spa/angular?tabs=visual-studio&view=aspnetcore-2.1

```bash
dotnet new angular -o dotnet-angular
cd dotnet-angular
code .
```

* show the folder layout structure

## Run the Application

* modify the program.cs file

```csharp
public static IWebHostBuilder CreateWebHostBuilder (string[] args) =>
	WebHost
		.CreateDefaultBuilder (args)
		.UseUrls ("http://localhost:5555")
		.UseStartup<Startup> ();
```
* build and run the application

```bash
dotnet build
dotnet run
```
* open the browser to http://localhost:5555
* file watchers will rerender after any code changes
* stop the application (Ctrl + C)

## Testing
* the template uses Karma/Jamine testing framework

```bash
cd ClientApp
# convert to a headless browser (ChromeHeadless) in karma.conf.js
# browsers: ['ChromeHeadless'],
ng test
```

* test the counter operation
* add the following code ClientApp/src/app/counter/counter.component.spec.ts line 33

```javascript
incrementButton.click();
incrementButton.click();
```

* fix the error line 35

```javascript
expect(countElement.textContent).toEqual('3');
```

## Show Production Tracking POC
* converted to angular materials
* expanded the router
* scaffolded the SQL database 
* scaffolded the controllers
* built features modules
* connected to a TFS git repo

## Scaffold the database .NET Core EF
```bash
dotnet ef dbcontext scaffold "Data Source=X77777BD00701V\SQL01;Initial Catalog=ProductionTracking;Integrated Security=SSPI;" Microsoft.EntityFrameworkCore.SqlServer -o Models
```

## Scaffold the controllers for CRUD operations
```bash
# install the tool
# https://www.nuget.org/packages/dotnet-aspnet-codegenerator/2.1.1
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools 
dotnet add package Microsoft.EntityFrameworkCore.SqlServer.Design
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design --version 2.1.1
dotnet restore

# generate the controller
# https://mattmillican.com/blog/aspnetcore-controller-scaffolding
dotnet aspnet-codegenerator controller -name HolidayController -api -m Holiday -dc ProductionTrackingContext -outDir Controllers -f
dotnet aspnet-codegenerator controller -name DepartmentController -api -m Department -dc ProductionTrackingContext -outDir controllers -f
```

## Scaffold angular artifacts
```bash
cd ClientApp
ng generate component my-component --module app
```

## Host and deploy .NET Core
* https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/index?view=aspnetcore-2.1&tabs=aspnetcore2x
* https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-publish?tabs=netcore21

```bash
dotnet publish
```

## Questions
* https://repo/tfs/EPD1/Production%20Tracking/_git/Production%20Tracking
