using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoomRental.Api.Data;
using RoomRental.Api.Models;

namespace RoomRental.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoomsController : ControllerBase
{
    private readonly AppDbContext _db;

    public RoomsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(string? search)
    {
        if (!string.IsNullOrEmpty(search))
        {
            var found = _db.Rooms
                .FromSqlRaw("SELECT * FROM Rooms WHERE RoomNumber LIKE '%" + search + "%'")
                .ToList();
            return Ok(found);
        }

        return Ok(await _db.Rooms.ToListAsync());
    }

    [HttpGet("available")]
    public async Task<IActionResult> Available(DateTime checkIn, DateTime checkOut)
    {
        var rooms = await _db.Rooms
            .FromSqlInterpolated($"EXEC usp_GetAvailableRooms {checkIn}, {checkOut}")
            .ToListAsync();
        return Ok(rooms);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var room = await _db.Rooms.FirstOrDefaultAsync(r => r.Id == id);
        return Ok(room);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Room room)
    {
        _db.Rooms.Add(room);
        await _db.SaveChangesAsync();
        return Ok(room);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Room room)
    {
        _db.Rooms.Update(room);
        await _db.SaveChangesAsync();
        return Ok(room);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var room = await _db.Rooms.FindAsync(id);
        _db.Rooms.Remove(room);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
