﻿using Account.Application.Interface;
using Account.Domain.Aggregate;
using Account.Domain.ObjectValues.ConstProperty;
using Account.Domain.ObjectValues.Input;
using Account.Domain.ObjectValues.Output;
using Account.Domain.Shared.DataTransfer.ResourceDTO;
using Account.Infrastructure.ADOQuery;
using Account.Infrastructure.EDMQuery;
using Account.Infrastructure.MappingExtention;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Utils.Exceptions;

namespace Account.Application.Service
{
    public class ResourceAdminService : IResourceAdmin
    {
        private readonly ResourceADO _resourceADO = new ResourceADO();
        private readonly ResourceEDM _resourceEDM = new ResourceEDM();

        public async Task<int> DeleteResource(List<int> ids)
        {
            if (ids != null)
            {
                return await _resourceEDM.Delete(ids);
            }
            return 0;
        }

        public async Task<int> EditUnitResource(ResourceLstChangeDto input)
        {
            if ((ResourceProperty)input.Types == ResourceProperty.IS_ACTIVE)
            {
                var data = await _resourceADO.GetResourcesById(input.Ids);
                data.ForEach(m => { m.IsActive = !m.IsActive; });
                return await _resourceEDM.UpdateIsActive(data);
            }
            else
            {
                return 0;
            }
        }

        public async Task<PagedListOutput<ResourceReadDto>> GetResourcePageList(SearchOrderPageInput input)
        {
            var data = await _resourceADO.GetAllPageLstExactNotFTS(input);
            var result = data.Select(m => MappingData.InitializeAutomapper().Map<ResourceReadDto>(m)).ToList();
            var count = (await _resourceADO.GetCountForGetAllPageLst(input)).FirstOrDefault().TotalCount;
            return new PagedListOutput<ResourceReadDto>
            {
                Items = data,
                PageIndex = input.PageIndex,
                PageSize = input.PageSize,
                TotalPages = (count / input.PageSize),
                TotalCount = count
            };
        }

        public async Task<int> InsertOrUpdateResource(ResourceReadDto input, int idAccount)
        {
            if (input != null)
            {
                var data = new ResourceAggregate().MapData(input: input, idAccount: idAccount);
                if (data.Id == 0)
                {
                    // insert
                   return await _resourceEDM.Insert(data);
                }
                else
                {
                    //update
                   return await _resourceEDM.UpdateFull(data);
                }
            }
            else
            {
                throw new ClientException(404, "");
            }
        }
    }
}