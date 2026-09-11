using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MadhaNursing.Api.Data;
using MadhaNursing.Api.Models;

namespace MadhaNursing.Api.Controllers;

[ApiController]
[Route("api/admin/setup")]
public class AdminSetupController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IPasswordHasher<AdminUser> _passwordHasher;

    public AdminSetupController(
        ApplicationDbContext context,
        IPasswordHasher<AdminUser> passwordHasher)
    {
        _context = context;
        _passwordHasher = passwordHasher;
    }

    [HttpPost]
    public async Task<IActionResult> CreateAdmin(
        [FromBody] CreateAdminRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Password) ||
            string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest(new
            {
                message = "Name, email and password are required."
            });
        }

        var email = request.Email.Trim().ToLower();

        var existing = _context.AdminUsers
            .FirstOrDefault(x => x.Email.ToLower() == email);

        if (existing != null)
        {
            return Conflict(new
            {
                message = "Admin already exists."
            });
        }

        var admin = new AdminUser
        {
            Id = Guid.NewGuid(),
            Email = email,
            Name = request.Name.Trim(),
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        admin.PasswordHash =
            _passwordHasher.HashPassword(
                admin,
                request.Password
            );

        _context.AdminUsers.Add(admin);

        await _context.SaveChangesAsync();

        return Ok(new
        {   
            message = "Admin created successfully.",
            id = admin.Id,
            email = admin.Email,
            name = admin.Name
        });
    }
}

public class CreateAdminRequest
{
    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
}