export const BOOKING_STATUS_VALUES = ['pending', 'confirmed', 'completed', 'cancelled', 'absent'] as const

export type BookingStatus = (typeof BOOKING_STATUS_VALUES)[number]

export type BookingStatusInfo = {
  value: BookingStatus
  label: string
  color: string
  isBookingActive: boolean
}

export const BOOKING_STATUS_DEFAULT: BookingStatus = 'pending'

export const BOOKING_STATUS_INFO_MAP: Record<BookingStatus, BookingStatusInfo> = {
  pending: {
    value: 'pending',
    label: 'Новая заявка',
    color: 'var(--f-color-danger)',
    isBookingActive: true,
  },
  confirmed: {
    value: 'confirmed',
    label: 'Подтверждено',
    color: 'var(--f-color-warning-500)',
    isBookingActive: true,
  },
  completed: {
    value: 'completed',
    label: 'Квест пройден',
    color: 'var(--f-color-success-700)',
    isBookingActive: false,
  },
  cancelled: {
    value: 'cancelled',
    label: 'Отменено',
    color: 'var(--f-color-zinc)',
    isBookingActive: false,
  },
  absent: {
    value: 'absent',
    label: 'Неявка без уведомления',
    color: 'var(--f-color-black)',
    isBookingActive: false,
  },
}

export const BOOKING_STATUS_OPTIONS = BOOKING_STATUS_VALUES.map((status) => ({
  value: status,
  label: BOOKING_STATUS_INFO_MAP[status].label,
}))

export const isBookingStatus = (value: unknown): value is BookingStatus => {
  return typeof value === 'string' && BOOKING_STATUS_VALUES.includes(value as BookingStatus)
}

export const getBookingStatusInfo = (status: BookingStatus): BookingStatusInfo => {
  return BOOKING_STATUS_INFO_MAP[status]
}

export const isBookingActiveByStatus = (status: BookingStatus): boolean => {
  return BOOKING_STATUS_INFO_MAP[status].isBookingActive
}
