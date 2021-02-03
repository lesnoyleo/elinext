using NetCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace NetCore.Services
{
    public class DummyApiService : MajorService, IDummyApi
    {
        private readonly IHttpClientFactory _clientFactory;

        public DummyApiService(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public override async Task<DataResponse> GetUsers(int page, int limit)
        {
            DataResponse result = null;
            var request = new HttpRequestMessage(HttpMethod.Get, this.ApiUrl + "/data/api/user?page="+page+"&limit="+limit);
            request.Headers.Add("app-id", "60195894b0566cd1ab7d3e28"); //вставить свой app-id

            var client = _clientFactory.CreateClient();

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                using var responseStream = await response.Content.ReadAsStreamAsync();
                result = await JsonSerializer.DeserializeAsync
                    <DataResponse>(responseStream);
            }

            return result;
        }
    }
}
