import type { DayjsType } from '@finzor-ui/use-day-js'
import type { LocationDTO } from './Location.types'
import dayjsCast from '@/domains/_base/casts/dayjsCast'

export default class Location {
  readonly id!: number
  readonly author_id!: number
  readonly short_address!: string
  readonly address!: string
  readonly description!: string | null
  readonly latitude!: number | null
  readonly longitude!: number | null
  readonly working_hours!: string | null
  readonly is_active!: boolean
  readonly created_at!: DayjsType
  readonly updated_at!: DayjsType

  constructor(dto: LocationDTO) {
    this.id = dto.id
    this.author_id = dto.author_id
    this.short_address = dto.short_address
    this.address = dto.address
    this.description = dto.description
    this.latitude = dto.latitude
    this.longitude = dto.longitude
    this.working_hours = dto.working_hours
    this.is_active = dto.is_active
    this.created_at = dayjsCast(dto.created_at)
    this.updated_at = dayjsCast(dto.updated_at)
  }
}
