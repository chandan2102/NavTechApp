using System.Collections.Generic;

namespace NavTechApp.Models.Interface
{
    public interface IRepositoryProduct
    {
        IEnumerable<Product> GetAll();

        Product GetRecord(string id);

        string AddRecords(Product objProd);

        string Update(Product objProd);

        string Delete(string EntityName, string FieldName);

        IEnumerable<Product> GetFields(string fieldType);

    }
}
