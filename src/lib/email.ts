import { transporter } from "./nodemailer";

export const resetPasswordEmail = (username: string, resetUrl: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reset Your Password - Instashop</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb; color: #111827;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
                <td align="center">
                    <table role="presentation" style="width: 600px; margin: auto; background-color: #ffffff; padding: 24px; border-radius: 8px; margin-top: 40px; margin-bottom: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <tr>
                            <td align="center" style="padding-bottom: 20px;">
                                <h2 style="margin: 0; color: #111827;">Instashop</h2>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h1 style="font-size: 22px; margin-bottom: 20px; color: #111827;">Reset Your Password</h1>
                                <p style="margin-bottom: 20px;">Hi ${username},</p>
                                <p style="margin-bottom: 20px;">We received a request to reset your password. If this wasn't you, you can safely ignore this email.</p>
                                <p style="margin-bottom: 30px;">Click the button below to set a new password:</p>
                                <div style="text-align: center; margin-bottom: 30px;">
                                    <a href="${resetUrl}" target="_blank" style="background-color: #3897f0; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reset Password</a>
                                </div>
                                <p style="margin-bottom: 20px;">This link will expire in 15 minutes. If you need another, please request again from the Instashop app.</p>
                                <p style="margin-bottom: 20px;">If the button above doesn’t work, copy and paste the link below into your browser:</p>
                                <p style="word-break: break-word;"><a href="${resetUrl}" style="color: #3897f0;">${resetUrl}</a></p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-top: 32px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px;">
                                <p style="margin: 0;">&copy; ${new Date().getFullYear()} Instashop. All rights reserved.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `;
};

export const sendResetEmail = async (
  to: string,
  resetUrl: string,
  username: string
) => {
  const mailOptions = {
    from: '"Instashop" <no-reply@instashop.com>',
    to,
    subject: "Reset Your Password",
    html: resetPasswordEmail(username, resetUrl),
  };

  await transporter.sendMail(mailOptions);
};