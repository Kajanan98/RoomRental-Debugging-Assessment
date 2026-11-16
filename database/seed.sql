USE RoomRental;
GO

INSERT INTO Rooms (RoomNumber, Capacity, PricePerNight, IsAvailable, Description) VALUES
('101', 2, 49.99, 1, 'Ground floor, garden view'),
('102', 2, 54.5, 1, 'Near the lobby'),
('201', 4, 89.99, 1, 'Family room with balcony'),
('202', 1, 35.25, 0, 'Single room under renovation');
GO

INSERT INTO Bookings (RoomId, GuestName, GuestEmail, CheckIn, CheckOut, TotalPrice, Status) VALUES
(1, 'Arun Kumar', 'arun@example.com', '2026-12-01', '2026-12-05', 199.96, 'Confirmed'),
(3, 'Meera Nair', 'meera@example.com', '2026-12-10', '2026-12-13', 269.97, 'Confirmed'),
(2, 'John Lee', 'john@example.com', '2026-12-02', '2026-12-04', 109, 'Cancelled');
GO
