using Microsoft.EntityFrameworkCore;

namespace SIstemaCRUD.Models
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options) 
        {
            
        }
        public DbSet<Employee> Employees { get; set;}
    }
}
