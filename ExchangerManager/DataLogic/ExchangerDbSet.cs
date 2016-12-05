using System.Data.Entity;
using ExchangerManager.Models;
using ExchangerManager.Models.DomainModels;

namespace ExchangerManager.DataLogic
{
    public class ExchangeDbSetInitializer : DropCreateDatabaseIfModelChanges<ExchangerDbSet>
    {
        protected override void Seed(ExchangerDbSet context)
        {
            context.Currencies.Add(new Currency() { Name = "UAH" });
            context.Currencies.Add(new Currency() { Name = "USD" });
            context.Currencies.Add(new Currency() { Name = "EUR" });

            context.SaveChanges();

            base.Seed(context);
        }
    }
    public class ExchangerDbSet: DbContext
    {
        public ExchangerDbSet():
            base(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=Exchanger;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False")
        {
            Database.SetInitializer(new ExchangeDbSetInitializer());
        }

        public DbSet<Exchange> Exchanges { get; set; }
        public DbSet<Currency> Currencies { get; set; }
    }
}