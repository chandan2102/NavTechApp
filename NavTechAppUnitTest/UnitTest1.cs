using Microsoft.VisualStudio.TestTools.UnitTesting;
using NavTechApp.Context;
using NavTechApp.Controllers;
using NavTechApp.Models.Interface;
using NavTechApp.Models.Repository;

namespace NavTechAppUnitTest
{
    [TestClass]
    public class UnitTest1 : IRepositoryProduct
    {
        [TestMethod]
        public void GetRecord_FetchesValidRecord()
        {

            //Arrange
            private NavtechDBContext context { get; set; }
            string id = "Product1_DField1";

            //Act
            ProductMasterRepository obj = new ProductMasterRepository(NavtechDBContext _context);


            //Assert
        }
    }
}
