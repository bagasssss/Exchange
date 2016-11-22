using System.Data.Entity;
using ExchangerManager.Models;
using ExchangerManager.Models.DomainModels;

namespace ExchangerManager.DataLogic
{
    public class ExchangerDbSet: DbContext
    {
        public ExchangerDbSet():
            base(@"Data Source=(localdb)\ProjectsV13;Initial Catalog=Exchanger;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False")
        {
        }

        public DbSet<Exchange> Exchanges { get; set; }
        public DbSet<Currency> Currencies { get; set; }
    }
}