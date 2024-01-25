import { GET_BOOKINGS } from "./bookingTypes";

export const getBookings = (bookings) => ({
    type: GET_BOOKINGS,
    payload: bookings
  });
  