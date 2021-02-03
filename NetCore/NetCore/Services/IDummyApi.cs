using NetCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCore.Services
{
    public interface IDummyApi
    {
        Task<DataResponse> GetUsers(int page, int limit);
    }
}
