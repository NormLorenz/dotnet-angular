using System;
using System.Collections.Generic;

namespace dotnet_angular.SPA.Models
{
  public partial class Role
  {
    public int RoleId { get; set; }
    public string RoleName { get; set; }
    public bool? HasDirectReports { get; set; }
  }
}