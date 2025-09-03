import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Siren } from './Icons';

interface HomeScreenProps {
  isGuardianModeActive: boolean;
  onGuardianToggle: () => void;
  trustedContactsCount: number;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ isGuardianModeActive, onGuardianToggle, trustedContactsCount }) => {
  const [sosState, setSosState] = useState<'idle' | 'confirming' | 'sent'>('idle');

  const handleSosClick = () => {
    if (trustedContactsCount === 0) {
        alert("Please add at least one trusted contact before sending an SOS.");
        return;
    }
    setSosState('confirming');
  };

  const confirmSos = () => {
    setSosState('sent');
    // Simulate sending SOS
    setTimeout(() => {
      setSosState('idle');
    }, 5000);
  };

  const cancelSos = () => {
    setSosState('idle');
  };

  const SosConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-sm text-center border border-gray-200 shadow-xl">
            <Siren className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-black">Confirm SOS Alert</h2>
            <p className="text-black/70 mb-6">This will immediately send your location to {trustedContactsCount} trusted contact(s) and emergency services.</p>
            <div className="flex flex-col space-y-3">
                <button 
                    onClick={confirmSos}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                    Yes, Send Alert
                </button>
                <button 
                    onClick={cancelSos}
                    className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      {sosState === 'confirming' && <SosConfirmationModal />}
      <h1 className="text-4xl font-bold text-[#4A41C3] mb-2">ULINZI</h1>
      <p className="text-black/70 mb-12">Your Digital Bodyguard</p>

      <div className="relative mb-12">
        <button
          onClick={handleSosClick}
          disabled={sosState === 'sent'}
          className={`relative w-48 h-48 rounded-full flex items-center justify-center transition-all duration-300 ${
            sosState === 'sent' ? 'bg-green-500' : 'bg-red-600 hover:bg-red-700 active:bg-red-800'
          } shadow-2xl shadow-red-500/50`}
        >
          <div className="absolute inset-0 rounded-full border-4 border-red-500/50 animate-pulse"></div>
          {sosState === 'sent' ? (
            <div className="text-center">
              <ShieldCheck className="w-16 h-16 text-white mb-1" />
              <span className="text-white text-lg font-bold">SENT</span>
            </div>
          ) : (
            <div className="text-center">
              <Siren className="w-16 h-16 text-white mb-1" />
              <span className="text-white text-2xl font-bold tracking-widest">SOS</span>
            </div>
          )}
        </button>
      </div>

      <div className="bg-gray-100 border border-black/10 rounded-lg p-4 w-full max-w-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isGuardianModeActive ? <ShieldCheck className="w-6 h-6 text-[#4A41C3]" /> : <ShieldAlert className="w-6 h-6 text-black/50" />}
            <div>
              <p className="font-semibold">Guardian Mode</p>
              <p className={`text-sm ${isGuardianModeActive ? 'text-[#4A41C3]' : 'text-black/50'}`}>
                {isGuardianModeActive ? 'Active & Protecting' : 'Inactive'}
              </p>
            </div>
          </div>
          <button
            onClick={onGuardianToggle}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
              isGuardianModeActive ? 'bg-[#4A41C3]' : 'bg-black/20'
            }`}
          >
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                isGuardianModeActive ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;