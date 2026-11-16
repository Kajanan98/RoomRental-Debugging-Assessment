const BASE = "http://localhost:5000/api";

export async function getRooms(search) {
  const res = await fetch(`${BASE}/rooms?search=${search}`);
  return res.json();
}

export async function getAvailableRooms(checkIn, checkOut) {
  const res = await fetch(`${BASE}/rooms/available?checkIn=${checkIn}&checkOut=${checkOut}`);
  return res.json();
}

export async function createRoom(room) {
  const res = await fetch(`${BASE}/rooms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(room)
  });
  return res.json();
}

export async function updateRoom(id, room) {
  const res = await fetch(`${BASE}/rooms/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(room)
  });
  return res.json();
}

export async function deleteRoom(id) {
  const res = await fetch(`${BASE}/rooms/${id}`, { method: "DELETE" });
  return res.json();
}

export async function getBookings() {
  const res = await fetch(`${BASE}/bookings`);
  return res.json();
}

export async function createBooking(booking) {
  const res = await fetch(`${BASE}/bookings`, {
    method: "POST",
    body: JSON.stringify(booking)
  });
  return res.json();
}

export async function cancelBooking(id) {
  const res = await fetch(`${BASE}/bookings/cancel/${id}`);
  return res.ok;
}
