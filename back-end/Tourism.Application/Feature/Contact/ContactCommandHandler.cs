using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Tourism.Application.Interfaces.Services.Email;
using Tourism.Domain.Shared.Bases;

namespace Tourism.Application.Feature.Contact
{
    //
    public class ContactCommandHandler(IEmailService emailSender, ResponseHandler responseHandler
        ) : IRequestHandler<ContactCommand, Response<string>>
    {
        public async Task<Response<string>> Handle(ContactCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var body = PrepareMailShape(request.Name, request.Phone, request.Email, request.Service, request.Message);
                await emailSender.SendEmailAsync("sunsharmtours2000@gmail.com", "طلب جديد من موقع السياحة", body);
                return responseHandler.Success(string.Empty, "Email Has Sent Successfully");
            }
            catch (Exception ex)
            {
                return responseHandler.InternalServerError<string>("An Error Occured While Sending");

            }
        }
        private string PrepareMailShape(string Name, string Phone, string Email, string Service, string Message)
        {

            var name = WebUtility.HtmlEncode(Name);
            var phone = WebUtility.HtmlEncode(Phone);
            var customerEmail = WebUtility.HtmlEncode(Email);
            var service = WebUtility.HtmlEncode(Service);
            var message = WebUtility.HtmlEncode(Message)
                .Replace("\r\n", "<br>")
                .Replace("\n", "<br>");

            var body = $"""
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>طلب جديد</title>
</head>

<body style="
    margin:0;
    padding:0;
    background-color:#f3f7f6;
    font-family:Arial, Tahoma, sans-serif;
    direction:rtl;
">

    <table width="100%" cellpadding="0" cellspacing="0" border="0"
           style="background-color:#f3f7f6; padding:35px 15px;">

        <tr>
            <td align="center">

                <!-- Main Container -->
                <table width="600" cellpadding="0" cellspacing="0" border="0"
                       style="
                            max-width:600px;
                            width:100%;
                            background:#ffffff;
                            border-radius:18px;
                            overflow:hidden;
                            box-shadow:0 8px 30px rgba(0,0,0,0.08);
                       ">

                    <!-- Header -->
                    <tr>
                        <td style="
                            background:#0b6654;
                            padding:32px 30px;
                            text-align:center;
                        ">

                            <div style="
                                width:60px;
                                height:60px;
                                line-height:60px;
                                margin:0 auto 15px;
                                background:rgba(255,255,255,0.15);
                                border-radius:50%;
                                color:#ffffff;
                                font-size:28px;
                            ">
                                ✈
                            </div>

                            <h1 style="
                                margin:0;
                                color:#ffffff;
                                font-size:25px;
                                font-weight:700;
                            ">
                                طلب جديد
                            </h1>

                            <p style="
                                margin:10px 0 0;
                                color:#d9f1eb;
                                font-size:14px;
                            ">
                                تم استلام طلب جديد من موقع السياحة
                            </p>

                        </td>
                    </tr>

                    <!-- Greeting -->
                    <tr>
                        <td style="padding:30px 35px 10px;">

                            <h2 style="
                                margin:0 0 10px;
                                color:#173b35;
                                font-size:21px;
                            ">
                                مرحباً،
                            </h2>

                            <p style="
                                margin:0;
                                color:#687873;
                                font-size:15px;
                                line-height:1.9;
                            ">
                                لديك طلب جديد من أحد عملاء الموقع.
                                فيما يلي تفاصيل الطلب:
                            </p>

                        </td>
                    </tr>

                    <!-- Customer Information -->
                    <tr>
                        <td style="padding:20px 35px 10px;">

                            <h3 style="
                                margin:0 0 15px;
                                color:#173b35;
                                font-size:17px;
                            ">
                                بيانات العميل
                            </h3>

                            <table width="100%" cellpadding="0" cellspacing="0"
                                   style="border-collapse:separate; border-spacing:0 10px;">

                                <!-- Name -->
                                <tr>
                                    <td style="
                                        background:#f7faf9;
                                        border:1px solid #e4ece9;
                                        border-radius:10px;
                                        padding:15px;
                                    ">
                                        <span style="
                                            color:#7b8985;
                                            font-size:12px;
                                            display:block;
                                            margin-bottom:5px;
                                        ">
                                            الاسم
                                        </span>

                                        <strong style="
                                            color:#173b35;
                                            font-size:15px;
                                        ">
                                            {name}
                                        </strong>
                                    </td>
                                </tr>

                                <!-- Phone -->
                                <tr>
                                    <td style="
                                        background:#f7faf9;
                                        border:1px solid #e4ece9;
                                        border-radius:10px;
                                        padding:15px;
                                    ">
                                        <span style="
                                            color:#7b8985;
                                            font-size:12px;
                                            display:block;
                                            margin-bottom:5px;
                                        ">
                                            رقم الهاتف
                                        </span>

                                        <strong style="
                                            color:#173b35;
                                            font-size:15px;
                                            direction:ltr;
                                            display:block;
                                            text-align:right;
                                        ">
                                            {phone}
                                        </strong>
                                    </td>
                                </tr>

                                <!-- Email -->
                                <tr>
                                    <td style="
                                        background:#f7faf9;
                                        border:1px solid #e4ece9;
                                        border-radius:10px;
                                        padding:15px;
                                    ">
                                        <span style="
                                            color:#7b8985;
                                            font-size:12px;
                                            display:block;
                                            margin-bottom:5px;
                                        ">
                                            البريد الإلكتروني
                                        </span>

                                        <strong style="
                                            color:#173b35;
                                            font-size:15px;
                                            direction:ltr;
                                            display:block;
                                            text-align:right;
                                        ">
                                            {customerEmail}
                                        </strong>
                                    </td>
                                </tr>

                            </table>

                        </td>
                    </tr>

                    <!-- Service -->
                    <tr>
                        <td style="padding:10px 35px;">

                            <h3 style="
                                margin:0 0 12px;
                                color:#173b35;
                                font-size:17px;
                            ">
                                الخدمة المطلوبة
                            </h3>

                            <div style="
                                display:inline-block;
                                background:#e4f3ef;
                                color:#0b6654;
                                border-radius:30px;
                                padding:10px 20px;
                                font-size:14px;
                                font-weight:bold;
                            ">
                                {service}
                            </div>

                        </td>
                    </tr>

                    <!-- Message -->
                    <tr>
                        <td style="padding:20px 35px 30px;">

                            <h3 style="
                                margin:0 0 12px;
                                color:#173b35;
                                font-size:17px;
                            ">
                                رسالة العميل
                            </h3>

                            <div style="
                                background:#f7faf9;
                                border-right:4px solid #0b6654;
                                border-radius:10px;
                                padding:18px;
                                color:#52625e;
                                font-size:14px;
                                line-height:2;
                            ">
                                {message}
                            </div>

                        </td>
                    </tr>

                    <!-- CTA -->
                    <tr>
                        <td style="
                            background:#f7faf9;
                            padding:25px 35px;
                            text-align:center;
                            border-top:1px solid #e8efed;
                        ">

                            <p style="
                                margin:0 0 15px;
                                color:#687873;
                                font-size:13px;
                            ">
                                يمكنك التواصل مع العميل مباشرة من خلال بيانات التواصل بالأعلى.
                            </p>

                            <a href="mailto:{customerEmail}"
                               style="
                                    display:inline-block;
                                    background:#0b6654;
                                    color:#ffffff;
                                    text-decoration:none;
                                    padding:13px 28px;
                                    border-radius:8px;
                                    font-size:14px;
                                    font-weight:bold;
                               ">
                                الرد على العميل
                            </a>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="
                            background:#173b35;
                            padding:22px;
                            text-align:center;
                        ">

                            <p style="
                                margin:0;
                                color:#ffffff;
                                font-size:14px;
                                font-weight:bold;
                            ">
                                Tourism
                            </p>

                            <p style="
                                margin:7px 0 0;
                                color:#a9c3bd;
                                font-size:11px;
                            ">
                                رحلة تبدأ بخطوة، وذكريات تستمر مدى الحياة
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>

    </table>

</body>
</html>
""";
            return body;
        }
    }
}
