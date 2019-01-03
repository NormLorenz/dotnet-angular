using System;
using System.Collections.Generic;

namespace dotnet_angular.SPA.Models
{
  public partial class Associate
  {
    public long AssociateId { get; set; }
    public string UserName { get; set; }
    public string FullName { get; set; }
    public decimal? FullTimeEmployee { get; set; }
    public long DepartmentId { get; set; }
    public long WorkgroupId { get; set; }
    public int RoleId { get; set; }
    public DateTime CreatedDate { get; set; }
    public string CreatedBy { get; set; }
    public DateTime ModifiedDate { get; set; }
    public string ModifiedBy { get; set; }
    public int StatusId { get; set; }
    public long? AreaId { get; set; }
    public string EmployeeNumber { get; set; }
  }
}