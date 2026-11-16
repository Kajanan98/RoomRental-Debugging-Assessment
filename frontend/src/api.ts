import type { Booking, BookingFormValues, Room } from './types';
const API = 'http://localhost:5000/api';
export async function getBookings(): Promise<Booking[]> {
  const response = await fetch(`${API}/bookings`);
  return response.json();
}
export async function getRooms(): Promise<Room[]> {
  const response = await fetch(`${API}/rooms`);
  return response.json();
}
export async function createBooking(payload: BookingFormValues) {
  const response = await fetch(`${API}/bookings`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  return response.json();
}
