using NetCore.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace NetCore.Services
{
    public class DocumentCreatorService : IDocumentCreator
    {

        public Guid CreateXMLDocument(DataResponse dataResponse)
        {
            Guid guid = Guid.NewGuid();
            XDocument xdoc = new XDocument();
            XElement users = new XElement("users");
            foreach (var item in dataResponse.data)
            {
                XElement user = new XElement("user");
                XAttribute firstNameAttr = new XAttribute("firstName", item.firstName);
                XElement lastNameElem = new XElement("lastName", item.lastName);
                XElement iphonePriceElem = new XElement("email", item.email);
                user.Add(firstNameAttr);
                user.Add(lastNameElem);
                user.Add(iphonePriceElem);
                users.Add(user);
            }

            xdoc.Add(users);
            xdoc.Save("report " + guid + ".xml");

            return guid;

        }

        public  async Task<Guid> CreateTxtDocumentAsync(DataResponse dataResponse)
        {
            Guid guid = Guid.NewGuid();
            string writePath = Path.GetFullPath("report " + guid + ".txt");


            try
            {
                using (StreamWriter sw = new StreamWriter(writePath, true, System.Text.Encoding.Default))
                {
                    int counter = 1;
                    foreach (var item in dataResponse.data)
                    {
                        await sw.WriteLineAsync("User" + counter + ":{");
                        await sw.WriteLineAsync("\t First Name: " + item.firstName + ",");
                        await sw.WriteLineAsync("\t Last Name: " + item.lastName + ",");
                        await sw.WriteLineAsync("\t Email Name: " + item.email + ",");
                        await sw.WriteLineAsync("}");
                        counter++;
                    }
                    
                }
                return guid;
            }
            catch (Exception e)
            {
                throw new InvalidOperationException(e.Message);
            }
        }
    }


}
