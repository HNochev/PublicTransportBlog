using AuthenticationApi.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace AuthenticationApi.Db;

public class AppDbContext : IdentityDbContext<User>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Publication> Publications { get; set; }

    //public DbSet<PublicationComment> PublicationComments { get; set; }

    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        //builder
        //    .Entity<PublicationComment>()
        //    .HasOne(x => x.Publication)
        //    .WithMany(x => x.PublicationComments)
        //    .HasForeignKey(x => x.PublicationId)
        //    .OnDelete(DeleteBehavior.Restrict);

        base.OnModelCreating(builder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var directory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
        var configuration = new ConfigurationBuilder()
            .SetBasePath(directory)
            .AddJsonFile("appsettings.Development.json")
            .Build();
        var connectionString = configuration.GetConnectionString("db");
        optionsBuilder.UseSqlServer(connectionString);
    }
}

