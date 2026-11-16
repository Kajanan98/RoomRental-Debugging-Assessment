CREATE DATABASE RoomRental;
GO
USE RoomRental;
GO

CREATE TABLE Rooms (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    RoomNumber VARCHAR(10) NOT NULL,
    Capacity INT NOT NULL,
    PricePerNight FLOAT NOT NULL,
    IsAvailable BIT NOT NULL DEFAULT 1,
    Description VARCHAR(500) NULL
);
GO

CREATE TABLE Bookings (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    RoomId INT NULL,
    GuestName VARCHAR(100) NOT NULL,
    GuestEmail VARCHAR(150) NOT NULL,
    CheckIn DATETIME NOT NULL,
    CheckOut DATETIME NOT NULL,
    TotalPrice FLOAT NOT NULL,
    Status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
GO

CREATE PROCEDURE usp_GetAvailableRooms
    @CheckIn DATETIME,
    @CheckOut DATETIME
AS
BEGIN
    SELECT r.*
    FROM Rooms r
    WHERE r.IsAvailable = 1
      AND r.Id NOT IN (
          SELECT b.RoomId
          FROM Bookings b
          WHERE b.Status <> 'Cancelled'
            AND b.CheckIn < @CheckIn
            AND b.CheckOut > @CheckOut
      );
END
GO

CREATE PROCEDURE usp_RoomRevenueReport
    @Month INT,
    @Year INT
AS
BEGIN
    SELECT r.RoomNumber,
           COUNT(b.Id) AS TotalBookings,
           SUM(b.TotalPrice) AS Revenue
    FROM Rooms r
    LEFT JOIN Bookings b ON b.RoomId = r.Id
    WHERE b.Status = 'Confirmed'
      AND MONTH(b.CheckIn) = @Month
      AND YEAR(b.CheckIn) = @Year
    GROUP BY r.RoomNumber
    ORDER BY Revenue DESC;
END
GO
