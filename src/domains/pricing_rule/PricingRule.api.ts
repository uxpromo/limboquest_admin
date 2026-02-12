import type { ModelApiType, ModelApiRequestParamsType } from '../_base/types'
import useApi from '@finzor-ui/feature-api'

const ENDPOINT = '/pricing_rules'

export const PricingRuleAPI: ModelApiType<number> = {
  view: async (id, params?) => {
    const api = useApi()
    const response = await api.get(`${ENDPOINT}/${id}`, { params })
    return response.data
  },

  list: async (params?: ModelApiRequestParamsType) => {
    const api = useApi()
    const response = await api.get(ENDPOINT, { params })
    return response.data
  },

  create: async (data) => {
    const api = useApi()
    const response = await api.post(ENDPOINT, data)
    return response.data
  },

  update: async (id, data) => {
    const api = useApi()
    const response = await api.put(`${ENDPOINT}/${id}`, data)
    return response.data
  },

  remove: async (id) => {
    const api = useApi()
    const response = await api.delete(`${ENDPOINT}/${id}`)
    return response.data
  },
}
