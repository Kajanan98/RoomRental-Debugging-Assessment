USE RoomRentalInterview;
GO
CREATE OR ALTER PROCEDURE GetActiveBookings @RoomId INT = NULL AS
BEGIN
  SELECT b.BookingId, r.Name AS RoomName, t.FullName AS TenantName, b.CheckIn, b.CheckOut, r.MonthlyRent
  FROM Bookings b
  INNER JOIN Rooms r ON r.RoomId = b.BookingId
  INNER JOIN Tenants t ON t.TenantId = b.RoomId
  WHERE b.Status = 'Active' AND (@RoomId IS NULL OR b.RoomId = @RoomId)
  ORDER BY b.CheckIn DESC;
END;
GO
