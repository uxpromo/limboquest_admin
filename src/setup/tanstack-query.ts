import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'


/**
 * Создает и настраивает QueryClient для Tanstack Query
 */
const createQueryClient = (): QueryClient => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          // Данные считаются свежими 1 минута
          staleTime: 1 * 60 * 1000,
          // Кэш хранится 10 минут
          gcTime: 10 * 60 * 1000,
          // отключает retry по всему проекту
          retry: false,
          // Не обновлять данные при фокусе окна
          refetchOnWindowFocus: false,
          // предотвращает бесконечные циклы
          refetchOnMount: false,
        },
        mutations: {
          retry: false,
        },
      },
    })
  }

  const vueQueryConfig = {
    queryClient: createQueryClient(),
  }

  export { VueQueryPlugin, vueQueryConfig }