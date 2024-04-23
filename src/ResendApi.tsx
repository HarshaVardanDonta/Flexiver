import { Resend } from 'resend';

const resend = new Resend('re_ihLH3hZP_JkZrB4hc9v4a97tjn47n3Fdd');


export default async function SendEmail(props: any) {
    console.log(props);
    await fetch('https://api.resend.com/emails', {
        // mode: 'no-cors',
        method: 'POST',
        credentials: 'include',
        headers: {
            'Authorization': 'Bearer re_ihLH3hZP_JkZrB4hc9v4a97tjn47n3Fdd',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: "Flexiver <info@flexiver.com.au>",
            to: ['dharsha227@gmail.com'],
            subject: 'hello world',
            text: 'Name: ' + props.fromName + '\nContact: ' + props.Contact + '\nFrom Address: ' + props.fromAddress + '\nTo Address: ' + props.toAddress + '\nDescription: ' + props.description,
            headers: {
                'X-Entity-Ref-ID': '123'
            },

        })
    });
}

