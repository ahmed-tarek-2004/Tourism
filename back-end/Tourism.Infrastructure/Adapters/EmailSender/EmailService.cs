//using FluentEmail.Core;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Tourism.Application.Interfaces.Services.Email;

//using Tourism.Application.DTO.Course;
using Tourism.Domain.Models;
using Tourism.Domain.Models.Auth.Identity;
using Tourism.Shared;

namespace Tourism.Infrastructure.Adapters.EmailSender
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _settings;

        public EmailService(IOptions<EmailSettings> settings)
        {
            _settings = settings.Value;
        }
       
        public async Task SendEmailAsync(
        string to,
        string subject,
        string body,
        bool isHtml = true)
        {
            var email = new MimeMessage();

            email.From.Add(
                new MailboxAddress(
                    _settings.DisplayName,
                    _settings.From));

            email.To.Add(
                MailboxAddress.Parse(to));

            email.Subject = subject;

            email.Body = new BodyBuilder
            {
                HtmlBody = isHtml ? body : null,
                TextBody = isHtml ? null : body
            }.ToMessageBody();

            using var smtp = new SmtpClient();

            await smtp.ConnectAsync(
                _settings.Host,
                _settings.Port,
                SecureSocketOptions.StartTls);

            await smtp.AuthenticateAsync(
                _settings.Username,
                _settings.Password);

            await smtp.SendAsync(email);

            await smtp.DisconnectAsync(true);
        }










        //public async Task SendOtpEmailAsync(string UserName,string Email, string otp)
        //{
        //    try
        //    {
        //        var rootPath = Directory.GetCurrentDirectory();
        //        var templatePath = Path.Combine(rootPath, "wwwroot", "EmailTemplates", "OtpVerificationEmail.html");

        //        if (!System.IO.File.Exists(templatePath))
        //        {
        //            _logger.LogError($"OTP Email Template not found at path: {templatePath}");
        //            throw new FileNotFoundException("OTP Email Template not found.", templatePath);
        //        }

        //        var emailTemplate = await System.IO.File.ReadAllTextAsync(templatePath);

        //        emailTemplate = emailTemplate
        //            .Replace("{OtpCode}", otp)
        //            .Replace("{CurrentYear}", DateTime.UtcNow.Year.ToString())
        //            .Replace("{Username}", UserName);

        //        var sendResult = await _fluentEmail
        //            .To(Email)
        //            .Subject("Email Confirmation Code")
        //            .Body(emailTemplate, isHtml: true)
        //            .SendAsync();

        //        if (!sendResult.Successful)
        //        {
        //            _logger.LogError($"Failed to send OTP email to {Email}. Errors: {string.Join(", ", sendResult.ErrorMessages)}");
        //            throw new Exception("Failed to send OTP email.");
        //        }

        //        _logger.LogInformation($"OTP email successfully sent to {Email}");
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, $"An error occurred while sending OTP email to {Email}");
        //        throw;
        //    }
        //}
        //public async Task InvoiceEmailAsync(User user, PaymentTransaction transaction, List<GetCourseResponse> courseResponses)
        //{
        //    try
        //    {
        //        var rootPath = Directory.GetCurrentDirectory();
        //        var templatePath = Path.Combine(rootPath, "wwwroot", "EmailTemplates", "InvoiceEmail.html");

        //        if (!System.IO.File.Exists(templatePath))
        //        {
        //            _logger.LogError($"Invoice Email Template not found at path: {templatePath}");
        //            throw new FileNotFoundException("Invoice Email Template not found.", templatePath);
        //        }


        //        var emailTemplate = await System.IO.File.ReadAllTextAsync(templatePath);

        //        var ReceiptNumber = $"TM-{DateTime.Now.Year}-{transaction.Id:D5}";
        //        emailTemplate = emailTemplate
        //                      .Replace("{{ClientName}}", user.UserName)
        //                      .Replace("{{ClientPhone}}", user.PhoneNumber)
        //                      //.Replace("{{ClientAddress}}", user.Country)
        //                      .Replace("{{ReceiptNumber}}", ReceiptNumber)
        //                      .Replace("{{PaymentDate}}", transaction.Date.ToString("dd MMM yyyy"))
        //                      .Replace("{{OrderID}}", transaction.OrderId)
        //                      .Replace("{{TransactionID}}", transaction.Id)
        //                      .Replace("{{Currency}}", "EGP")
        //                      .Replace("{{Subtotal}}", transaction.TotalPrice.ToString("C"))
        //                      .Replace("{{Discount}}", "")
        //                      .Replace("{{TotalAmount}}", courseResponses.Sum(b => b.Price).ToString())
        //                      .Replace("{{PaymentMethod}}", "card")
        //                      //.Replace("{{VerificationHash}}", GenerateReceiptHash(transaction, user, ReceiptNumber))
        //                      .Replace("{{ItemRows}}", BuildCourseRows(courseResponses))
        //                      .Replace("{{CompanyPhone}}", "+201158905589")
        //                      .Replace("{{CompanyEmail}}", "TechMeter@gmail.com");

        //        var sendResult = await _fluentEmail
        //            .To(user.Email)
        //            .Subject("Invoice Email")
        //            .Body(emailTemplate, isHtml: true)
        //            .SendAsync();

        //        if (!sendResult.Successful)
        //        {
        //            _logger.LogError($"Failed to send Invoice email to {user.Email}. Errors: {string.Join(", ", sendResult.ErrorMessages)}");
        //            throw new Exception("Failed to send Invoice email.");
        //        }

        //        _logger.LogInformation($"Invoice email successfully sent to {user.Email}");
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, $"An error occurred while sending Invoice email to {user.Email}");
        //        throw;
        //    }
        //}
        //private static string GenerateReceiptHash(PaymentTransaction receipt, User user, string ReceiptNumber)
        //{
        //    var data = $"{ReceiptNumber}|{user.UserName}|{receipt.TotalPrice}|{receipt.Date}";

        //    var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(data));
        //    return "sha256:" + Convert.ToHexString(bytes).ToLower();
        //}
        private static string FormatMoney(decimal amount, string currency)
        => $"{currency} {amount:N2}";

        
    }
}


