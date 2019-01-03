using System;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using dotnet_angular.SPA.Models;

namespace dotnet_angular.SPA.Controllers {

  [Route ("api/[controller]")]

  public class LoggingController : Controller {

    // POST api/values
    [HttpPost]
    public void Post ([FromBody] LoggerModel value) { }

    [ResponseCache (Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error () {
      return View (new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
  }

}