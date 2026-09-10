using System.ComponentModel.DataAnnotations;

namespace MadhaNursing.Api.Models;

public class NewsEvent
{
    public Guid Id { get; set; }

    [Required]
    [MaxLength(250)]
    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    [MaxLength(100)]
    public string? Category { get; set; }

    [Required]
    public DateTime EventDate { get; set; }

    [MaxLength(250)]
    public string? Location { get; set; }

    [MaxLength(500)]
    public string? ImageUrl { get; set; }

    public bool Published { get; set; } = true;

    public bool Featured { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }
}