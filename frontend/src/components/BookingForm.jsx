import { useState, useEffect } from "react";
import { getAvailableRooms, createBooking } from "../api";

export default function BookingForm({ rooms, onBooked }) {
  const [roomId, setRoomId] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [nights, setNights] = useState(0);
  const [available, setAvailable] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    const diff = new Date(checkOut) - new Date(checkIn);
    setNights(diff / (1000 * 60 * 60 * 24));
  }, [checkIn]);

  useEffect(async () => {
    const data = await getAvailableRooms(checkIn, checkOut);
    setAvailable(data);
  }, [checkIn, checkOut]);

  async function handleSubmit(e) {
    e.preventDefault();
    const booking = await createBooking({
      roomId,
      guestName,
      guestEmail,
      checkIn,
      checkOut
    });
    onBooked(booking);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        Hold expires in {Math.floor(secondsLeft / 60)}:
        {String(secondsLeft % 60).padStart(2, "0")}
      </p>

      <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
        <option value="">Select room</option>
        {rooms.map((r) => (
          <option key={r.id} value={r.id}>
            {r.roomNumber}
          </option>
        ))}
      </select>

      <input
        placeholder="Guest name"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
      />
      <input
        placeholder="Guest email"
        value={guestEmail}
        onChange={(e) => setGuestEmail(e.target.value)}
      />
      <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
      <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />

      <p>
        {nights} night(s) - {available.length} room(s) available
      </p>

      <button type="submit">Book</button>
    </form>
  );
}
