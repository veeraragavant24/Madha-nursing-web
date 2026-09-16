using MadhaNursing.Api.Data;
using MadhaNursing.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;

namespace MadhaNursing.Api.Controllers;

[ApiController]
[Route("api/news-events")]
public class NewsEventsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IWebHostEnvironment _environment;

    private const long MaxImageSize = 20 * 1024 * 1024; // 20 MB

    private static readonly string[] AllowedExtensions =
    {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp"
    };

    public NewsEventsController(
        ApplicationDbContext context,
        IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }

    // =====================================================
    // Helper: Ensure DateTime is UTC for PostgreSQL
    // =====================================================

    private static DateTime EnsureUtc(DateTime value)
    {
        if (value.Kind == DateTimeKind.Utc)
        {
            return value;
        }

        if (value.Kind == DateTimeKind.Local)
        {
            return value.ToUniversalTime();
        }

        // HTML date inputs such as "2026-09-16"
        // are normally deserialized as DateTimeKind.Unspecified.
        // Treat that date/time as UTC so Npgsql can save it.
        return DateTime.SpecifyKind(
            value,
            DateTimeKind.Utc
        );
    }

    // =====================================================
    // GET: api/news-events
    // =====================================================

    [HttpGet]
    public async Task<ActionResult<IEnumerable<NewsEvent>>> GetNewsEvents()
    {
        var events = await _context.NewsEvents
            .OrderBy(e => e.EventDate)
            .ToListAsync();

        return Ok(events);
    }

    // =====================================================
    // GET: api/news-events/{id}
    // =====================================================

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<NewsEvent>> GetNewsEvent(Guid id)
    {
        var newsEvent = await _context.NewsEvents
            .FirstOrDefaultAsync(e => e.Id == id);

        if (newsEvent == null)
        {
            return NotFound(new
            {
                message = "News or event not found."
            });
        }

        return Ok(newsEvent);
    }

    // =====================================================
    // POST: api/news-events/upload
    // Upload event image
    // =====================================================

    [HttpPost("upload")]
    [RequestSizeLimit(MaxImageSize)]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new
            {
                message = "Please select an image."
            });
        }

        if (file.Length > MaxImageSize)
        {
            return BadRequest(new
            {
                message = "Image must be 20 MB or smaller."
            });
        }

        var extension = Path.GetExtension(file.FileName)
            .ToLowerInvariant();

        if (!AllowedExtensions.Contains(extension))
        {
            return BadRequest(new
            {
                message = "Only JPG, JPEG, PNG and WEBP images are allowed."
            });
        }

        var uploadsFolder = Path.Combine(
            _environment.WebRootPath
                ?? Path.Combine(
                    _environment.ContentRootPath,
                    "wwwroot"
                ),
            "uploads",
            "events"
        );

        Directory.CreateDirectory(uploadsFolder);

        var fileName = $"{Guid.NewGuid():N}.webp";
        var filePath = Path.Combine(
            uploadsFolder,
            fileName
        );

        var converted = true;

        try
        {
            using (var image = await Image.LoadAsync(
                       file.OpenReadStream()))
            {
                image.Mutate(x => x.AutoOrient());

                // PNG may carry transparency -> lossless WebP.
                // JPG/JPEG/WEBP photos -> lossy WebP.
                var isPng = extension == ".png";

                var encoder = new WebpEncoder
                {
                    Quality = 82,
                    FileFormat = isPng
                        ? WebpFileFormatType.Lossless
                        : WebpFileFormatType.Lossy
                };

                await image.SaveAsWebpAsync(
                    filePath,
                    encoder
                );
            }
        }
        catch
        {
            // Fall back to storing the original file unchanged.
            converted = false;

            fileName = $"{Guid.NewGuid():N}{extension}";

            filePath = Path.Combine(
                uploadsFolder,
                fileName
            );
        }

        if (!converted)
        {
            await using (var stream = new FileStream(
                filePath,
                FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
        }

        var imageUrl =
            $"/uploads/events/{fileName}";

        return Ok(new
        {
            imageUrl
        });
    }

    // =====================================================
    // POST: api/news-events
    // Create news event
    // =====================================================

    [HttpPost]
    public async Task<ActionResult<NewsEvent>> CreateNewsEvent(
        [FromBody] NewsEvent newsEvent)
    {
        newsEvent.Id = Guid.NewGuid();

        // FIX:
        // PostgreSQL "timestamp with time zone" requires UTC.
        newsEvent.EventDate = EnsureUtc(
            newsEvent.EventDate
        );

        newsEvent.CreatedAt = DateTime.UtcNow;

        // Keep CreatedAt as the creation timestamp.
        // UpdatedAt remains null until the first update.
        newsEvent.UpdatedAt = null;

        _context.NewsEvents.Add(newsEvent);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetNewsEvent),
            new { id = newsEvent.Id },
            newsEvent
        );
    }

    // =====================================================
    // PUT: api/news-events/{id}
    // Update news event
    // =====================================================

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<NewsEvent>> UpdateNewsEvent(
        Guid id,
        [FromBody] NewsEvent updatedEvent)
    {
        var existingEvent = await _context.NewsEvents
            .FirstOrDefaultAsync(e => e.Id == id);

        if (existingEvent == null)
        {
            return NotFound(new
            {
                message = "News or event not found."
            });
        }

        existingEvent.Title =
            updatedEvent.Title;

        existingEvent.Description =
            updatedEvent.Description;

        existingEvent.Category =
            updatedEvent.Category;

        // FIX:
        // Always save EventDate as UTC.
        existingEvent.EventDate =
            EnsureUtc(updatedEvent.EventDate);

        existingEvent.Location =
            updatedEvent.Location;

        existingEvent.ImageUrl =
            updatedEvent.ImageUrl;

        existingEvent.Published =
            updatedEvent.Published;

        existingEvent.Featured =
            updatedEvent.Featured;

        existingEvent.UpdatedAt =
            DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(existingEvent);
    }

    // =====================================================
    // DELETE: api/news-events/{id}
    // =====================================================

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteNewsEvent(Guid id)
    {
        var newsEvent = await _context.NewsEvents
            .FirstOrDefaultAsync(e => e.Id == id);

        if (newsEvent == null)
        {
            return NotFound(new
            {
                message = "News or event not found."
            });
        }

        _context.NewsEvents.Remove(newsEvent);

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // =====================================================
    // PATCH: api/news-events/{id}/publish
    // Toggle published status
    // =====================================================

    [HttpPatch("{id:guid}/publish")]
    public async Task<ActionResult<NewsEvent>> TogglePublished(
        Guid id)
    {
        var newsEvent = await _context.NewsEvents
            .FirstOrDefaultAsync(e => e.Id == id);

        if (newsEvent == null)
        {
            return NotFound(new
            {
                message = "News or event not found."
            });
        }

        newsEvent.Published =
            !newsEvent.Published;

        newsEvent.UpdatedAt =
            DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(newsEvent);
    }

    // =====================================================
    // PATCH: api/news-events/{id}/featured
    // Toggle featured status
    // =====================================================

    [HttpPatch("{id:guid}/featured")]
    public async Task<ActionResult<NewsEvent>> ToggleFeatured(
        Guid id)
    {
        var newsEvent = await _context.NewsEvents
            .FirstOrDefaultAsync(e => e.Id == id);

        if (newsEvent == null)
        {
            return NotFound(new
            {
                message = "News or event not found."
            });
        }

        newsEvent.Featured =
            !newsEvent.Featured;

        newsEvent.UpdatedAt =
            DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(newsEvent);
    }
}