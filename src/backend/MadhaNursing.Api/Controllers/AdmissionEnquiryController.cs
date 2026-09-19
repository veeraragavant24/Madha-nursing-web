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
                // =====================================================
                // VALIDATE REQUEST
                // =====================================================

                if (string.IsNullOrWhiteSpace(request.Name) ||
                    string.IsNullOrWhiteSpace(request.Email))
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Name and email are required."
                    });
                }

                // =====================================================
                // CLEAN USER INPUT
                // =====================================================

                var name = CleanHeaderValue(request.Name);
                var applicantEmail = request.Email.Trim();

                var phone = request.Phone?.Trim();
                var course = request.Course?.Trim();
                var message = request.Message?.Trim();

                // =====================================================
                // EMAIL SETTINGS
                // =====================================================

                var emailSettings =
                    _configuration.GetSection("EmailSettings");

                var smtpServer =
                    emailSettings["SmtpServer"]?.Trim();

                var smtpPortValue =
                    emailSettings["SmtpPort"]?.Trim();

                var emailUser =
                    emailSettings["EmailUser"]?.Trim();

                var emailPassword =
                    emailSettings["EmailPassword"]?.Trim();

                var collegeEmail =
                    emailSettings["CollegeEmail"]?.Trim();

                // =====================================================
                // VALIDATE EMAIL SETTINGS
                // =====================================================

                if (string.IsNullOrWhiteSpace(smtpServer))
                {
                    Console.WriteLine(
                        "Email configuration error: SmtpServer is missing."
                    );

                    return StatusCode(500, new
                    {
                        success = false,
                        message = "Email server configuration is missing."
                    });
                }

                if (string.IsNullOrWhiteSpace(emailUser))
                {
                    Console.WriteLine(
                        "Email configuration error: EmailUser is missing."
                    );

                    return StatusCode(500, new
                    {
                        success = false,
                        message = "Email sender configuration is missing."
                    });
                }

                if (string.IsNullOrWhiteSpace(emailPassword))
                {
                    Console.WriteLine(
                        "Email configuration error: EmailPassword is missing."
                    );

                    return StatusCode(500, new
                    {
                        success = false,
                        message = "Email password configuration is missing."
                    });
                }

                if (string.IsNullOrWhiteSpace(collegeEmail))
                {
                    Console.WriteLine(
                        "Email configuration error: CollegeEmail is missing."
                    );

                    return StatusCode(500, new
                    {
                        success = false,
                        message = "College email configuration is missing."
                    });
                }

                // =====================================================
                // VALIDATE EMAIL ADDRESSES
                // =====================================================

                MailAddress senderAddress;
                MailAddress recipientAddress;
                MailAddress applicantAddress;

                try
                {
                    senderAddress = new MailAddress(emailUser);
                    recipientAddress = new MailAddress(collegeEmail);
                    applicantAddress = new MailAddress(applicantEmail);
                }
                catch (FormatException ex)
                {
                    Console.WriteLine(
                        $"Invalid email address configuration: {ex.Message}"
                    );

                    return StatusCode(500, new
                    {
                        success = false,
                        message = "Invalid email address configuration."
                    });
                }

                // =====================================================
                // SMTP PORT
                // =====================================================

                if (!int.TryParse(smtpPortValue, out var smtpPort))
                {
                    smtpPort = 587;
                }

                // =====================================================
                // SMTP CLIENT
                // =====================================================

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

                // =====================================================
                // CREATE MAIL
                // =====================================================

                using var mail = new MailMessage
                {
                    From = new MailAddress(
                        senderAddress.Address,
                        "Madha Nursing Website"
                    ),

                    Subject =
                        $"New Admission Enquiry - {name}",

                    SubjectEncoding =
                        System.Text.Encoding.UTF8,

                    BodyEncoding =
                        System.Text.Encoding.UTF8,

                    Body = $@"
New Admission Enquiry
=====================

Name:
{name}

Email:
{applicantAddress.Address}

Phone:
{phone ?? "Not provided"}

Programme:
{course ?? "Not selected"}

Message:
{message ?? "No message provided"}

=====================
This enquiry was submitted
from the Madha Nursing website.
"
                };

                // =====================================================
                // RECIPIENT
                // =====================================================

                mail.To.Add(recipientAddress);

                // =====================================================
                // REPLY TO APPLICANT
                // =====================================================

                mail.ReplyToList.Add(applicantAddress);

                // =====================================================
                // SEND EMAIL
                // =====================================================

                await smtp.SendMailAsync(mail);

                Console.WriteLine(
                    $"Admission enquiry email sent successfully for {name}."
                );

                return Ok(new
                {
                    success = true,
                    message = "Enquiry sent successfully."
                });
            }
            catch (SmtpException ex)
            {
                Console.WriteLine(
                    $"SMTP error: {ex.Message}"
                );

                return StatusCode(500, new
                {
                    success = false,
                    message = "Unable to send enquiry email."
                });
            }
            catch (FormatException ex)
            {
                Console.WriteLine(
                    $"Email format error: {ex.Message}"
                );

                return StatusCode(500, new
                {
                    success = false,
                    message = "Invalid email configuration."
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

        // =============================================================
        // REMOVE INVALID HEADER CHARACTERS
        // =============================================================

        private static string CleanHeaderValue(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                return string.Empty;
            }

            return value
                .Replace("\r", " ")
                .Replace("\n", " ")
                .Trim();
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