using Microsoft.EntityFrameworkCore;
using RoomRental.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")),
    ServiceLifetime.Singleton,
    ServiceLifetime.Singleton);

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("web", policy =>
        policy.WithOrigins("http://localhost:5173/")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors("web");
app.MapControllers();

app.Run();
