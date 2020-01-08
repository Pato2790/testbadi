export interface SeatsInfo {
  columns: {
    aisle: number
    cantSeats: number
    acronymSeats: string[]
  }
  rows: number
  canBook: boolean
  bookedSeats: string[]
  newBookedSeats: string[]
}