import { SCREEN } from './constants';

export type Screen = typeof SCREEN[keyof typeof SCREEN];

export type AuthScreen = 'welcome' | 'signin' | 'signup' | 'terms';

export interface Contact {
  id: string;
  name: string;
  phone: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}