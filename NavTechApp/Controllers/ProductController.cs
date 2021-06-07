using Microsoft.AspNetCore.Mvc;
using NavTechApp.Models;
using NavTechApp.Models.Interface;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace NavTechApp.Controllers
{
    public class ProductController : Controller
    {
        public readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private IRepositoryProduct prdObj;
        IEnumerable<Product> recordList;

        public ProductController(IRepositoryProduct IRepPrdObj)
        {
            prdObj = IRepPrdObj;
        }

        [HttpGet]
        public IEnumerable<Product> GetAllFields()
        {
            log.Info("ProductController - GetAllFields()");
            try {
                recordList = prdObj.GetAll();
                return recordList;
            }
            catch (Exception e) 
            {
                log.Info("Error Message from ProductController GetAllFields() - " + e.Message);
                throw e;
            }
        }

        [HttpGet]
        public string ValidateRecords(string EntityName, string FieldName)
        {
            log.Info("ProductController - ValidateRecords()");
            try 
            {
                string msg = "";
                string id = EntityName + "_" + FieldName;

                Product objList = new Product();
                objList = prdObj.GetRecord(id);

                if (objList != null)
                {
                    msg = "exist";
                }

                return msg;
            }
            catch (Exception e)
            {
                string errMsg = "Exception: " + e.Message;
                log.Info("Error Message from ProductController ValidateRecords() - " + e.Message);
                return errMsg;
            }

        }

        [HttpPost]
        public string AddRecords(string itemList)
        {
            log.Info("ProductController - AddRecords()");
            try 
            {
                string msg = "";
                var result = JsonConvert.DeserializeObject<List<Product>>(itemList);
                foreach (var obj in result)
                {
                    msg = prdObj.AddRecords(obj);
                }
                return msg;
            }
            catch (Exception e)
            {
                string errMsg = "Exception: " + e.Message;
                log.Info("Error Message from ProductController AddRecords() - " + e.Message);
                return errMsg;
            }
        }

        [HttpPost]
        public string Update(string EntNm, string FldNm, int IsReq, int MaxLen, string FldSrc)
        {
            log.Info("ProductController - Update()");
            string msg = "";
            try {
                Product pobj = new Product();

                pobj.EntityName = EntNm;
                pobj.FieldName = FldNm;
                pobj.IsRequired = IsReq == 1 ? true : false;
                pobj.MaxLength = MaxLen;
                pobj.FieldSource = FldSrc;

                msg = prdObj.Update(pobj);
                return msg;
            }
            catch (Exception e)
            {
                log.Info("Error Message from ProductController Update() - " + e.Message);
                throw e;
            }

        }

        public string Delete(string id)
        {
            log.Info("ProductController - Delete()");
            string msg = "";
            try {
                string entityNm = "";
                string fieldNm = "";
                if (id.IndexOf("_") > -1)
                {
                    entityNm = id.Split("_")[0];
                    fieldNm = id.Split("_")[1];
                }

                msg = prdObj.Delete(entityNm, fieldNm);
                return msg;
            }
            catch (Exception e)
            {
                log.Info("Error Message from ProductController Delete() - " + e.Message);
                throw e;
            }
        }

    }
}
