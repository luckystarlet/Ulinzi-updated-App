import React from 'react';
import { ShieldCheck, ShieldOff } from './Icons';

interface GuardianModeScreenProps {
  isGuardianModeActive: boolean;
  onToggle: () => void;
}

const GuardianModeScreen: React.FC<GuardianModeScreenProps> = ({ isGuardianModeActive, onToggle }) => {
  return (
    <div className="flex flex-col items-center text-center h-full pt-10">
      <h2 className="text-2xl font-bold text-[#4A41C3] mb-4">Guardian Mode</h2>
      <p className="text-black/70 mb-8 max-w-xs">
        When active, Ulinzi runs in the background to detect danger signals using your device's sensors.
      </p>

      <div className={`relative w-64 h-64 flex items-center justify-center rounded-full border-4 ${isGuardianModeActive ? 'border-[#4A41C3]' : 'border-black/20'}`}>
        {isGuardianModeActive && (
          <>
            <div className="absolute inset-0 rounded-full bg-[#4A41C3]/10 animate-ping"></div>
            <div className="absolute inset-2 rounded-full border-2 border-[#4A41C3]/30"></div>
          </>
        )}
        {isGuardianModeActive ? (
          <ShieldCheck className="w-32 h-32 text-[#4A41C3]" />
        ) : (
          <ShieldOff className="w-32 h-32 text-black/40" />
        )}
      </div>

      <div className="mt-8">
        <p className="text-lg font-semibold">Status: 
          <span className={isGuardianModeActive ? 'text-[#4A41C3]' : 'text-black/50'}>
            {isGuardianModeActive ? ' Active & Monitoring' : ' Paused'}
          </span>
        </p>
        <p className="text-sm text-black/50 mt-1">
          {isGuardianModeActive ? 'AI sensors are listening for distress signals.' : 'Activate to start background monitoring.'}
        </p>
      </div>

      <button
        onClick={onToggle}
        className={`mt-12 font-bold py-3 px-8 rounded-lg text-white transition-colors duration-300 ${
          isGuardianModeActive ? 'bg-red-600 hover:bg-red-700' : 'bg-[#4A41C3] hover:bg-[#3A31A3]'
        }`}
      >
        {isGuardianModeActive ? 'Pause Guardian Mode' : 'Activate Guardian Mode'}
      </button>
    </div>
  );
};

export default GuardianModeScreen;