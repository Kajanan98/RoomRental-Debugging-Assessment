using System.Data;
using Microsoft.Data.SqlClient;
using RoomRental.Api;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(o => o.AddDefaultPolicy(p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
builder.Services.AddScoped<IDbConnection>(_ => new SqlConnection(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddScoped<BookingRepository>();
var app = builder.Build(); app.UseCors();
app.MapGet("/api/rooms", async (BookingRepository repo) => Results.Ok(await repo.GetRooms()));
app.MapGet("/api/bookings", async (BookingRepository repo) => Results.Ok(await repo.GetBookings()));
app.MapPost("/api/bookings", async (CreateBookingRequest request, BookingRepository repo) => { var id = await repo.CreateBooking(request); return Results.Ok(new { bookingId = id }); });
app.Run();
namespace RoomRental.Api { public record CreateBookingRequest(int RoomId, int TenantId, DateTime CheckIn, DateTime CheckOut); }
