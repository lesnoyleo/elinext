using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NetCore.Models;
using NetCore.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCore.Controllers
{
    public class MainContorller : Controller
    {
        private readonly IDummyApi _dummyApi;
        private readonly IDocumentCreator _documentCreator;

        public MainContorller(IDummyApi dummyApi, IDocumentCreator documentCreator)
        {
            _dummyApi = dummyApi;
            _documentCreator = documentCreator;
        }

        [Route("api/users")]
        [HttpGet]
        public DataResponse Users(int page, int limit)
        {
            var users = (_dummyApi.GetUsers(page, limit)).Result;
            return users;
        }

        [Route("api/createxmlreport")]
        [HttpGet]
        public Guid CreateXMLReport(int page, int limit)
        {
            var users = (_dummyApi.GetUsers(page, limit)).Result;
            var result = _documentCreator.CreateXMLDocument(users);
            return result;
        }

        [Route("api/createtxtreport")]
        [HttpGet]
        public Guid CreateTxtReport(int page, int limit)
        {
            var users = (_dummyApi.GetUsers(page, limit)).Result;
            var result = _documentCreator.CreateTxtDocumentAsync(users).Result;
            return result;
        }

    }
}
