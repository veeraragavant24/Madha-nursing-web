using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace MadhaNursing.Api.Controllers
{
    [ApiController]
    [Route("api/admission-enquiry")]
    public class AdmissionEnquiryController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;

        public AdmissionEnquiryController(
            IConfiguration configuration,
            IHttpClientFactory httpClientFactory)
        {
            _configuration = configuration;
            _httpClientFactory = httpClientFactory;
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

                // Read Resend configuration from Render environment variables
                var resendApiKey =
                    _configuration["Resend:ApiKey"]?.Trim();

                var collegeEmail =
                    _configuration["Resend:CollegeEmail"]?.Trim();

                if (string.IsNullOrWhiteSpace(resendApiKey))
                {
                    Console.WriteLine(
                        "Resend configuration error: Resend:ApiKey is missing."
                    );

                    return StatusCode(500, new
                    {
                        success = false,
                        message = "Email service configuration is missing."
                    });
                }

                if (string.IsNullOrWhiteSpace(collegeEmail))
                {
                    Console.WriteLine(
                        "Resend configuration error: Resend:CollegeEmail is missing."
                    );

                    return StatusCode(500, new
                    {
                        success = false,
                        message = "College email configuration is missing."
                    });
                }

                if (!IsValidEmail(collegeEmail))
                {
                    Console.WriteLine(
                        "Resend configuration error: Resend:CollegeEmail is invalid."
                    );

                    return StatusCode(500, new
                    {
                        success = false,
                        message = "College email configuration is invalid."
                    });
                }

                var subject =
                    $"New Admission Enquiry - {CleanHeaderValue(name)}";

                var htmlBody = $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset=""UTF-8"">
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

                // Create HTTP client
                var client =
                    _httpClientFactory.CreateClient();

                // Prevent the request from waiting too long
                client.Timeout = TimeSpan.FromSeconds(20);

                // Resend authentication
                client.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue(
                        "Bearer",
                        resendApiKey
                    );

                // Resend email payload
                var payload = new
                {
                    from = "Madha Nursing Website <onboarding@resend.dev>",
                    to = new[] { collegeEmail },
                    subject = subject,
                    html = htmlBody,

                    // Clicking Reply in the college email
                    // will reply to the student
                    reply_to = email
                };

                var json = JsonSerializer.Serialize(payload);

                using var content = new StringContent(
                    json,
                    Encoding.UTF8,
                    "application/json"
                );

                // Send email through Resend HTTPS API
                var response = await client.PostAsync(
                    "https://api.resend.com/emails",
                    content
                );

                var responseBody =
                    await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine(
                        $"Resend API error: {(int)response.StatusCode} - {responseBody}"
                    );

                    return StatusCode(500, new
                    {
                        success = false,
                        message = "Unable to send enquiry email."
                    });
                }

                Console.WriteLine(
                    "Admission enquiry email sent successfully through Resend."
                );

                return Ok(new
                {
                    success = true,
                    message = "Enquiry sent successfully."
                });
            }
            catch (TaskCanceledException)
            {
                Console.WriteLine(
                    "Resend request timed out."
                );

                return StatusCode(504, new
                {
                    success = false,
                    message = "Email service request timed out."
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

        private static string CleanHeaderValue(string value)
        {
            return value
                .Replace("\r", " ")
                .Replace("\n", " ")
                .Trim();
        }

        private static string HtmlEncode(string? value)
        {
            return WebUtility.HtmlEncode(
                value ?? string.Empty
            );
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