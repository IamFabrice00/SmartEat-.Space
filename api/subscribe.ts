import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, language, site_name } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'SmartEat .Space <onboarding@resend.dev>', // You should change this to your verified domain later
      to: [email],
      subject: site_name + ' - Subscription Confirmed',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1a1a1a;">
          <h1 style="color: #8B0000;">Welcome to SmartEat .Space</h1>
          <p>Thank you for subscribing to our newsletter.</p>
          <p>You will receive our latest bio-metric insights and nutritional strategies soon.</p>
          <hr />
          <p style="font-size: 12px; color: #666;">© 2024 SmartEat .Space</p>
        </div>
      `,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    // Also send an email to the admin (optional but useful)
    await resend.emails.send({
      from: 'SmartEat .Space <onboarding@resend.dev>',
      to: ['logonfabrice@gmail.com'], 
      subject: 'New Newsletter Subscriber: ' + email,
      text: `New subscriber: ${email} (Lang: ${language})`,
    });

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
