import type { EmailPayload, EmailProviderType } from '../types';

export function buildEmailUrl(provider: EmailProviderType, payload: EmailPayload): string {
  const { to, subject, body } = payload;

  const encode = (str: string) => encodeURIComponent(str);

  switch (provider) {
    case 'gmail':
      return `https://mail.google.com/mail/?view=cm&fs=1&to=${encode(to)}&su=${encode(subject)}&body=${encode(body)}`;
    case 'yahoo':
      return `https://compose.mail.yahoo.com/?to=${encode(to)}&subject=${encode(subject)}&body=${encode(body)}`;
    case 'outlook':
      return `https://outlook.live.com/owa/?path=/mail/action/compose&to=${encode(to)}&subject=${encode(subject)}&body=${encode(body)}`;
    case 'mailto':
    case 'apple-mail':
    default:
      return `mailto:${to}?subject=${encode(subject)}&body=${encode(body)}`;
  }
}
