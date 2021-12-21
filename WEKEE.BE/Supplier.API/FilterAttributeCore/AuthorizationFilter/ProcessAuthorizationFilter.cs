﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using System;
using System.Linq;
// xác thực : https://docs.oracle.com/cd/B28196_01/idmanage.1014/b25990/v2authen.htm
namespace Supplier.API.FilterAttributeCore.AuthorizationFilter
{
    public class ProcessAuthorizationFilter : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
        
        }
    }
}
