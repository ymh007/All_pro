using API_ProDocker.Models;
using Microsoft.EntityFrameworkCore;
using Oracle.ManagedDataAccess;
using Oracle.ManagedDataAccess.Client;

namespace API_ProDocker.Data
{
    public class SchoolContext : DbContext
    {
        public SchoolContext(DbContextOptions<SchoolContext> options) : base(options)
        { }

        public DbSet<Course> Courses { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<Student> Students { get; set; }

        public DbSet<MeetingMaterialAuthority> MeetingMaterialAuthoritys { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MeetingMaterialAuthority>().ToTable("MeetingMaterialAuthority", "office");

            //OracleConnection oracleConnection = new  OracleConnection();
            //oracleConnection.ConnectionString = "xxxx";
            //OracleCommand com = new OracleCommand();

            //modelBuilder.Entity<Course>().ToTable("Course");
            //modelBuilder.Entity<Enrollment>().ToTable("Enrollment");
            //modelBuilder.Entity<Student>().ToTable("Student");
        }
    }
}
