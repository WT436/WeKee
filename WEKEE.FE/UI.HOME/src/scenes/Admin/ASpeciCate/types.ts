import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { CategoryProductReadMapDto } from "./dtos/CategoryProductReadMapDto";
import { CategorySelectDto } from "./dtos/categorySelectDto";
import { SpecificationAttributeInsertDto } from "./dtos/SpecificationAttributeInsertDto";

export interface ASpeciCateState {
  readonly loading: boolean;
  readonly completed: boolean;
  readonly pageIndex: number;
  readonly pageSize: number;
  readonly totalCount: number;
  readonly totalPages: number;
  readonly categorySelectDto: CategorySelectDto[];
  readonly nameKey: string[];
  readonly classifyValues: string[];
  readonly specificationsCategoryDto: SpecificationAttributeInsertDto[];
  readonly optionsCategory: CategoryProductReadMapDto[];
}

export type ASpeciCateActions = ActionType<typeof actions>;
