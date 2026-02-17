import type { EmailPayload, EmailProvider } from '../types';

function encode(str: string): string {
  return encodeURIComponent(str);
}

export const emailProviders: EmailProvider[] = [
  {
    id: 'mailto',
    label: 'Default Email',
    icon: '\u{2709}\u{FE0F}',
    buildUrl: (p: EmailPayload) =>
      `mailto:${p.to}?subject=${encode(p.subject)}&body=${encode(p.body)}`,
  },
  {
    id: 'gmail',
    label: 'Gmail',
    icon: '\u{1F4E7}',
    buildUrl: (p: EmailPayload) =>
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encode(p.to)}&su=${encode(p.subject)}&body=${encode(p.body)}`,
  },
  {
    id: 'yahoo',
    label: 'Yahoo Mail',
    icon: '\u{1F4EC}',
    buildUrl: (p: EmailPayload) =>
      `https://compose.mail.yahoo.com/?to=${encode(p.to)}&subject=${encode(p.subject)}&body=${encode(p.body)}`,
  },
  {
    id: 'outlook',
    label: 'Outlook',
    icon: '\u{1F4E8}',
    buildUrl: (p: EmailPayload) =>
      `https://outlook.live.com/owa/?path=/mail/action/compose&to=${encode(p.to)}&subject=${encode(p.subject)}&body=${encode(p.body)}`,
  },
  {
    id: 'apple-mail',
    label: 'Apple Mail',
    icon: '\u{1F34E}',
    buildUrl: (p: EmailPayload) =>
      `mailto:${p.to}?subject=${encode(p.subject)}&body=${encode(p.body)}`,
  },
];
