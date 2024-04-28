import { Resend } from 'resend';

const resend = new Resend('re_ihLH3hZP_JkZrB4hc9v4a97tjn47n3Fdd');

export default async function SendEmail() {
    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['flexiverbrisbane@gmail.com'],
        subject: 'hello world',
        text: 'it works!',
        headers: {
            'X-Entity-Ref-ID': '123456789',
        },
        tags: [
            {
                name: 'Flexiver',
                value: 'New Customer',
            },
        ],
    });
}

