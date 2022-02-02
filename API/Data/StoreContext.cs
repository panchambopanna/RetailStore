using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        // Create a DbSet: this creates a table in our DB. Use <Product> class we created and call the table 'Products'
        public DbSet<Product> Products { get; set; }

    }
}