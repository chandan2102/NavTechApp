using Microsoft.AspNetCore.Http;

namespace NavTechApp.Class
{
    public class DomainOption
    {
        private IHttpContextAccessor _httpContextAccessor;
        public string host { get; set; }
        public string scheme { get; set; }
        public DomainOption(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            host = _httpContextAccessor.HttpContext.Request.Host.Value;
            scheme = _httpContextAccessor.HttpContext.Request.Scheme;
        }
    }
}



