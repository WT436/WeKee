﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Product.API.Src.FileAreas
{
    public class WatchController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}