// backend/utils/email.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env'), quiet: true });
dotenv.config({ path: path.resolve(process.cwd(), 'backend/.env'), quiet: true });

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verify transporter
transporter.verify((error) => {
  if (error) {
    console.error('❌ Email transporter error:', error);
  } else {
    console.log('✅ Email server is ready');
  }
});

// Send booking confirmation email
export const sendBookingConfirmation = async ({
  email,
  name,
  tourTitle,
  date,
  guests,
  totalPrice,
  reference
}) => {
  const safeName = escapeHtml(name);
  const safeTourTitle = escapeHtml(tourTitle);
  const safeReference = escapeHtml(reference);
  const mailOptions = {
    from: `"VanTravelGeorgia" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Booking Confirmation - ${safeTourTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: #ffffff;
          }
          .header {
            background: linear-gradient(135deg, #000000, #1a1a1a);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            padding: 30px 20px;
            background: #f8f9fa;
          }
          .booking-details {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border: 1px solid #e0e0e0;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #f0f0f0;
          }
          .detail-label {
            font-weight: 600;
            color: #666;
          }
          .detail-value {
            color: #000;
          }
          .reference {
            background: #000;
            color: #fff;
            padding: 15px;
            text-align: center;
            border-radius: 8px;
            font-size: 18px;
            font-weight: bold;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 14px;
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(135deg, #555555, #333333);
            color: white !important;
            text-decoration: none;
            border-radius: 8px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Booking Confirmed!</h1>
            <p>Thank you for choosing VanTravelGeorgia</p>
          </div>
          
          <div class="content">
            <p>Dear ${safeName},</p>
            <p>Your booking has been confirmed! We're excited to have you join us.</p>
            
            <div class="reference">
              Booking Reference: ${safeReference}
            </div>
            
            <div class="booking-details">
              <h3>📋 Booking Details</h3>
              
              <div class="detail-row">
                <span class="detail-label">Tour:</span>
                <span class="detail-value">${safeTourTitle}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Guests:</span>
                <span class="detail-value">${guests} ${guests === 1 ? 'person' : 'people'}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Total Price:</span>
                <span class="detail-value" style="font-weight: bold; font-size: 18px;">$${totalPrice}</span>
              </div>
            </div>
            
            <h3>📝 What's Next?</h3>
            <ul>
              <li>Our team will contact you within 24 hours to confirm all details</li>
              <li>You'll receive another email 2 days before your tour with meeting point and time</li>
              <li>Payment can be made on the tour day (cash or card accepted)</li>
            </ul>
            
            <center>
              <a href="${process.env.CLIENT_URL}/bookings/${reference}" class="button">
                View Booking Details
              </a>
            </center>
            
            <p style="margin-top: 30px;">
              If you have any questions, feel free to reply to this email or contact us at:
            </p>
            <ul>
              <li>📞 Phone: +995 555 123 456</li>
              <li>✉️ Email: info@vantravelgeorgia.com</li>
              <li>💬 WhatsApp: +995 555 123 456</li>
            </ul>
          </div>
          
          <div class="footer">
            <p>Thank you for choosing VanTravelGeorgia!</p>
            <p>© ${new Date().getFullYear()} VanTravelGeorgia. All rights reserved.</p>
            <p style="font-size: 12px; color: #999;">
              You're receiving this email because you made a booking with us.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Email send error:', error);
    throw error;
  }
};

// Send contact form email
export const sendContactEmail = async ({ name, email, subject, message }) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  const mailOptions = {
    from: `"VanTravelGeorgia Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    replyTo: email,
    subject: `Contact Form: ${safeSubject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p style="padding: 20px; background: #f8f9fa; border-radius: 8px;">
          ${safeMessage}
        </p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Sent from VanTravelGeorgia website contact form
        </p>
      </div>
    `
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('✅ Contact email sent:', info.messageId);
  return info;
};

// Send admin notification for new booking
export const sendAdminNotification = async (booking) => {
  const safeTourTitle = escapeHtml(booking.tourTitle);
  const safeName = escapeHtml(booking.name);
  const safeEmail = escapeHtml(booking.email);
  const safePhone = escapeHtml(booking.phone);
  const safeMessage = booking.message ? escapeHtml(booking.message) : '';

  const mailOptions = {
    from: `"VanTravelGeorgia System" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `🔔 New Booking: ${safeTourTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>New Booking Received!</h2>
        <p><strong>Tour:</strong> ${safeTourTitle}</p>
        <p><strong>Customer:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
        <p><strong>Guests:</strong> ${booking.guests}</p>
        <p><strong>Total:</strong> $${booking.totalPrice}</p>
        <p><strong>Reference:</strong> ${booking.generateReference()}</p>
        ${safeMessage ? `<p><strong>Message:</strong> ${safeMessage}</p>` : ''}
        <a href="${process.env.ADMIN_URL || process.env.CLIENT_URL}/admin/bookings/${booking._id}" 
           style="display: inline-block; padding: 10px 20px; background: #000; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 20px;">
          View in Admin Panel
        </a>
      </div>
    `
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('✅ Admin notification sent:', info.messageId);
  return info;
};

export default transporter;
