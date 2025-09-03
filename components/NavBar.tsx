import React from 'react';
import type { Screen } from '../types';
import { SCREEN } from '../constants';
import { Home, MessageSquare, Users, Shield, BookOpen } from './Icons';

interface NavBarProps {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

const NavButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${
      isActive ? 'text-[#4A41C3]' : 'text-black/50 hover:text-[#4A41C3]'
    }`}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
);

const NavBar: React.FC<NavBarProps> = ({ activeScreen, setActiveScreen }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto">
        <div className="bg-white/80 backdrop-blur-sm border-t border-black/10 flex justify-around p-2">
        <NavButton
            label="Home"
            icon={<Home className="w-6 h-6" />}
            isActive={activeScreen === SCREEN.HOME}
            onClick={() => setActiveScreen(SCREEN.HOME)}
        />
        <NavButton
            label="Guardian"
            icon={<Shield className="w-6 h-6" />}
            isActive={activeScreen === SCREEN.GUARDIAN}
            onClick={() => setActiveScreen(SCREEN.GUARDIAN)}
        />
        <NavButton
            label="Chat"
            icon={<MessageSquare className="w-6 h-6" />}
            isActive={activeScreen === SCREEN.CHAT}
            onClick={() => setActiveScreen(SCREEN.CHAT)}
        />
        <NavButton
            label="Contacts"
            icon={<Users className="w-6 h-6" />}
            isActive={activeScreen === SCREEN.CONTACTS}
            onClick={() => setActiveScreen(SCREEN.CONTACTS)}
        />
         <NavButton
            label="Hub"
            icon={<BookOpen className="w-6 h-6" />}
            isActive={activeScreen === SCREEN.HUB}
            onClick={() => setActiveScreen(SCREEN.HUB)}
        />
        </div>
    </div>
  );
};

export default NavBar;