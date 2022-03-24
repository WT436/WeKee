﻿
using Account.Domain.Shared.DataTransfer;
using Account.Domain.ObjectValues;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Product.API.SettingUrl.AccountRouter;
using Account.Application.Role;
using Account.Domain.ObjectValues.Input;

namespace Product.API.Src.AccountAreas
{
    public class RoleController : Controller
    {
        private readonly IRole _role;
        public RoleController(IRole role)
        {
            _role = role;
        }

        [Route(PermissionRouter.RoleAccount)]
        [HttpGet]
        public async Task<IActionResult> BasicWatch(SearchOrderPageInput searchOrderPageInput)
        {
            var data = await _role.ListRoleBasicAsync(searchOrderPageInput);
            return Ok(data);
        }

        [Route(PermissionRouter.RoleAccount)]
        [HttpPost]
        public IActionResult BasicCreate([FromBody] RoleDto roleDto)
        {
            return Ok("true");
        }

        [Route(PermissionRouter.RoleAccount)]
        [HttpPut]
        public IActionResult BasicUpdate([FromBody] List<int> ids)
        {
            return Ok(_role.UpdateRole(ids));
        }

        [Route(PermissionRouter.RoleAccount)]
        [HttpPatch]
        public IActionResult BasicEdit(RoleDto roleDto)
        {
            return Ok(_role.EditRole(roleDto));
        }

        [Route(PermissionRouter.RoleAccount)]
        [HttpDelete]
        public IActionResult BasicDelete(List<int> ids)
        {
            return Ok(_role.RemoveRole(ids));
        }
    }
}