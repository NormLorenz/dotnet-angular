using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using dotnet_angular.SPA.Models;

namespace dotnet_angular.SPA.Controllers
{

  [Produces("application/json")]
  [Route("api/Identity")]
  public class IdentityController : Controller
  {

    // Windows Authentication relies on the operating system to authenticate users of ASP.NET Core apps.
    // You can use Windows Authentication when your server runs on a corporate network using Active Directory
    // domain identities or other Windows accounts to identify users. Windows Authentication is best suited 
    // to intranet environments in which users, client applications, and web servers belong to the same Windows domain.

    private readonly IConfiguration _configuration;

    public IdentityController(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    [HttpGet("[action]")]
    public IActionResult IdentityData()
    {

      try
      {

        var userIdentity = User.Identity.Name;
        var isAuthenticated = User.Identity.IsAuthenticated;

        return Ok(new Dictionary<string, string> {

          // from identity
          { "UserIdentity", "UMPQ\nlorenz" },
          { "IsAuthenticated", "True" },

          // from associate table
          { "AssociateID", "410" },
          { "UserName", "nlorenz" },
          { "FullName", "Norm Lorenz" },
          { "DepartmentID", "13" },
          { "WorkgroupID", "20" },
          { "RoleID", "10" },
          { "AreaID", "2" },
          { "EmployeeNumber", "401455" },

          // from role table
          { "RoleName", "Admin" },

        });

      }
      catch (Exception e)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
      }
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
      return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
  }

}