using System;

namespace dotnet_angular.SPA.Models
{
  public class ErrorViewModel
  {
    public string RequestId { get; set; }
    public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
  }
}