using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCore.Models
{
    public class DataResponse
    {
        public User[] data { get; set; }
        public int total { get; set; }
        public int page { get; set; }
        public int limit { get; set; }
        public int offset { get; set; }
    }
}
