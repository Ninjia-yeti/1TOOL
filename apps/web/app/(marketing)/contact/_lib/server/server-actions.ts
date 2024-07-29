'use server';

import { z } from 'zod';

import { getMailer } from '@kit/mailers';
import { enhanceAction } from '@kit/next/actions';

import { ContactEmailSchema } from '../contact-email.schema';

const contactEmail = z
  .string({
    description: `The email where you want to receive the contact form submissions.`,
    required_error:
      'Contact email is required. Please use the environment variable CONTACT_EMAIL.',
  })
  .parse(process.env.CONTACT_EMAIL);

const emailFrom = z
  .string({
    description: `The email sending address.`,
    required_error:
      'Sender email is required. Please use the environment variable EMAIL_SENDER.',
  })
  .parse(process.env.EMAIL_SENDER);

export const sendContactEmail = enhanceAction(
  async (data) => {
    const mailer = await getMailer();

    await mailer.sendEmail({
      to: contactEmail,
      from: emailFrom,
      subject: 'Contact Form Submission',
      html: `
        <p>
          You have received a new contact form submission.
        </p>

        <p>Name: ${data.name}</p>
        <p>Email: ${data.email}</p>
        <p>Message: ${data.message}</p>
      `,
    });

    return {};
  },
  {
    schema: ContactEmailSchema,
    auth: false,
  },
);
