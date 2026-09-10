using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MadhaNursing.Api.Data;
using MadhaNursing.Api.Models;

namespace MadhaNursing.Api.Controllers;

[ApiController]
[Route("api/admin/password")]
public class AdminPasswordController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IPasswordHasher<AdminUser> _passwordHasher;

    public AdminPasswordController(
        ApplicationDbContext context,
        IPasswordHasher<AdminUser> passwordHasher)
    {
        _context = context;
        _passwordHasher = passwordHasher;
    }

    [HttpPost("reset")]
    public async Task<IActionResult> ResetPassword(
        [FromBody] ResetPasswordRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.NewPassword))
        {
            return BadRequest(new
            {
                message = "Email and new password are required."
            });
        }

        var email = request.Email.Trim().ToLower();

        var admin = await _context.AdminUsers
            .FirstOrDefaultAsync(x =>
                x.Email.ToLower() == email);

        if (admin == null)
        {
            return NotFound(new
            {
                message = "Admin account not found."
            });
        }

        admin.PasswordHash =
            _passwordHasher.HashPassword(
                admin,
                request.NewPassword
            );

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Password reset successfully."
        });
    }
}

public class ResetPasswordRequest
{
    public string Email { get; set; } = string.Empty;

    public string NewPassword { get; set; } = string.Empty;
}