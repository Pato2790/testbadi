import { FlightInfo } from '../../types/FlightInfo';
import axios from 'axios';

export const flightsGet = async (): Promise<FlightInfo[]> => {
  try {
    const { data } = await axios.request<FlightInfo[]>({
      method: 'GET',
      url: '/api/flight/',
      headers: {
        'content-type': 'application/json',
      },
    });

    return data;
  } catch (err) {
    console.info('Some errors happened while try to book new seats');
    throw err;
  }
};
