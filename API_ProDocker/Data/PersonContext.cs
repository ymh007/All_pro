using API_ProDocker.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_ProDocker.Data
{
    public class PersonContext: DbContext
    {
        IConfiguration configuration = null;
        public PersonContext(IConfiguration _configuration)
        {
            configuration = _configuration;
        }
        public DbSet<Person> Persons { get; set; }
        public DbSet<MyTable> MyTables { get; set; }
        

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(configuration.GetConnectionString("SqliteDB"));
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>().ToTable("person");
            modelBuilder.Entity<MyTable>().ToTable("MyTable");
        }
    }
}
