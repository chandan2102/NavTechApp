using Microsoft.AspNetCore.Mvc;
using NavTechApp.Models;
using NavTechApp.Models.Interface;
using System.Collections.Generic;

namespace NavTechApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomFieldsController : ControllerBase
    {
        public readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private IRepositoryProduct objProduct { get; set; }

        public CustomFieldsController(IRepositoryProduct _product)
        {
            objProduct = _product;
        }

        // GET: api/<CustomFieldsController>
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            log.Info("CustomFields API Controller - Get()");
            IEnumerable<Product> productList = objProduct.GetFields("Custom");
            return productList;

            //return new string[] { "CField1", "CField2", "CField3" };
        }
    }
}
