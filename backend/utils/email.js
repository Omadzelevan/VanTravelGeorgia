// backend/utils/email.js
import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env'), quiet: true });
dotenv.config({ path: path.resolve(process.cwd(), 'backend/.env'), quiet: true });

let resendClient = null;
const EMAIL_FROM = process.env.EMAIL_FROM || 'VanTravelGeorgia <onboarding@resend.dev>';

function getResend() {
  if (resendClient) return resendClient;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  resendClient = new Resend(apiKey);
  return resendClient;
}

export const sendBookingConfirmation = async ({
  email,
  name,
  tourTitle,
  date,
  guests,
  totalPrice,
  reference
}) => {
  try {
    const { data, error } = await getResend().emails.send({
      from: EMAIL_FROM,
      to: [email],
      subject: `✅ Booking Confirmed - ${tourTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #000;">🎉 Booking Confirmed!</h1>
          <p>Dear ${name},</p>
          <p>Your booking has been confirmed. Here are the details:</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Booking Reference:</strong> ${reference}</p>
            <p><strong>Tour:</strong> ${tourTitle}</p>
            <p><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
            <p><strong>Guests:</strong> ${guests}</p>
            <p><strong>Total Price:</strong> $${totalPrice}</p>
          </div>
          
          <h3>What's Next?</h3>
          <ul>
            <li>Our team will contact you within 24 hours</li>
            <li>Payment can be made on the tour day</li>
            <li>We'll send a reminder 2 days before your tour</li>
          </ul>
          
          <p><strong>Contact us:</strong></p>
          <p>📞 Phone: +995 555 123 456</p>
          <p>✉️ Email: info@vantravelgeorgia.com</p>
          
          <p style="margin-top: 30px; color: #666; font-size: 14px;">
            Thank you for choosing VanTravelGeorgia!
          </p>
        </div>
      `
    });

    if (error) {
      throw error;
    }

    console.log('✅ Email sent via Resend:', data);
    return data;
  } catch (error) {
    console.error('❌ Resend error:', error);
    throw error;
  }
};

export const sendAdminNotification = async (booking) => {
  try {
    const { data, error } = await getResend().emails.send({
      from: EMAIL_FROM,
      to: [process.env.ADMIN_EMAIL || 'admin@vantravelgeorgia.com'],
      subject: `🧾 New Booking: ${booking.generateReference()}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Booking Received</h2>
          <p><strong>Reference:</strong> ${booking.generateReference()}</p>
          <p><strong>Tour:</strong> ${booking.tourTitle}</p>
          <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString('en-US')}</p>
          <p><strong>Guests:</strong> ${booking.guests}</p>
          <p><strong>Total:</strong> $${booking.totalPrice}</p>
          <hr />
          <p><strong>Name:</strong> ${booking.name}</p>
          <p><strong>Email:</strong> ${booking.email}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
          <p><strong>Message:</strong> ${booking.message || '-'}</p>
        </div>
      `
    });

    if (error) {
      throw error;
    }

    console.log('✅ Admin notification sent via Resend:', data);
    return data;
  } catch (error) {
    console.error('❌ Resend admin notification error:', error);
    throw error;
  }
};

export const sendContactEmail = async ({ name, email, phone, subject, message }) => {
  const recipient = process.env.ADMIN_EMAIL || 'admin@vantravelgeorgia.com';
  const payload = {
    from: EMAIL_FROM,
    to: [recipient],
    replyTo: email,
    subject: `📧 Contact Form: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || '-'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    `
  };

  try {
    const { data, error } = await getResend().emails.send(payload);

    if (error) {
      throw error;
    }

    console.log('✅ Contact email sent via Resend:', data);
    return data;
  } catch (error) {
    const msg = String(error?.message || '');
    const trialMatch = msg.match(/own email address \(([^)]+)\)/i);
    if (error?.statusCode === 403 && trialMatch?.[1]) {
      const trialRecipient = trialMatch[1].trim();
      const { data, error: retryError } = await getResend().emails.send({
        ...payload,
        to: [trialRecipient]
      });
      if (!retryError) {
        console.warn(
          `⚠️ Resend trial mode active; contact email redirected to account owner (${trialRecipient})`
        );
        return data;
      }
    }
    console.error('❌ Resend error:', error);
    throw error;
  }
};

export const sendBookingRequestEmail = async ({
  tourTitle,
  pricePerPerson,
  totalPrice,
  name,
  email,
  phone,
  date,
  guests,
  message
}) => {
  const recipient = process.env.ADMIN_EMAIL || 'admin@vantravelgeorgia.com';
  const payload = {
    from: EMAIL_FROM,
    to: [recipient],
    replyTo: email,
    subject: `🧾 Booking Request (${tourTitle})`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Tour:</strong> ${tourTitle}</p>
        <p><strong>Price Per Person:</strong> $${pricePerPerson}</p>
        <p><strong>Total To Pay:</strong> $${totalPrice}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message || '-'}</p>
      </div>
    `
  };

  try {
    const { data, error } = await getResend().emails.send(payload);
    if (error) throw error;
    console.log('✅ Booking request email sent via Resend:', data);
    return data;
  } catch (error) {
    const msg = String(error?.message || '');
    const trialMatch = msg.match(/own email address \(([^)]+)\)/i);
    if (error?.statusCode === 403 && trialMatch?.[1]) {
      const trialRecipient = trialMatch[1].trim();
      const { data, error: retryError } = await getResend().emails.send({
        ...payload,
        to: [trialRecipient]
      });
      if (!retryError) {
        console.warn(
          `⚠️ Resend trial mode active; booking email redirected to account owner (${trialRecipient})`
        );
        return data;
      }
    }
    console.error('❌ Resend booking error:', error);
    throw error;
  }
};

export default getResend;
