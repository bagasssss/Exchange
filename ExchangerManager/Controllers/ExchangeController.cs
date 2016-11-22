using System.Linq;
using System.Web.Http;
using ExchangerManager.DataLogic;
using ExchangerManager.Models.DomainModels;
using ExchangerManager.Models.ViewModels;

namespace ExchangerManager.Controllers
{
    public class ExchangeController : ApiController
    {
        private readonly ExchangerDbSet _dbSet;

        public ExchangeController()
        {
            _dbSet = new ExchangerDbSet();
        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            var exchanges = _dbSet.Exchanges.ToList();
            return Ok(new { exchanges });
        }

        [HttpPost]
        public IHttpActionResult Add([FromBody] ExchangeViewModel exchange)
        {
            var inputCurr = _dbSet.Currencies.FirstOrDefault(c => c.Name == exchange.InputCurrency);
            var outputCurr = _dbSet.Currencies.FirstOrDefault(c => c.Name == exchange.OutputCurrency);

            if (inputCurr == null || outputCurr == null)
                return NotFound();

            _dbSet.Exchanges.Add(new Exchange()
            {
                DateTime = exchange.DateTime,
                InputAmount = exchange.InputAmount,
                OutputAmount = exchange.OutputAmount,
                InputCurrency = inputCurr,
                OutputCurrency = outputCurr
            });
            _dbSet.SaveChanges();

            return Ok();
        }

        [HttpPost]
        public IHttpActionResult Update([FromBody]ExchangeViewModel exchange)
        {
            var dbExchange = _dbSet.Exchanges.FirstOrDefault(e => e.Id == exchange.Id);
            if (dbExchange == null)
                return NotFound();

            var inputCurr = _dbSet.Currencies.FirstOrDefault(c => c.Name == exchange.InputCurrency);
            var outputCurr = _dbSet.Currencies.FirstOrDefault(c => c.Name == exchange.OutputCurrency);

            if (inputCurr == null || outputCurr == null)
                return NotFound();

            dbExchange.DateTime = exchange.DateTime;
            dbExchange.InputAmount = exchange.InputAmount;
            dbExchange.OutputAmount = exchange.OutputAmount;
            dbExchange.InputCurrency = inputCurr;
            dbExchange.OutputCurrency = outputCurr;

            _dbSet.SaveChanges();

            return Ok();
        }

        [HttpPost]
        public IHttpActionResult Remove([FromBody]int id)
        {
            var dbExchange = _dbSet.Exchanges.FirstOrDefault(e => e.Id == id);
            if (dbExchange == null)
                return NotFound();

            _dbSet.Exchanges.Remove(dbExchange);
            _dbSet.SaveChanges();

            return Ok();
        }
    }
}
