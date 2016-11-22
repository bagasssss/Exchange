using System;
using System.ComponentModel.DataAnnotations;

namespace ExchangerManager.Models.DomainModels
{
    public class Exchange
    {
        [Key]
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public decimal InputAmount { get; set; }
        public decimal OutputAmount { get; set; }
        public virtual Currency InputCurrency { get; set; }
        public virtual Currency OutputCurrency { get; set; }
    }
}