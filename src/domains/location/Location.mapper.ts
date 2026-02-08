import Location from './Location'
import type { LocationDTO } from './Location.dto'
import dayjsCast from '@/domains/_base/casts/dayjsCast'

export const LocationMapper = {
  fromDTO(dto: LocationDTO): Location {
    return new Location({
      id: dto.id,
      author_id: dto.author_id,
      short_address: dto.short_address,
      address: dto.address,
      description: dto.description,
      latitude: dto.latitude,
      longitude: dto.longitude,
      working_hours: dto.working_hours,
      created_at: dayjsCast(dto.created_at),
      updated_at: dayjsCast(dto.updated_at),
      is_active: dto.is_active,
    })
  },
}
