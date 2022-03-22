﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Account.Domain.Shared.DataTransfer
{
    public class SubjectDtos
    {
        public int Id { get; set; }
        public int Ipv4 { get; set; }
        public int? GorupId { get; set; }
        public bool? IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}