import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Role, Language, Equipment, BookingRequest, Dictionary } from '../types';
import { mockEquipment, mockRequests, dictionary } from '../data/mockData';

export interface User {
  name: string;
  phone: string;
  isLoggedIn: boolean;
}

interface AppContextType {
  user: User;
  setUser: (user: User) => void;
  role: Role;
  setRole: (role: Role) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  equipment: Equipment[];
  setEquipment: (eq: Equipment[]) => void;
  requests: BookingRequest[];
  addRequest: (req: BookingRequest) => void;
  updateRequestStatus: (id: string, status: BookingRequest['status']) => void;
  updateEquipmentStatus: (id: string, status: Equipment['status']) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ name: '', phone: '', isLoggedIn: false });
  const [role, setRole] = useState<Role>('farmer');
  const [language, setLanguage] = useState<Language>('en');
  const [equipment, setEquipment] = useState<Equipment[]>(mockEquipment);
  const [requests, setRequests] = useState<BookingRequest[]>(mockRequests);

  const addRequest = (req: BookingRequest) => {
    setRequests([...requests, req]);
  };

  const updateRequestStatus = (id: string, status: BookingRequest['status']) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
  };

  const updateEquipmentStatus = (id: string, status: Equipment['status']) => {
    setEquipment(equipment.map(e => e.id === id ? { ...e, status } : e));
  };

  const t = (key: string) => {
    if (dictionary[key] && dictionary[key][language]) {
      return dictionary[key][language];
    }
    return key;
  };

  return (
    <AppContext.Provider value={{
      user, setUser, role, setRole, language, setLanguage,
      equipment, setEquipment, requests, addRequest,
      updateRequestStatus, updateEquipmentStatus, t
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
