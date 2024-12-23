import React from 'react';
import { Platform, Train } from '../../types/types';
import { Train as TrainIcon } from 'lucide-react';

interface PlatformCardProps {
  platform: Platform;
  train: Train | undefined;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({ platform, train }) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-md ${
        platform.isOccupied ? 'bg-red-50' : 'bg-green-50'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Platform {platform.number}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            platform.isOccupied ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
          }`}
        >
          {platform.isOccupied ? 'Occupied' : 'Available'}
        </span>
      </div>
      {platform.isOccupied && train && (
        <div className="mt-2">
          <div className="flex items-center space-x-2">
            <TrainIcon className="h-4 w-4 text-gray-500" />
            <p className="text-sm font-medium">{train.name}</p>
          </div>
          <p className="text-xs text-gray-600 mt-1">Train No: {train.number}</p>
          <div className="mt-2 text-xs text-gray-500">
            <p>Arrival: {train.arrival}</p>
            <p>Departure: {train.departure}</p>
          </div>
        </div>
      )}
    </div>
  );
};