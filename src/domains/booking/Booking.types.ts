export interface BookingDTO {
  id: number
  quest_session_id: number
  user_id: number | null
  name: string
  phone: string
  email: string | null
  players_count: number
  status: string
  source_id: string | null
  pricing_snapshot: unknown
  total_price: number
  paid_amount: number
  manual_discount: number
  manual_discount_reason: string | null
  notes: string | null
  booking_code: string
  play_time: number | null
  winners: boolean | null
  hints: number | null
  confirmed_at: string | null
  cancelled_at: string | null
  created_at: string
  updated_at: string
}
