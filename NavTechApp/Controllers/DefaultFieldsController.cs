using Microsoft.AspNetCore.Mvc;
using NavTechApp.Models;
using NavTechApp.Models.Interface;
using System.Collections.Generic;

namespace NavTechApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DefaultFieldsController : ControllerBase
    {
        public readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private IRepositoryProduct objProduct { get; set; }

        public DefaultFieldsController(IRepositoryProduct _product)
        {
            objProduct = _product;
        }

        // GET: api/<DefaultFieldsController>
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            log.Info("DefaultFields API Controller - Get()");
            IEnumerable<Product> productList = objProduct.GetFields("Default");
            return productList;
            //return new string[] { "DField1", "DField2", "DField3" };
        }
    }
}
