export type Room = { roomId: number; name: string; monthlyRent: number; isAvailable: boolean };
export type Booking = { bookingId: number; roomName: string; tenantName: string; checkIn: string; checkOut: string; monthlyRent: number };
export type BookingFormValues = { roomId: number; tenantId: number; checkIn: string; checkOut: string };
