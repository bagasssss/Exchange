using System;

namespace ExchangerManager.Models.ViewModels
{
    public class ExchangeViewModel
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public decimal InputAmount { get; set; }
        public decimal OutputAmount { get; set; }
        public string InputCurrency { get; set; }
        public string OutputCurrency { get; set; }
        public string FormattedDateTime { get { return DateTime.ToShortDateString(); }  }
        public bool IsEditMode { get; set; }
    }
}