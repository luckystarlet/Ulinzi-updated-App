import React, { useState } from 'react';
import { BookOpen, ChevronDown, Map, Shield } from './Icons';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black/10 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4 px-2"
      >
        <span className="font-semibold">{title}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-4 bg-white">
          <p className="text-black/80">{children}</p>
        </div>
      )}
    </div>
  );
};

const CivicHubScreen: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#4A41C3] mb-6 pb-2 border-b border-black/10">Safety & Civic Hub</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center"><Map className="w-6 h-6 mr-2 text-[#4A41C3]" /> Safety Map</h3>
        <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center text-black/50 border border-black/20">
            <p>Crowdsourced Safety Map (Coming Soon)</p>
        </div>
        <p className="text-sm text-black/70 mt-2">View community-reported safe and unsafe zones in your area.</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center"><BookOpen className="w-6 h-6 mr-2 text-[#4A41C3]" /> Know Your Rights</h3>
        <div className="bg-gray-100 border border-black/10 rounded-lg">
          <AccordionItem title="During a Police Stop">
            You have the right to remain silent. You are not required to answer questions about where you are going, where you are coming from, or what you are doing. You can state, "I wish to remain silent."
          </AccordionItem>
          <AccordionItem title="Rights in Case of Gender-Based Violence (GBV)">
            Survivors have the right to medical treatment, legal aid, and protection from the perpetrator. You can obtain a P3 form from a government hospital, which is crucial for legal proceedings.
          </AccordionItem>
          <AccordionItem title="Digital Privacy Rights">
            Law enforcement generally cannot search your phone without a warrant. You are not obligated to provide your password or unlock your phone.
          </AccordionItem>
           <AccordionItem title="Rights of an Arrested Person">
            You have the right to be informed promptly, in a language you understand, of the reason for your arrest. You have the right to contact a lawyer and to communicate with a family member.
          </AccordionItem>
        </div>
      </div>
    </div>
  );
};

export default CivicHubScreen;