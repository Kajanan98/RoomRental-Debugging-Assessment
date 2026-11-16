import { cancelBooking, getBookings } from "../api";

export default function BookingList({ bookings, onChange }) {
  async function handleCancel(id) {
    await cancelBooking(id);
    const updated = await getBookings();
    onChange(updated);
  }

  return (
    <ul>
      {bookings.map((b) => (
        <li key={b.id}>
          Room {b.room.roomNumber} | {b.guestName} | {b.checkIn} to {b.checkOut} | ${b.totalPrice} | {b.status}
          <button onClick={() => handleCancel(b.id)}>Cancel</button>
        </li>
      ))}
    </ul>
  );
}
