using System.Collections.Generic;
using System.Threading.Tasks;
using dotnet_angular.SPA.Models;

namespace dotnet_angular.SPA.Interfaces
{
  public interface IRoleService
  {
    Task<Role> GetRoleByIdAsync(int roleId);
  }
}