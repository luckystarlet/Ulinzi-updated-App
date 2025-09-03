import React, { useState, useEffect } from 'react';
import type { Screen, Contact, AuthScreen } from './types';
import { SCREEN } from './constants';
import HomeScreen from './components/HomeScreen';
import ChatbotScreen from './components/ChatbotScreen';
import ContactsScreen from './components/ContactsScreen';
import CivicHubScreen from './components/CivicHubScreen';
import NavBar from './components/NavBar';
import GuardianModeScreen from './components/GuardianModeScreen';
import WelcomeScreen from './components/WelcomeScreen';
import SignInScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';
import TermsScreen from './components/TermsScreen';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authScreen, setAuthScreen] = useState<AuthScreen>('welcome');
  const [previousAuthScreen, setPreviousAuthScreen] = useState<AuthScreen>('welcome');
  
  const [activeScreen, setActiveScreen] = useState<Screen>(SCREEN.HOME);
  const [isGuardianModeActive, setGuardianModeActive] = useState<boolean>(false);
  const [trustedContacts, setTrustedContacts] = useState<Contact[]>([]);
  
  useEffect(() => {
    // Check auth status
    const loggedIn = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(loggedIn);

    // Load contacts
    if (loggedIn) {
        try {
            const storedContacts = localStorage.getItem('trustedContacts');
            if (storedContacts) {
                setTrustedContacts(JSON.parse(storedContacts));
            }
        } catch (error) {
            console.error("Failed to parse trusted contacts from localStorage", error);
            localStorage.removeItem('trustedContacts');
        }
    }
  }, [isAuthenticated]);

  const handleSetTrustedContacts = (contacts: Contact[]) => {
    setTrustedContacts(contacts);
    try {
        localStorage.setItem('trustedContacts', JSON.stringify(contacts));
    } catch (error) {
        console.error("Failed to save trusted contacts to localStorage", error);
    }
  };
  
  const handleAuthSuccess = () => {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
  };
  
  const handleNavigateToTerms = (fromScreen: AuthScreen) => {
      setPreviousAuthScreen(fromScreen);
      setAuthScreen('terms');
  }

  const renderMainApp = () => {
    const renderScreen = () => {
      switch (activeScreen) {
        case SCREEN.HOME:
          return (
            <HomeScreen 
              isGuardianModeActive={isGuardianModeActive} 
              onGuardianToggle={() => setGuardianModeActive(!isGuardianModeActive)}
              trustedContactsCount={trustedContacts.length}
            />
          );
        case SCREEN.CHAT:
          return <ChatbotScreen />;
        case SCREEN.CONTACTS:
          return <ContactsScreen trustedContacts={trustedContacts} setTrustedContacts={handleSetTrustedContacts} />;
        case SCREEN.GUARDIAN:
          return <GuardianModeScreen isGuardianModeActive={isGuardianModeActive} onToggle={() => setGuardianModeActive(!isGuardianModeActive)} />;
        case SCREEN.HUB:
            return <CivicHubScreen />;
        default:
          return (
            <HomeScreen 
              isGuardianModeActive={isGuardianModeActive} 
              onGuardianToggle={() => setGuardianModeActive(!isGuardianModeActive)}
              trustedContactsCount={trustedContacts.length}
            />
          );
      }
    };

    return (
      <>
        <main className="flex-grow p-4 pb-24">
          {renderScreen()}
        </main>
        <NavBar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      </>
    );
  };

  const renderAuthFlow = () => {
    switch (authScreen) {
        case 'welcome':
            return <WelcomeScreen setAuthScreen={setAuthScreen} />;
        case 'signin':
            return <SignInScreen onSignInSuccess={handleAuthSuccess} setAuthScreen={setAuthScreen} onNavigateToTerms={() => handleNavigateToTerms('signin')} />;
        case 'signup':
            return <SignUpScreen onSignUpSuccess={handleAuthSuccess} setAuthScreen={setAuthScreen} onNavigateToTerms={() => handleNavigateToTerms('signup')} />;
        case 'terms':
            return <TermsScreen onBack={() => setAuthScreen(previousAuthScreen)} />;
        default:
            return <WelcomeScreen setAuthScreen={setAuthScreen} />;
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans flex flex-col justify-between max-w-md mx-auto shadow-2xl shadow-[#4A41C3]/30">
      {isAuthenticated ? renderMainApp() : <div className="flex-grow p-4">{renderAuthFlow()}</div>}
    </div>
  );
};

export default App;