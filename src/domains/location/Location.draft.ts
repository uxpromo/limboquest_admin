import type Location from './Location.model'

/**
 * LocationDraft is a draft of a Location
 * It is used to create a new Location or update an existing Location
 * It is not persisted to the database
 * It is used to validate the Location data
 * It is used to create a new Location or update an existing Location
 * It is used to create a new Location or update an existing Location
 */
export default class LocationDraft {
  readonly id: number | null = null
  short_address: string | null = null
  address: string | null = null
  description: string | null = null
  latitude: number | null = null
  longitude: number | null = null
  working_hours: string | null = null
  is_active: boolean = false

  /**
   * Create a new LocationDraft from a Location model or initialize with default values
   * @param model - Location model
   */
  constructor(model?: Location) {
    if (model) {
      this.id = model.id
      this.short_address = model.short_address
      this.address = model.address
      this.description = model.description
      this.latitude = model.latitude
      this.longitude = model.longitude
      this.working_hours = model.working_hours
      this.is_active = model.is_active
    }
  }

  /**
   * Create a new LocationDraft from a Location model
   * @param model - Location model
   * @returns LocationDraft populated with model data
   */
  static fromModel(model: Location): LocationDraft {
    return new LocationDraft(model)
  }
}
