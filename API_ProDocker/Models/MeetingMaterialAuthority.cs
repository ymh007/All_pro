using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_ProDocker.Models
{
    public class MeetingMaterialAuthority 
    {
        [Key]
        public string Code { get; set; }

        public string MaterialID { get; set; }
        public string PeopleName { get; set; }
        public string PeopleId { get; set; }
        public string Creator { get; set; }
        public DateTime CreateTime { get; set; }
        public string Modifier { get; set; }
        public DateTime ModifyTime { get; set; }
        public bool ValidStatus { get; set; }
    }
}
