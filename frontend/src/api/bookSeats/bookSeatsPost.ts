import { BookInfo } from "../../types/BookInfo"
import { SeatsInfo } from "../../types/SeatsInfo"
import axios from 'axios'

export const bookSeatsPost = async (bookInfo: BookInfo): Promise<SeatsInfo> => {
  try {
    const { data } = await axios.request<SeatsInfo>({
      method: 'POST',
      url: '/api/bookSeats/',
      data: { bookInfo },
      headers: {
        'content-type': 'application/json'
      }
    })

    return data
  } catch (err) {
    console.info('Some errors happened while try to book new seats')
    throw err
  }
}