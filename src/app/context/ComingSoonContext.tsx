import React, { createContext, useContext, useState, ReactNode } from "react";
import ComingSoonModal from "../components/ComingSoonModal";

interface ComingSoonContextType {
  openComingSoon: (eventName?: string) => void;
  closeComingSoon: () => void;
}

const ComingSoonContext = createContext<ComingSoonContextType | undefined>(
  undefined
);

export function ComingSoonProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [eventName, setEventName] = useState<string | null>(null);

  const openComingSoon = (name?: string) => {
    setEventName(name || null);
    setIsOpen(true);
  };

  const closeComingSoon = () => {
    setIsOpen(false);
    setEventName(null);
  };

  return (
    <ComingSoonContext.Provider value={{ openComingSoon, closeComingSoon }}>
      {children}
      <ComingSoonModal
        isOpen={isOpen}
        onClose={closeComingSoon}
        eventName={eventName}
      />
    </ComingSoonContext.Provider>
  );
}

export function useComingSoon() {
  const context = useContext(ComingSoonContext);
  if (!context) {
    // Provide a safe fallback if context is ever missing to avoid runtime crashes
    return {
      openComingSoon: () => {
        alert("Registration Coming Soon!");
      },
      closeComingSoon: () => {},
    };
  }
  return context;
}
