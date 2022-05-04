﻿using Account.Domain.Shared.Entitys;
using Account.Infrastructure.DBContext;
using System;
using System.Collections.Generic;
using System.Text;
using UnitOfWork;

namespace Account.Infrastructure.EDMQuery
{
    public class AddressEDM
    {
        private readonly IUnitOfWork<AuthorizationDBContext> unitOfWork =
                   new UnitOfWork<AuthorizationDBContext>(new AuthorizationDBContext());

        public void Insert(Address address)
        {
            unitOfWork.GetRepository<Address>().Insert(address);
            unitOfWork.SaveChanges();
        }
    }
}
