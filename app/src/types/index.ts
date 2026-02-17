export interface Representative {
  id: string;
  name: string;
  email: string;
  constituency: string;
  country_code: 'UK' | 'FR' | 'EU';
  party?: string;
  chamber?: string;
  department?: string;
  member_state?: string;
  political_group?: string;
}

export type CountryCode = 'UK' | 'FR' | 'EU';

export type CampaignStep =
  | 'country-selection'
  | 'representative-search'
  | 'message-editor'
  | 'email-provider'
  | 'confirmation'
  | 'privacy'
  | 'support';

export type TemplateTone = 'diplomatic' | 'firm' | 'urgent' | 'humanitarian' | 'security' | 'concise' | 'custom';

export interface MessageTemplate {
  tone: TemplateTone;
  label: string;
  subject: string;
  body: string;
}

export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
}

export type EmailProviderType = 'mailto' | 'gmail' | 'yahoo' | 'outlook' | 'apple-mail';

export interface EmailProvider {
  id: EmailProviderType;
  label: string;
  icon: string;
  buildUrl: (payload: EmailPayload) => string;
}

export interface CountryConfig {
  code: CountryCode;
  name: string;
  flag: string;
  description: string;
  searchType: 'postcode' | 'filter';
  filterLabel?: string;
  filterField?: keyof Representative;
  chamberName: string;
}

export interface AppState {
  currentStep: CampaignStep;
  selectedCountry: CountryCode | null;
  representatives: Representative[];
  selectedRepresentative: Representative | null;
  userName: string;
  selectedTone: TemplateTone;
  subject: string;
  body: string;
  loading: boolean;
}
