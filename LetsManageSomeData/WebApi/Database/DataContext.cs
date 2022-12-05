using Microsoft.EntityFrameworkCore;

namespace WebApi.Database;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options)
        : base(options)
    {
    }

    public DbSet<Account>? Accounts { get; set; }
    public DbSet<Transaction>? Transactions { get; set; }
}