import { useState } from "react";
import { createRoom, updateRoom } from "../api";

export default function RoomForm({ room, onSaved }) {
  const [form, setForm] = useState({
    roomNumber: room ? room.roomNumber : "",
    capacity: room ? room.capacity : 1,
    pricePerNight: room ? room.pricePerNight : "",
    isAvailable: room ? room.isAvailable : true,
    description: room ? room.description : ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit() {
    const saved = room
      ? await updateRoom(room.id, form)
      : await createRoom(form);
    onSaved(saved);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="roomNumber"
        placeholder="Room number"
        value={form.roomNumber}
        onChange={handleChange}
      />
      <input
        type="number"
        name="capacity"
        value={form.capacity}
        onChange={handleChange}
      />
      <input
        type="number"
        name="pricePerNight"
        placeholder="Price per night"
        value={form.pricePerNight}
        onChange={handleChange}
      />
      <label>
        Available
        <input
          type="checkbox"
          name="isAvailable"
          value={form.isAvailable}
          onChange={handleChange}
        />
      </label>
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <button type="submit">{room ? "Update" : "Add"} Room</button>
    </form>
  );
}
