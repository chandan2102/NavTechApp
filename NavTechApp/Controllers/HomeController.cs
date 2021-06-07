using Microsoft.AspNetCore.Mvc;
using NavTechApp.Models;
using System.Diagnostics;

namespace NavTechApp.Controllers
{
    public class HomeController : Controller
    {
        public readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public IActionResult Index()
        {
            log.Info("Home Controller - Index()");
            return View();
        }

        public ActionResult AddProducts()
        {
                return View();
        }

        public IActionResult Error(string err)
        {
            log.Info("Home Controller - Inside Error() Start");
            ViewBag.Exception = err;
            log.Info("Error Message from Error() - " + err);
            log.Info("Home Controller - Inside Error() End");
            return View("Error");
        }
    }
}
