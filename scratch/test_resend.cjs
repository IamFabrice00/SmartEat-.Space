const { Resend } = require('resend');

const resend = new Resend('re_BPNeWwU2_FYAqX8A6kv153CkrJGZQag6G');

async function testResend() {
  console.log('Starting Resend test...');
  try {
    const { data, error } = await resend.emails.send({
      from: 'SmartEat .Space <onboarding@resend.dev>',
      to: ['logonfabrice@gmail.com'],
      subject: 'Resend API Key Test - SmartEat .Space',
      html: '<h1>It Works!</h1><p>The Resend API key is valid and working correctly.</p>',
    });

    if (error) {
      console.error('Resend Error:', error);
    } else {
      console.log('Email sent successfully!', data);
    }
  } catch (err) {
    console.error('Test Script Error:', err);
  }
}

testResend();
