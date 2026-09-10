using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;

namespace MadhaNursing.Api.Controllers
{
    [ApiController]
    [Route("api/admission-enquiry")]
    public class AdmissionEnquiryController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AdmissionEnquiryController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitEnquiry(
            [FromBody] AdmissionEnquiryRequest request)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(request.Name) ||
                    string.IsNullOrWhiteSpace(request.Email))
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Name and email are required."
                    });
                }

                var emailSettings =
                    _configuration.GetSection("EmailSettings");

                var smtpServer =
                    emailSettings["SmtpServer"];

                var smtpPort =
                    int.Parse(emailSettings["SmtpPort"] ?? "587");

                var emailUser =
                    emailSettings["EmailUser"];

                var emailPassword =
                    emailSettings["EmailPassword"];

                var collegeEmail =
                    emailSettings["CollegeEmail"];

                using var smtp = new SmtpClient(
                    smtpServer,
                    smtpPort
                )
                {
                    EnableSsl = true,
                    Credentials = new NetworkCredential(
                        emailUser,
                        emailPassword
                    )
                };

                var mail = new MailMessage
                {
                    From = new MailAddress(
                        emailUser!,
                        "Madha Nursing Website"
                    ),

                    Subject =
                        $"New Admission Enquiry - {request.Name}",

                    Body = $@"
New Admission Enquiry
=====================

Name:
{request.Name}

Email:
{request.Email}

Phone:
{request.Phone ?? "Not provided"}

Programme:
{request.Course ?? "Not selected"}

Message:
{request.Message ?? "No message provided"}

=====================
This enquiry was submitted
from the Madha Nursing website.
"
                };

                mail.To.Add(collegeEmail!);

                mail.ReplyToList.Add(
                    new MailAddress(request.Email)
                );

                await smtp.SendMailAsync(mail);

                return Ok(new
                {
                    success = true,
                    message = "Enquiry sent successfully."
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(
                    $"Email sending error: {ex.Message}"
                );

                return StatusCode(500, new
                {
                    success = false,
                    message = "Unable to send enquiry."
                });
            }
        }
    }

    public class AdmissionEnquiryRequest
    {
        public string Name { get; set; } = "";

        public string Email { get; set; } = "";

        public string? Phone { get; set; }

        public string? Course { get; set; }

        public string? Message { get; set; }
    }
}