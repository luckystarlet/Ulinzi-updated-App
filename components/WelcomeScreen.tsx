import React from 'react';
import type { AuthScreen } from '../types';
import { Shield } from './Icons';

interface WelcomeScreenProps {
  setAuthScreen: (screen: AuthScreen) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ setAuthScreen }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Shield className="w-24 h-24 text-[#4A41C3] mb-4" />
      <h1 className="text-4xl font-bold text-black mb-2">ULINZI</h1>
      <p className="text-black/70 mb-16">Your Digital Bodyguard</p>

      <div className="w-full max-w-xs flex flex-col space-y-4">
        <button
          onClick={() => setAuthScreen('signup')}
          className="w-full bg-[#4A41C3] hover:bg-[#3A31A3] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
        >
          Create Account
        </button>
        <button
          onClick={() => setAuthScreen('signin')}
          className="w-full bg-transparent hover:bg-black/10 border border-black/50 text-black font-bold py-3 px-4 rounded-lg transition-colors duration-300"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;