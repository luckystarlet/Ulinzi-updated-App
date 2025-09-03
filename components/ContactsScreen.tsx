import React, { useState } from 'react';
import type { Contact } from '../types';
import { UserPlus, Trash2, User } from './Icons';

interface ContactsScreenProps {
  trustedContacts: Contact[];
  setTrustedContacts: (contacts: Contact[]) => void;
}

const ContactsScreen: React.FC<ContactsScreenProps> = ({ trustedContacts, setTrustedContacts }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const addContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      const newContact: Contact = {
        id: new Date().toISOString(),
        name,
        phone,
      };
      setTrustedContacts([...trustedContacts, newContact]);
      setName('');
      setPhone('');
    }
  };

  const deleteContact = (id: string) => {
    setTrustedContacts(trustedContacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold text-[#4A41C3] mb-4 pb-2 border-b border-black/10">Trusted Contacts</h2>
      <p className="text-black/70 text-sm mb-6">These contacts will be alerted when you trigger an SOS.</p>
      
      <form onSubmit={addContact} className="mb-8 p-4 bg-gray-100 border border-black/10 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Add New Contact</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full bg-white text-black placeholder-black/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A41C3] border border-gray-300"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className="w-full bg-white text-black placeholder-black/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A41C3] border border-gray-300"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full flex items-center justify-center bg-[#4A41C3] hover:bg-[#3A31A3] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Add Contact
        </button>
      </form>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Your Contacts ({trustedContacts.length})</h3>
        {trustedContacts.length > 0 ? (
          <ul className="space-y-3">
            {trustedContacts.map(contact => (
              <li key={contact.id} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-black/10 p-2 rounded-full">
                    <User className="w-5 h-5 text-[#4A41C3]"/>
                  </div>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-black/70">{contact.phone}</p>
                  </div>
                </div>
                <button onClick={() => deleteContact(contact.id)} className="text-gray-500 hover:text-red-500 p-2">
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 bg-gray-100 border border-dashed border-black/20 rounded-lg">
            <p className="text-black/50">You haven't added any trusted contacts yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsScreen;