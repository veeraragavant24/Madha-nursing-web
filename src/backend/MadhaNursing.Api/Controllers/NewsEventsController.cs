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
            _environment.WebRootPath ?? Path.Combine(_environment.ContentRootPath, "wwwroot"),
            "uploads",
            "events"
        );

        Directory.CreateDirectory(uploadsFolder);

        var fileName = $"{Guid.NewGuid():N}.webp";
        var filePath = Path.Combine(uploadsFolder, fileName);

        var converted = true;
        try
        {
            using (var image = await Image.LoadAsync(file.OpenReadStream()))
            {
                image.Mutate(x => x.AutoOrient());

                // PNG may carry transparency -> lossless WebP preserves it.
                // JPG/JPEG/WEBP photos -> lossy WebP at quality 82.
                var isPng = extension == ".png";

                var encoder = new WebpEncoder
                {
                    Quality = 82,
                    FileFormat = isPng
                        ? WebpFileFormatType.Lossless
                        : WebpFileFormatType.Lossy
                };

                await image.SaveAsWebpAsync(filePath, encoder);
            }
        }
        catch
        {
            // Fall back to storing the original file unchanged.
            converted = false;
            fileName = $"{Guid.NewGuid():N}{extension}";
            filePath = Path.Combine(uploadsFolder, fileName);
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
    // =====================================================

    [HttpPost]
    public async Task<ActionResult<NewsEvent>> CreateNewsEvent(
        [FromBody] NewsEvent newsEvent)
    {
        newsEvent.Id = Guid.NewGuid();
        newsEvent.CreatedAt = DateTime.UtcNow;
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

        existingEvent.Title = updatedEvent.Title;
        existingEvent.Description = updatedEvent.Description;
        existingEvent.Category = updatedEvent.Category;
        existingEvent.EventDate = updatedEvent.EventDate;
        existingEvent.Location = updatedEvent.Location;
        existingEvent.ImageUrl = updatedEvent.ImageUrl;
        existingEvent.Published = updatedEvent.Published;
        existingEvent.Featured = updatedEvent.Featured;
        existingEvent.UpdatedAt = DateTime.UtcNow;

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
    // =====================================================

    [HttpPatch("{id:guid}/publish")]
    public async Task<ActionResult<NewsEvent>> TogglePublished(Guid id)
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

        newsEvent.Published = !newsEvent.Published;
        newsEvent.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(newsEvent);
    }

    // =====================================================
    // PATCH: api/news-events/{id}/featured
    // =====================================================

    [HttpPatch("{id:guid}/featured")]
    public async Task<ActionResult<NewsEvent>> ToggleFeatured(Guid id)
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

        newsEvent.Featured = !newsEvent.Featured;
        newsEvent.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(newsEvent);
    }
}