using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace API_ProDocker.Models
{
    public class Person
    {
        [Key]
        public int ID { get; set; }

        public string Name { get; set; }

        public int Age { get; set; }

        public DateTime Birthd { get; set; }

        public string desc { get; set; }

    }

    public class MyTable
    {
        [Key]
        public string Name { get; set; }

        public int Age { get; set; }

    }
}
