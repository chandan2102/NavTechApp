using System;
using System.Collections.Generic;

#nullable disable

namespace NavTechApp.Models
{
    public partial class Product
    {
        public string EntityName { get; set; }
        public string FieldName { get; set; }
        public bool IsRequired { get; set; }
        public long MaxLength { get; set; }
        public string FieldSource { get; set; }
    }
}
