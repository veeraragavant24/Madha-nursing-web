using Microsoft.EntityFrameworkCore;
using MadhaNursing.Api.Models;

namespace MadhaNursing.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<NewsEvent> NewsEvents => Set<NewsEvent>();

    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();
}