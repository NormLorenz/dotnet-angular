using System;

namespace dotnet_angular.SPA.Models
{
  public class LoggerModel
  {
    public string[] additional { get; set; }
    public string fileName { get; set; }
    public int level { get; set; }
    public string lineNumber { get; set; }
    public string message { get; set; }
    public string timestamp { get; set; }
  }
}