import { useState, useEffect } from "react";
import RoomList from "./components/RoomList";
import RoomForm from "./components/RoomForm";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";
import { getRooms, getBookings, deleteRoom } from "./api";

export default function App() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    getRooms(search).then((data) => setRooms(data));
  });

  useEffect(() => {
    async function load() {
      const data = await getBookings();
      setBookings(data);
    }
    load();
  }, []);

  function handleRoomSaved(room) {
    rooms.push(room);
    setRooms(rooms);
  }

  async function handleDelete(id) {
    await deleteRoom(id);
    setRooms(rooms.filter((r) => r.id !== id));
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h1>Room Rental</h1>

      <input
        placeholder="Search room number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Rooms</h2>
      <RoomForm room={editingRoom} onSaved={handleRoomSaved} />
      <RoomList rooms={rooms} onEdit={setEditingRoom} onDelete={handleDelete} />

      <h2>Bookings</h2>
      <BookingForm rooms={rooms} onBooked={(b) => setBookings([...bookings, b])} />
      <BookingList bookings={bookings} onChange={setBookings} />
    </div>
  );
}
