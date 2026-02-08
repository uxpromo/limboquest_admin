import Location from './Location'

export default class LocationDraft {
  readonly id: number | null = null
  public short_address: Location['short_address'] | null = null
  public address: Location['address'] | null = null
  public description: Location['description'] | null = null
  public latitude: Location['latitude'] | null = null
  public longitude: Location['longitude'] | null = null
  public working_hours: Location['working_hours'] | null = null
  public is_active: Location['is_active'] = false

  constructor(data?: {
    id?: number | null
    short_address?: Location['short_address'] | null
    address?: Location['address'] | null
    description?: Location['description'] | null
    latitude?: Location['latitude'] | null
    longitude?: Location['longitude'] | null
    working_hours?: Location['working_hours'] | null
    is_active?: Location['is_active'] | null
  }) {
    if (data) {
      this.id = data.id ?? null
      this.short_address = data.short_address ?? null
      this.address = data.address ?? null
      this.description = data.description ?? null
      this.latitude = data.latitude ?? null
      this.longitude = data.longitude ?? null
      this.working_hours = data.working_hours ?? null
      this.is_active = data.is_active ?? false
    }
  }
}
