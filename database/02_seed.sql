USE RoomRentalInterview;
INSERT INTO Rooms(Name, MonthlyRent, IsAvailable) VALUES ('Room A-101',45000.00,1),('Room A-102',52000.00,1),('Room B-201',38000.00,0);
INSERT INTO Tenants(FullName,Phone) VALUES ('Nimal Perera','0770000001'),('Asha Fernando','0770000002'),('Ravi Kumar','0770000003');
INSERT INTO Bookings(RoomId,TenantId,CheckIn,CheckOut,Status) VALUES (1,1,'2026-12-01','2026-12-10','Active'),(2,2,'2026-12-05','2026-12-15','Active');
GO
