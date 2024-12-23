import React from 'react';
import { Train } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Train size={32} />
          <h1 className="text-2xl font-bold">Railway Platform Management</h1>
        </div>
        <div className="text-sm">
          <p className="font-medium">Central Station</p>
          <p>{new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </header>
  );
};