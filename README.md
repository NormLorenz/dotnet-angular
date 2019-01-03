* make three new projects

```bash
dotnet new angular -o dotnet-angular.SPA
dotnet new webapi -o dotnet-angular.API
dotnet new mstest -o dotnet-angular.TEST
```

* add a solution file and add the projects

```bash
dotnet new sln
dotnet sln dotnet-angular.sln add dotnet-angular.API/dotnet-angular.API.csproj
dotnet sln dotnet-angular.sln add dotnet-angular.SPA/dotnet-angular.SPA.csproj
dotnet sln dotnet-angular.sln add dotnet-angular.TEST/dotnet-angular.TEST.csproj
```

* hook in github

```bash
git remote add origin https://github.com/NormLorenz/dotnet-angular.git
git push -u origin master
```

* get ng to work right https://github.com/angular/angular-cli/wiki - DONE

* differences between rxjs version 5 and 6 https://www.academind.com/learn/javascript/rxjs-6-what-changed/
