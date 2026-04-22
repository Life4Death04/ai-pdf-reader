import { franc } from 'franc-min';

export function detectLanguage(text: string): 'en' | 'es' {
  const sample = text.slice(0, 600);
  const detected = franc(sample);

  return detected === 'spa' ? 'es' : 'en';
}
