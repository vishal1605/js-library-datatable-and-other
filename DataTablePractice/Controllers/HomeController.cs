using Dapper;
using DataTablePractice.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Collections;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Drawing.Printing;
using System.IO;
using System.Net;
using System.Net.Mail;
using ZXing;
using ZXing.Common;
using ZXing.QrCode;
using ZXing.QrCode.Internal;
using static System.Net.Mime.MediaTypeNames;
using BitArray = ZXing.Common.BitArray;
using QRCodeWriter = ZXing.QrCode.QRCodeWriter;

namespace DataTablePractice.Controllers
{
    public class HomeController : Controller
    {
        private IConfiguration Configuration;
        //this.Configuration.GetConnectionString("DefaultConnection")

        public HomeController(IConfiguration _configuration)
        {
            Configuration = _configuration;
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult QrcodeGenerator()
        {
            return View();
        }
        public IActionResult MailPage()
        {
            return View();
        }

        [HttpPost]
        public IActionResult SendMail()
        {
            Console.WriteLine(Request.Form["to"]);
            Console.WriteLine(Request.Form["body"]);
            var attachmentFile = Request.Form.Files.GetFile("attachment");
            var byteArray = getByteArrayFromFile(attachmentFile);
            string from = "";
            MailMessage mail = new MailMessage(from, Request.Form["to"].ToString());
            mail.Subject = "Test Mail";
            mail.Body = Request.Form["body"].ToString();
            mail.Attachments.Add(new Attachment(new MemoryStream(byteArray), attachmentFile.FileName));

            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.gmail.com";
            smtp.EnableSsl = true;
            NetworkCredential networkCredential = new NetworkCredential(from, ""); //For gmail user Add App password it generate after 2 step verification
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = networkCredential;
            smtp.Port = 587;
            smtp.Send(mail);


            return new JsonResult(byteArray);
        }
        private byte[] getByteArrayFromFile(IFormFile file)
        {
            using (var target = new MemoryStream())
            {
                file.CopyTo(target);
                return target.ToArray();

            };

        }

        [HttpPost]
        public byte[] ProcessQr(string requestData)
        {
            string? qrString = JsonConvert.DeserializeObject<string>(requestData);
            byte[] byteArray;
            var qrCodeWriter = new ZXing.BarcodeWriterPixelData
            {
                Format = ZXing.BarcodeFormat.QR_CODE,
                Options = new QrCodeEncodingOptions
                {
                    Height = 350,
                    Width = 350,
                    Margin = 2
                }
            };
            var pixelData = qrCodeWriter.Write(qrString);
            using (var bitmap = new Bitmap(pixelData.Width, pixelData.Height, PixelFormat.Format32bppRgb))
            {
                using (var ms = new MemoryStream())
                {
                    var bitmapData = bitmap.LockBits(new Rectangle(0, 0, pixelData.Width, pixelData.Height), ImageLockMode.WriteOnly, PixelFormat.Format32bppRgb);
                    try
                    {
                        // we assume that the row stride of the bitmap is aligned to 4 byte multiplied by the width of the image
                        System.Runtime.InteropServices.Marshal.Copy(pixelData.Pixels, 0, bitmapData.Scan0, pixelData.Pixels.Length);
                    }

                    catch (Exception e)
                    {

                        bitmap.UnlockBits(bitmapData);
                    }
                    bitmap.Save(ms, ImageFormat.Png);
                    byteArray = ms.ToArray();
                    //System.IO.File.WriteAllBytes(@"D:\myqr2.png", byteArray);
                }
            }
            Console.WriteLine(byteArray);

            return byteArray;
        }


        [HttpGet]
        public IActionResult FakeData(string requestData)
        {
            Console.WriteLine(requestData);

            return new JsonResult(0);
        }

        public IActionResult GetData()
        {
            string query = "select u_id as DT_RowId, email, name, psw, registerDate from tbluser where btdeleted = 0";
            IDbConnection con = new SqlConnection(this.Configuration.GetConnectionString("DefaultConnection"));

            dynamic data = con.Query(query).ToList();
            //Console.WriteLine(data);
            return new JsonResult(new { data });
        }

        [HttpPost]
        public IActionResult AllPostRequest(string requestData)
        {
            dynamic? requestDataJSON = JsonConvert.DeserializeObject(requestData);
            //ResponseDataTable dataTable = new();

            switch (requestDataJSON["action"].ToString())
            {
                case "create":
                    {
                        var data = new List<dynamic>();


                        DateTime localDate = DateTime.Now;
                        var sqlPara = new
                        {
                            email = requestDataJSON["data"]["0"]["email"].ToString(),
                            name = requestDataJSON["data"]["0"]["name"].ToString(),
                            psw = requestDataJSON["data"]["0"]["psw"].ToString(),
                            registerDate = localDate
                        };

                        string query = "insert into tbluser(email,name,psw,registerDate) values(@email,@name,@psw,@registerDate)";

                        SqlConnection con = new SqlConnection(this.Configuration.GetConnectionString("DefaultConnection"));
                        int row = con.Execute(query, sqlPara);
                        dynamic insertedData = con.Query("SELECT TOP 1 u_id as DT_RowId, email, name, psw, registerDate FROM tbluser ORDER BY DT_RowId DESC").FirstOrDefault<dynamic>();
                        Console.WriteLine(insertedData);

                        data.Add(insertedData);
                        return new JsonResult(new { data });

                    }
                case "edit":
                    {
                        var data = new List<dynamic>();
                        int myId = 0;
                        foreach (var property in requestDataJSON["data"].Properties())
                        {

                            myId = int.Parse(property.Name.ToString());


                        }
                        Console.WriteLine(myId);
                        var sqlPara = new
                        {
                            email = requestDataJSON["data"][myId.ToString()]["email"].ToString(),
                            name = requestDataJSON["data"][myId.ToString()]["name"].ToString(),
                            psw = requestDataJSON["data"][myId.ToString()]["psw"].ToString(),

                            id = myId
                        };

                        string query = "update tbluser set email=@email, name=@name, psw=@psw where u_id=@id";
                        SqlConnection con = new SqlConnection(this.Configuration.GetConnectionString("DefaultConnection"));
                        int row = con.Execute(query, sqlPara);


                        data.Add(sqlPara);
                        return new JsonResult(new { data });

                    }

                case "remove":
                    {
                        int myId = 0;

                        foreach (var property in requestDataJSON["data"].Properties())
                        {

                            myId = int.Parse(property.Name.ToString());


                        }
                        Console.WriteLine(myId);
                        string query = "update tbluser set btdeleted=@btdeleted where u_id=@u_id";
                        //string sql = $"insert into tbluser(email,name,psw) values('{u.Email}','{u.Name}','{u.Password}')";
                        IDbConnection con = new SqlConnection(this.Configuration.GetConnectionString("DefaultConnection"));
                        con.Execute(query, new { u_id = myId, btdeleted = 1 });
                        break;
                    }
                default:
                    {
                        throw new InvalidOperationException("Invalid 'requestData.action'.");
                    }
            }
            return new JsonResult(null);

        }

    }
}

//Console.WriteLine(qrString);
//QRCodeGenerator qrGenerator = new QRCodeGenerator();
//QRCodeData qrCodeData = qrGenerator.CreateQrCode(qrString, QRCodeGenerator.ECCLevel.Q);
//BitmapByteQRCode bitmapQRCode = new BitmapByteQRCode(qrCodeData);
//byte[] bit = bitmapQRCode.GetGraphic(20);

//Bitmap bmp;
//using (var ms = new MemoryStream(bit))
//{
//    bmp = new Bitmap(ms);
//}
//Bitmap bitMAP1 = new Bitmap(bmp);
//byte[] newbit;
//using (var memoryStream = new MemoryStream())
//{
//    bitMAP1.Save(memoryStream, System.Drawing.Imaging.ImageFormat.Png);
//    newbit = memoryStream.ToArray();
//    System.IO.File.WriteAllBytes(@"D:\myqr.png", memoryStream.ToArray());
//}
