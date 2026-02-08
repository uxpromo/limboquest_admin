import type { ModelQueryConfigType, ModelType } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { toValue, type MaybeRefOrGetter } from "vue";

export function createQueryKeys(modelName: string) {
  return {
    _base: [modelName],
    list: (params = {}) => [modelName, "list", params] as const,
    view: (id: any, params = {}) => [modelName, "view", id, params] as const,
  };
}

export function useModelQuery<
  TModel extends ModelType,
  IdType = number | string
>(config: ModelQueryConfigType<TModel, IdType>) {
  const { modelName, api, mapper, staleTime } = config;
  const queryKeys = createQueryKeys(modelName);

  const useListQuery = (
    params?: MaybeRefOrGetter<Record<string, any>>,
    enabled?: MaybeRefOrGetter<boolean>
  ) => {
    return useQuery<TModel[]>({
      queryKey: queryKeys.list(toValue(params)),
      queryFn: async () => {
        if (!api.list) {
          throw new Error("List API is not implemented");
        }
        const response = await api.list(toValue(params));
        const dtos = Array.isArray(response.data) ? response.data : [];
        const models = dtos.map(mapper);

        return models;
      },
      throwOnError: true,
      enabled: toValue(enabled) ?? true,
      staleTime: staleTime,
    });
  };

  const useViewQuery = (
    id: MaybeRefOrGetter<IdType>,
    params?: MaybeRefOrGetter<Record<string, any>>,
    enabled?: MaybeRefOrGetter<boolean>
  ) => {
    return useQuery<TModel>({
      queryKey: queryKeys.view(toValue(id), toValue(params)),
      queryFn: async () => {
        if (!api.view) {
          throw new Error("View API is not implemented");
        }
        const response = await api.view(toValue(id), toValue(params));
        return mapper(response.data);
      },
      throwOnError: true,
      enabled: toValue(enabled) ?? true,
      staleTime: staleTime,
    });
  };

  const useCreateMutation = () => {
    const queryClient = useQueryClient();

    const addToListsCache = (model: TModel) => {
      // Добавляем новую модель только в списки (lists)
      queryClient
        .getQueriesData<TModel[]>({
          queryKey: queryKeys._base,
        })
        .forEach(([key, old]) => {
          if (!old || !Array.isArray(old)) return;
          queryClient.setQueryData(key, [...old, model]);
        });
    };

    return useMutation<TModel, Error, any>({
      mutationFn: async (data: any) => {
        if (!api.create) {
          throw new Error("Create API is not implemented");
        }
        const response = await api.create(data);

        return mapper(response.data);
      },
      onSuccess: (model) => {
        addToListsCache(model);
        queryClient.invalidateQueries({ queryKey: queryKeys._base });
      },
    });
  };

  const useUpdateMutation = () => {
    const queryClient = useQueryClient();

    const updateQueriesCache = (model: TModel, idValue: IdType) => {
      // Обновляем все queries (списки и view) с queryKey, начинающимся с modelName
      queryClient
        .getQueriesData<TModel | TModel[]>({
          queryKey: queryKeys._base,
        })
        .forEach(([key, old]) => {
          if (!old) return;

          // Если это массив (список) - обновляем элемент по ID
          if (Array.isArray(old)) {
            queryClient.setQueryData(
              key,
              old.map((item) => (item.id === idValue ? model : item))
            );
          }
          // Если это один объект (view query) и ID совпадает - заменяем весь объект
          else if (
            old &&
            typeof old === "object" &&
            "id" in old &&
            old.id === idValue
          ) {
            queryClient.setQueryData(key, model);
          }
        });
    };

    return useMutation<TModel, Error, any>({
      mutationFn: async ({
        id,
        data,
      }: {
        id: MaybeRefOrGetter<IdType>;
        data: any;
      }) => {
        if (!api.update) {
          throw new Error("Update API is not implemented");
        }
        const response = await api.update(toValue(id), data);
        return mapper(response.data);
      },
      onSuccess: (model, variables) => {
        updateQueriesCache(model, toValue(variables.id));
        queryClient.invalidateQueries({ queryKey: queryKeys._base });
      },
    });
  };

  const useRemoveMutation = () => {
    return useMutation<any, Error, IdType>({
      mutationFn: async (id: IdType) => {
        if (!api.remove) {
          throw new Error("Remove API is not implemented");
        }
        const response = await api.remove(toValue(id));
        return response.data;
      },
    });
  };
  return {
    queryKeys,
    useListQuery,
    useViewQuery,
    useCreateMutation,
    useUpdateMutation,
    useRemoveMutation,
  };
}
