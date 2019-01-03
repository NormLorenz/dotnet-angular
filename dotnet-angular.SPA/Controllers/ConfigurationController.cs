using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace dotnet_angular.SPA.Controllers
{

  [Produces("application/json")]
  [Route("api/Configuration")]
  public class ConfigurationController : Controller
  {
    private readonly IConfiguration _configuration;

    public ConfigurationController(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    [HttpGet("[action]")]
    public IActionResult ConfigurationData()
    {

      var version = typeof(ConfigurationController).Assembly.GetName().Version;
      var versionFormatted = string.Format("{0}.{1}.{2}.{3}", version.Major, version.Minor, version.Build, version.Revision);

      return Ok(new Dictionary<string, string> {
        { "ApiAddress", _configuration["ApiAddress"] },
        { "BuildNumber", versionFormatted }
      });
    }
  }
}