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
                if (request == null)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Invalid enquiry request."
                    });
                }

                var name = request.Name?.Trim();
                var email = request.Email?.Trim();
                var phone = request.Phone?.Trim();
                var course = request.Course?.Trim();
                var message = request.Message?.Trim();

                // ==============================
                // VALIDATION
                // ==============================

                if (string.IsNullOrWhiteSpace(name))
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Name is required."
                    });
                }

                if (string.IsNullOrWhiteSpace(email))
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Email is required."
                    });
                }

                if (!IsValidEmail(email))
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Please enter a valid email address."
                    });
                }

                // ==============================
                // EMAIL SETTINGS
                // ==============================

                var smtpServer =
                    _configuration["EmailSettings:SmtpServer"];

                var smtpPortText =
                    _configuration["EmailSettings:SmtpPort"];

                var emailUser =
                    _configuration["EmailSettings:EmailUser"];

                var emailPassword =
                    _configuration["EmailSettings:EmailPassword"];

                var collegeEmail =
                    _configuration["EmailSettings:CollegeEmail"];

                if (string.IsNullOrWhiteSpace(smtpServer) ||
                    string.IsNullOrWhiteSpace(smtpPortText) ||
                    string.IsNullOrWhiteSpace(emailUser) ||
                    string.IsNullOrWhiteSpace(emailPassword) ||
                    string.IsNullOrWhiteSpace(collegeEmail))
                {
                    Console.WriteLine(
                        "Email configuration is missing."
                    );

                    return StatusCode(500, new
                    {
                        success = false,
                        message = "Email service configuration is missing."
                    });
                }

                if (!int.TryParse(smtpPortText, out int smtpPort))
                {
                    return StatusCode(500, new
                    {
                        success = false,
                        message = "Invalid SMTP port configuration."
                    });
                }

                // ==============================
                // EMAIL SUBJECT
                // ==============================

                var subject =
                    $"New Admission Enquiry - {CleanHeaderValue(name)}";

                // ==============================
                // EMAIL HTML
                // ==============================

                var htmlBody = $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset=""UTF-8"">
    <title>New Admission Enquiry</title>
</head>

<body style=""font-family: Arial, sans-serif; line-height: 1.6;"">

    <h2>New Admission Enquiry</h2>

    <hr>

    <p>
        <strong>Name:</strong><br>
        {HtmlEncode(name)}
    </p>

    <p>
        <strong>Email:</strong><br>
        {HtmlEncode(email)}
    </p>

    <p>
        <strong>Phone:</strong><br>
        {HtmlEncode(phone ?? "Not provided")}
    </p>

    <p>
        <strong>Programme:</strong><br>
        {HtmlEncode(course ?? "Not selected")}
    </p>

    <p>
        <strong>Message:</strong><br>
        {HtmlEncode(message ?? "No message provided")}
    </p>

    <hr>

    <p>
        This enquiry was submitted from the
        Madha Nursing website.
    </p>

</body>
</html>
";

                // ==============================
                // SMTP EMAIL
                // ==============================

                using var mail = new MailMessage();

                mail.From = new MailAddress(
                    emailUser,
                    "Madha Nursing Website"
                );

                mail.To.Add(collegeEmail);

                mail.ReplyToList.Add(
                    new MailAddress(email)
                );

                mail.Subject = subject;
                mail.Body = htmlBody;
                mail.IsBodyHtml = true;

                using var smtp = new SmtpClient(
                    smtpServer,
                    smtpPort
                );

                smtp.EnableSsl = true;

                smtp.Credentials =
                    new System.Net.NetworkCredential(
                        emailUser,
                        emailPassword
                    );

                await smtp.SendMailAsync(mail);

                Console.WriteLine(
                    "Admission enquiry email sent successfully through SMTP."
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
            catch (Exception ex)
            {
                Console.WriteLine(
                    $"Admission enquiry error: {ex.Message}"
                );

                return StatusCode(500, new
                {
                    success = false,
                    message = "Unable to send enquiry."
                });
            }
        }

        // ==============================
        // EMAIL VALIDATION
        // ==============================

        private static bool IsValidEmail(string email)
        {
            try
            {
                var address =
                    new System.Net.Mail.MailAddress(email);

                return address.Address.Equals(
                    email,
                    StringComparison.OrdinalIgnoreCase
                );
            }
            catch
            {
                return false;
            }
        }

        // ==============================
        // CLEAN HEADER
        // ==============================

        private static string CleanHeaderValue(string value)
        {
            return value
                .Replace("\r", " ")
                .Replace("\n", " ")
                .Trim();
        }

        // ==============================
        // HTML ENCODING
        // ==============================

        private static string HtmlEncode(string? value)
        {
            return WebUtility.HtmlEncode(
                value ?? string.Empty
            );
        }
    }

    // ==========================================
    // REQUEST MODEL
    // ==========================================

    public class AdmissionEnquiryRequest
    {
        public string Name { get; set; } = "";

        public string Email { get; set; } = "";

        public string? Phone { get; set; }

        public string? Course { get; set; }

        public string? Message { get; set; }
    }
}