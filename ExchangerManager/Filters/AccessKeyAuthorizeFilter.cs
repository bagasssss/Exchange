using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace ExchangerManager.Filters
{
    public class AccessKeyAuthorizeFilter: AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if (!actionContext.Request.Headers.Contains("accessKey"))
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
            }

            var accessKeyHeader = actionContext.Request.Headers.GetValues("accessKey").FirstOrDefault();
            if (accessKeyHeader != ConfigurationManager.AppSettings["accessKey"])
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
            }

            base.OnAuthorization(actionContext);
        }
    }
}