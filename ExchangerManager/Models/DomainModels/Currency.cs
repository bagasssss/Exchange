using System.ComponentModel.DataAnnotations;

namespace ExchangerManager.Models.DomainModels
{
    public class Currency
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}