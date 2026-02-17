export interface TemplateData {
  rep_name: string;
  constituency: string;
  user_name: string;
  [key: string]: string;
}

export function interpolate(template: string, data: TemplateData): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return data[key] || `{{${key}}}`;
  });
}
