import type { FinzorApiResponseType } from "@finzor-ui/feature-api";

export type ModelApiRequestParamsType = Record<string, any>;

export type ModelType = {
  id: number | string;
};

export type ModelApiViewType<TIdType = number | string> = (
  id: TIdType,
  params?: ModelApiRequestParamsType
) => Promise<FinzorApiResponseType>;

export type ModelApiListType = (
  params?: ModelApiRequestParamsType
) => Promise<FinzorApiResponseType>;

export type ModelApiCreateType = (data: any) => Promise<FinzorApiResponseType>;

export type ModelApiUpdateType<TIdType = number | string> = (
  id: TIdType,
  data: any
) => Promise<FinzorApiResponseType>;

export type ModelApiRemoveType<TIdType = number | string> = (
  id: TIdType
) => Promise<FinzorApiResponseType>;

export type ModelApiType<TIdType = number | string> = {
  view: ModelApiViewType<TIdType> | null;
  list: ModelApiListType | null;
  create: ModelApiCreateType | null;
  update: ModelApiUpdateType<TIdType> | null;
  remove: ModelApiRemoveType<TIdType> | null;
};

export interface ModelQueryConfigType<TModel, TIdType = number | string> {
  modelName: string;
  api: ModelApiType<TIdType>;
  mapper: (dto: any) => TModel;
  staleTime?: number;
}
