using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NavTechApp.Context;
using NavTechApp.Models.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NavTechApp.Models.Repository
{
    public class ProductMasterRepository : IRepositoryProduct
    {
        public readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private NavtechDBContext context { get; set; }

        public ProductMasterRepository(NavtechDBContext _context)
        {
            context = _context;
        } 

        public IEnumerable<Product> GetAll()
        {
            log.Info("ProductMasterRepository - GetAll()");
            try
            {
                List<Product> productList =  context.Products.FromSqlRaw<Product>("SPGetAllRecords").ToList();
                return productList;
            }
            catch (Exception e)
            {
                log.Info("Error Message from ProductMasterRepository GetAll() - " + e.Message);
                log.Info("Error InnerException from ProductMasterRepository GetAll() - " + e.InnerException);
                throw e;
            }
        }

        public IEnumerable<Product> GetFields(string fieldType)
        {
            log.Info("ProductMasterRepository - GetFields()");
            try
            {
                return context.Products.Where(c => c.FieldSource.Contains(fieldType));
            }
            catch (Exception e)
            {
                log.Info("Error Message from ProductMasterRepository GetFields() - " + e.Message);
                log.Info("Error InnerException from ProductMasterRepository GetFields() - " + e.InnerException);
                throw e;
            }
        }


        [HttpGet("{id}")]
        public Product GetRecord(string id)
        {
            log.Info("ProductMasterRepository - GetRecord()");
            try {
                Product prdObj = new Product();
                string entNm = "";
                string fldnm = "";
                if (id.IndexOf("_") > -1)
                {
                    entNm = id.Split("_")[0];
                    fldnm = id.Split("_")[1];
                }
                prdObj = context.Products.FromSqlRaw<Product>("SPGetRecord {0}, {1}", entNm, fldnm).ToList().FirstOrDefault();

                return prdObj;
            }
            catch (Exception e)
            {
                log.Info("Error Message from ProductMasterRepository GetRecord() - " + e.Message);
                log.Info("Error InnerException from ProductMasterRepository GetRecord() - " + e.InnerException);
                throw e;
            }
        }

        public string AddRecords(Product objProd)
        {
            log.Info("ProductMasterRepository - AddRecords()");
            string msg = "";
            try
            {
                var record = context.Products.FirstOrDefault(u => u.EntityName.Equals(objProd.EntityName) && u.FieldName.Equals(objProd.FieldName));
                if (record != null)
                {
                    record.IsRequired = objProd.IsRequired;
                    record.MaxLength = objProd.MaxLength;
                    record.FieldSource = objProd.FieldSource;
                    context.SaveChanges();
                    msg = "updated";
                }
                else
                {
                    log.Info("ProductMasterRepository - Adding record");
                    context.Entry(objProd).State = EntityState.Added;
                    context.SaveChanges();
                    msg = "success";
                }
                return msg;
            }
            catch (Exception e)
            {
                log.Info("Error Message from ProductMasterRepository AddRecords() - " + e.Message);
                log.Info("Error InnerException from ProductMasterRepository AddRecords() - " + e.InnerException);
                throw e;
            }
        }

        public string Update(Product objProd)
        {
            log.Info("ProductMasterRepository - Update()");
            string msg = "";
            try {
                var conProd = context.Products.FirstOrDefault(u => u.EntityName.Equals(objProd.EntityName) && u.FieldName.Equals(objProd.FieldName));
                conProd.IsRequired = objProd.IsRequired;
                conProd.MaxLength = objProd.MaxLength;
                conProd.FieldSource = objProd.FieldSource;
                context.SaveChanges();
                msg = "success";
                return msg;
            }
            catch (Exception e)
            {
                log.Info("Error Message from ProductMasterRepository Update() - " + e.Message);
                log.Info("Error InnerException from ProductMasterRepository Update() - " + e.InnerException);
                return ("Exception : " + e.Message); ;
            }
        }

        public string Delete(string EntityName, string FieldName)
        {
            log.Info("ProductMasterRepository - Delete()");
            string msg = "";
            try {
                var objProd = context.Products.FirstOrDefault(u => u.EntityName.Equals(EntityName) && u.FieldName.Equals(FieldName));
                if (objProd != null)
                {
                    context.Products.Remove(objProd);
                    context.SaveChanges();
                    msg = "success";
                }
                return msg;
            }
            catch (Exception e)
            {
                log.Info("Error Message from ProductMasterRepository Delete() - " + e.Message);
                log.Info("Error InnerException from ProductMasterRepository Delete() - " + e.InnerException);
                throw e;
            }
        }

    }
}
