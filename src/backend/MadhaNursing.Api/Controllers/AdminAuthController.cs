using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MadhaNursing.Api.Data;
using MadhaNursing.Api.Models;

namespace MadhaNursing.Api.Controllers;

[ApiController]
[Route("api/admin")]
public class AdminAuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IPasswordHasher<AdminUser> _passwordHasher;
    private readonly IConfiguration _configuration;

    public AdminAuthController(
        ApplicationDbContext context,
        IPasswordHasher<AdminUser> passwordHasher,
        IConfiguration configuration)
    {
        _context = context;
        _passwordHasher = passwordHasher;
        _configuration = configuration;
    }

    // ============================================================
    // ADMIN LOGIN
    // POST: /api/admin/login
    // ============================================================

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] AdminLoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new
            {
                message = "Email and password are required."
            });
        }

        var email = request.Email.Trim().ToLower();

        var admin = await _context.AdminUsers
            .FirstOrDefaultAsync(x =>
                x.Email.ToLower() == email &&
                x.IsActive);

        if (admin == null)
        {
            return Unauthorized(new
            {
                message = "Invalid email or password."
            });
        }

        var passwordResult = _passwordHasher.VerifyHashedPassword(
            admin,
            admin.PasswordHash,
            request.Password
        );

        if (passwordResult == PasswordVerificationResult.Failed)
        {
            return Unauthorized(new
            {
                message = "Invalid email or password."
            });
        }

        var token = GenerateToken(admin);

        return Ok(new
        {
            message = "Login successful.",
            token,
            admin = new
            {
                id = admin.Id,
                email = admin.Email,
                name = admin.Name
            }
        });
    }

    // ============================================================
    // GENERATE JWT TOKEN
    // ============================================================

    private string GenerateToken(AdminUser admin)
    {
        var key = _configuration["Jwt:Key"];

        if (string.IsNullOrWhiteSpace(key))
        {
            throw new InvalidOperationException(
                "JWT Key is not configured."
            );
        }

        var claims = new[]
        {
            new Claim(
                ClaimTypes.NameIdentifier,
                admin.Id.ToString()
            ),

            new Claim(
                ClaimTypes.Email,
                admin.Email
            ),

            new Claim(
                ClaimTypes.Name,
                admin.Name
            ),

            new Claim(
                ClaimTypes.Role,
                "Admin"
            )
        };

        var securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(key)
        );

        var credentials = new SigningCredentials(
            securityKey,
            SecurityAlgorithms.HmacSha256
        );

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }

    // ============================================================
    // CREATE FRESH ADMIN
    //
    // TEMPORARY ENDPOINT
    //
    // POST: /api/admin/create-fresh-admin
    //
    // This deletes existing admin users and creates:
    //
    // Email:    Admin@mcon
    // Password: MCON@2026
    // ============================================================

    [HttpPost("create-fresh-admin")]
    public async Task<IActionResult> CreateFreshAdmin()
    {
        // --------------------------------------------------------
        // DELETE ALL EXISTING ADMIN USERS
        // --------------------------------------------------------

        var existingAdmins = await _context.AdminUsers.ToListAsync();

        if (existingAdmins.Any())
        {
            _context.AdminUsers.RemoveRange(existingAdmins);

            await _context.SaveChangesAsync();
        }

        // --------------------------------------------------------
        // CREATE NEW ADMIN
        // --------------------------------------------------------

        var admin = new AdminUser
        {
            Id = Guid.NewGuid(),
            Email = "Admin@mcon",
            Name = "MCON Administrator",
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        // --------------------------------------------------------
        // GENERATE PASSWORD HASH USING THE SAME HASHER
        // USED BY THE LOGIN SYSTEM
        // --------------------------------------------------------

        admin.PasswordHash = _passwordHasher.HashPassword(
            admin,
            "MCON@2026"
        );

        // --------------------------------------------------------
        // SAVE NEW ADMIN
        // --------------------------------------------------------

        _context.AdminUsers.Add(admin);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Fresh admin created successfully.",
            id = admin.Id,
            email = admin.Email,
            name = admin.Name
        });
    }
}


// ================================================================
// ADMIN LOGIN REQUEST
// ================================================================

public class AdminLoginRequest
{
    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
}