namespace RoomRental.Api.Models;

public class Room
{
    public int Id { get; set; }
    public string RoomNumber { get; set; } = "";
    public int Capacity { get; set; }
    public double PricePerNight { get; set; }
    public bool IsAvailable { get; set; }
    public string? Description { get; set; }
    public List<Booking> Bookings { get; set; } = new();
}
