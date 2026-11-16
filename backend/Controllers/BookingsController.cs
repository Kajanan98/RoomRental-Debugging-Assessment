using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoomRental.Api.Data;
using RoomRental.Api.Models;

namespace RoomRental.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly AppDbContext _db;

    public BookingsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var bookings = await _db.Bookings.Include(b => b.Room).ToListAsync();
        return Ok(bookings);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Booking booking)
    {
        var room = _db.Rooms.FirstOrDefault(r => r.Id == booking.RoomId);

        var clash = _db.Bookings.Any(b =>
            b.RoomId == booking.RoomId &&
            b.Status != "Cancelled" &&
            b.CheckIn < booking.CheckOut &&
            b.CheckOut > booking.CheckIn);

        if (clash)
        {
            return BadRequest("Room already booked");
        }

        booking.TotalPrice = (booking.CheckOut - booking.CheckIn).Days * room.PricePerNight;
        booking.CreatedAt = DateTime.Now;

        _db.Bookings.Add(booking);
        _db.SaveChangesAsync();

        return Ok(booking);
    }

    [HttpGet("cancel/{id}")]
    public IActionResult Cancel(int id)
    {
        var booking = _db.Bookings.Find(id);
        booking.Status = "Cancelled";
        _db.SaveChanges();
        return Ok();
    }
}
