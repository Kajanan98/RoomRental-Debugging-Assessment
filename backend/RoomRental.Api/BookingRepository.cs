using System.Data;
using Dapper;
namespace RoomRental.Api;
public class BookingRepository(IDbConnection db)
{
    public async Task<IEnumerable<dynamic>> GetRooms() => await db.QueryAsync("SELECT RoomId, Name, MonthlyRent, IsAvailable FROM Rooms");
    public async Task<IEnumerable<dynamic>> GetBookings() => await db.QueryAsync(@"SELECT b.BookingId, r.Name AS RoomName, t.FullName AS TenantName, b.CheckIn, b.CheckOut, r.MonthlyRent FROM Bookings b JOIN Rooms r ON b.RoomId = r.RoomId JOIN Tenants t ON b.TenantId = t.TenantId WHERE b.Status = 'Active'");
    public async Task<int> CreateBooking(CreateBookingRequest request)
    {
        var room = await db.QueryFirstOrDefaultAsync<dynamic>("SELECT * FROM Rooms WHERE RoomId = @RoomId", new { request.RoomId });
        if (room == null) throw new Exception("Room not found");
        var sql = @"INSERT INTO Bookings(RoomId, TenantId, CheckIn, CheckOut, Status) VALUES(@RoomId, @TenantId, @CheckIn, @CheckOut, 'Active'); SELECT CAST(SCOPE_IDENTITY() AS INT);";
        return await db.ExecuteScalarAsync<int>(sql, request);
    }
}
