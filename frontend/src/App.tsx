import { useEffect, useState } from 'react';
import { Alert, Container, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { createBooking, getBookings, getRooms } from './api';
import { BookingForm } from './components/BookingForm';
import type { Booking, BookingFormValues, Room } from './types';

export function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    getBookings().then(setBookings);
    getRooms().then(setRooms);
  }, [bookings]);

  async function handleCreate(values: BookingFormValues) {
    const result = await createBooking(values);
    setMessage('Booking created successfully');
    console.log(result);
  }

  const selectedRoom = rooms.find(r => r.roomId === 1);
  const estimatedTotal = selectedRoom ? selectedRoom.monthlyRent * (new Date('2026-12-05').getDate() - new Date('2026-12-01').getDate()) : 0;
  return <Container maxWidth="lg" sx={{ py: 4 }}><Stack spacing={3}>
    <Typography variant="h4">Room Rental — Staff Dashboard</Typography>
    {message && <Alert severity="success">{message}</Alert>}
    <Paper sx={{ p: 3 }}><Typography variant="h6" gutterBottom>Create booking</Typography><BookingForm rooms={rooms} onSubmit={handleCreate} /><Typography sx={{ mt: 2 }}>Estimated amount: {estimatedTotal.toFixed(2)}</Typography></Paper>
    <Paper sx={{ p: 3 }}><Typography variant="h6" gutterBottom>Active bookings</Typography><Table><TableHead><TableRow><TableCell>ID</TableCell><TableCell>Room</TableCell><TableCell>Tenant</TableCell><TableCell>Dates</TableCell><TableCell>Monthly rent</TableCell></TableRow></TableHead><TableBody>{bookings.map(b => <TableRow key={b.bookingId}><TableCell>{b.bookingId}</TableCell><TableCell>{b.roomName}</TableCell><TableCell>{b.tenantName}</TableCell><TableCell>{b.checkIn} – {b.checkOut}</TableCell><TableCell>{b.monthlyRent}</TableCell></TableRow>)}</TableBody></Table></Paper>
  </Stack></Container>;
}
