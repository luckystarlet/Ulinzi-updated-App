import React, { useState } from 'react';
import type { AuthScreen } from '../types';

interface SignUpScreenProps {
  onSignUpSuccess: () => void;
  setAuthScreen: (screen: AuthScreen) => void;
  onNavigateToTerms: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignUpSuccess, setAuthScreen, onNavigateToTerms }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate a successful sign-up
    if (name && email && password) {
      console.log('Signing up with:', { name, email, password });
      onSignUpSuccess();
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="flex flex-col h-full pt-8">
      <h2 className="text-3xl font-bold text-black mb-2">Create Account</h2>
      <p className="text-black/60 mb-8">Join Ulinzi to stay safe and protected.</p>

      <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full bg-gray-100 text-black placeholder-black/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A41C3] border border-gray-300"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full bg-gray-100 text-black placeholder-black/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A41C3] border border-gray-300"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-gray-100 text-black placeholder-black/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A41C3] border border-gray-300"
            required
          />
        </div>

        <p className="text-xs text-black/50 mt-4">
          By creating an account, you agree to our{' '}
          <button type="button" onClick={onNavigateToTerms} className="underline hover:text-[#4A41C3]">
            Terms & Conditions
          </button>
          .
        </p>
        
        <div className="mt-auto">
            <button
                type="submit"
                className="w-full bg-[#4A41C3] hover:bg-[#3A31A3] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
            >
                Sign Up
            </button>

            <p className="text-center text-sm text-black/60 mt-4">
                Already have an account?{' '}
                <button type="button" onClick={() => setAuthScreen('signin')} className="font-semibold text-[#4A41C3] hover:underline">
                    Sign In
                </button>
            </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpScreen;