import React, { useState } from 'react';
import type { AuthScreen } from '../types';

interface SignInScreenProps {
  onSignInSuccess: () => void;
  setAuthScreen: (screen: AuthScreen) => void;
  onNavigateToTerms: () => void;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ onSignInSuccess, setAuthScreen, onNavigateToTerms }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate a successful sign-in
    if (email && password) {
      console.log('Signing in with:', { email, password });
      onSignInSuccess();
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="flex flex-col h-full pt-8">
      <h2 className="text-3xl font-bold text-black mb-2">Welcome Back</h2>
      <p className="text-black/60 mb-8">Sign in to access your dashboard.</p>

      <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
        <div className="space-y-4">
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
          By signing in, you agree to our{' '}
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
            Sign In
          </button>

          <p className="text-center text-sm text-black/60 mt-4">
            Don't have an account?{' '}
            <button type="button" onClick={() => setAuthScreen('signup')} className="font-semibold text-[#4A41C3] hover:underline">
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignInScreen;