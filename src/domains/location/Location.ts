import type { DayjsType } from '@finzor-ui/use-day-js'

export default class Location {
  readonly id!: number
  readonly author_id!: number
  readonly short_address!: string
  readonly address!: string
  readonly description!: string
  readonly latitude!: number
  readonly longitude!: number
  readonly working_hours!: string
  readonly is_active!: boolean
  readonly createdAt!: DayjsType
  readonly updatedAt!: DayjsType

  constructor(data: {
    id: number
    author_id: number
    short_address: string
    address: string
    description: string
    latitude: number
    longitude: number
    working_hours: string
    is_active: boolean
    created_at: DayjsType
    updated_at: DayjsType
  }) {
    Object.assign(this, data)
  }
}
