'use client';

import React, { createContext, useContext } from 'react';

interface TabsContextType {
  value: string;
  onValueChange?: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

export function Tabs({
  value,
  onValueChange,
  children,
}: {
  value: string;
  onValueChange?: (value: string) => void; // ✅ OPTIONAL
  children: React.ReactNode;
}) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className="flex">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-2 bg-gray-100 rounded-lg p-1">{children}</div>;
}

export function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext);
  if (!ctx) return null;

  const isActive = ctx.value === value;

  return (
    <button
      type="button"
      onClick={() => ctx.onValueChange?.(value)} // ✅ SAFE CALL
      className={`px-4 py-2 text-sm font-medium rounded-md transition
        ${isActive ? 'bg-white shadow text-purple-600' : 'text-gray-600 hover:text-gray-900'}
      `}
    >
      {children}
    </button>
  );
}
