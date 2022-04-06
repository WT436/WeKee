import { createSelector } from "reselect";

import { ApplicationRootState } from "../../../redux/types";
import { initialState } from "./reducer";

const select = (state: ApplicationRootState) =>
  state.sunewproduct || initialState;
const makeSelectLoading = () => createSelector(select, (substate) => substate.loading);
const makeSelectCompleted = () =>createSelector(select, (substate) => substate.completed);
const makeSelectPageIndex = () =>createSelector(select, (substate) => substate.pageIndex);
const makeSelectPageSize = () =>createSelector(select, (substate) => substate.pageSize);
const makeSelectTotalCount = () =>createSelector(select, (substate) => substate.totalCount);
const makeSelectTotalPages = () =>createSelector(select, (substate) => substate.totalPages);
const makeSelectcategorySelectDto = () =>createSelector(select, (substate) => substate.categorySelectDto);
const makeSelectalbumProduct = () =>createSelector(select, (substate) => substate.albumProduct);
const makeSelectspecificationsCategoryDto = () =>createSelector(select, (substate) => substate.specificationsCategoryDto);
const makeSelectproductAttributeReadTypesDto = () =>createSelector(select, (substate) => substate.productAttributeReadTypesDto);
const makeSelectproductDto = () =>createSelector(select, (substate) => substate.productDto);
const makeSelectTrademarkDto = () =>createSelector(select, (substate) => substate.productAttributeReadTrademarkDto);

export {
  makeSelectLoading,
  makeSelectCompleted,
  makeSelectPageIndex,
  makeSelectPageSize,
  makeSelectTotalCount,
  makeSelectTotalPages,
  makeSelectcategorySelectDto,
  makeSelectalbumProduct,
  makeSelectspecificationsCategoryDto,
  makeSelectproductAttributeReadTypesDto,
  makeSelectproductDto, makeSelectTrademarkDto
};
