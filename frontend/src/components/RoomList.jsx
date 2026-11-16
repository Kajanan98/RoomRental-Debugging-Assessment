export default function RoomList({ rooms, onEdit, onDelete }) {
  return (
    <table border="1" cellPadding="6" style={{ width: "100%", marginTop: 12 }}>
      <thead>
        <tr>
          <th>Room</th>
          <th>Capacity</th>
          <th>Price / night</th>
          <th>Available</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room, index) => (
          <tr key={index}>
            <td>{room.roomNumber}</td>
            <td>{room.capacity}</td>
            <td>{room.pricePerNight}</td>
            <td>{room.isAvailable ? "Yes" : "No"}</td>
            <td>
              <button onClick={() => onEdit(room)}>Edit</button>
              <button onClick={onDelete(room.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
