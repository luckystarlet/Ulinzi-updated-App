import React from 'react';
import { ArrowLeft } from './Icons';

interface TermsScreenProps {
  onBack: () => void;
}

const TermsScreen: React.FC<TermsScreenProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2 mr-2 text-black/80 hover:text-black">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-[#4A41C3]">Terms & Conditions</h2>
      </div>

      <div className="flex-grow overflow-y-auto pr-2 text-black/80 space-y-4 text-sm">
        <p className="font-semibold text-black">Last updated: [Date]</p>
        
        <p>
          Welcome to Ulinzi. These terms and conditions outline the rules and regulations for the use of Ulinzi's Application.
        </p>

        <h3 className="font-bold text-black/90 pt-2">1. Acceptance of Terms</h3>
        <p>
          By accessing this app, we assume you accept these terms and conditions. Do not continue to use Ulinzi if you do not agree to all of the terms and conditions stated on this page.
        </p>

        <h3 className="font-bold text-black/90 pt-2">2. License to Use</h3>
        <p>
          Unless otherwise stated, Ulinzi and/or its licensors own the intellectual property rights for all material on Ulinzi. All intellectual property rights are reserved. You may access this from Ulinzi for your own personal use subjected to restrictions set in these terms and conditions.
        </p>
        
        <h3 className="font-bold text-black/90 pt-2">3. User Responsibilities</h3>
        <p>
            You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
        </p>
        
        <h3 className="font-bold text-black/90 pt-2">4. Emergency Services</h3>
        <p>
            Ulinzi is a tool to assist in emergency situations but is not a replacement for contacting emergency services directly (e.g., dialing 911, 999, 112). We do not guarantee that your emergency contacts will receive or respond to any alert.
        </p>

        <h3 className="font-bold text-black/90 pt-2">5. Disclaimer</h3>
        <p>
          The materials on Ulinzi's app are provided on an 'as is' basis. Ulinzi makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>
        
        <p className="pt-4">
            [... More sections on Privacy Policy, Limitation of Liability, Governing Law, etc. would be included here.]
        </p>
      </div>
    </div>
  );
};

export default TermsScreen;