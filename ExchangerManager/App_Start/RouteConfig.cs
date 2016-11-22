using System.Web.Mvc;
using System.Web.Routing;

namespace ExchangerManager
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Angular",
                url: "{*url}",
                defaults: new { controller = "Home", action = "Index" },
                namespaces: new[] { "ExchangerManager.Controllers" }
            );
        }
    }
}
