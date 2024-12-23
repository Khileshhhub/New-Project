import React from 'react';
import { Platform, Train } from '../types/types';

interface PlatformStatusProps {
  platforms: Platform[];
  trains: Train[];
}

export const PlatformStatus = ({ platforms, trains }: PlatformStatusProps) => {
  const getTrainDetails = (trainId: string | null) => {
    return trains.find((train) => train.id === trainId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {platforms.map((platform) => (
        <div
          key={platform.number}
          className={`p-4 rounded-lg shadow-md ${
            platform.isOccupied ? 'bg-red-50' : 'bg-green-50'
          }`}
        >
          <h3 className="text-lg font-semibold mb-2">Platform {platform.number}</h3>
          {platform.isOccupied ? (
            <div>
              <p className="text-sm font-medium">
                {getTrainDetails(platform.currentTrain)?.name}
              </p>
              <p className="text-xs text-gray-600">
                {getTrainDetails(platform.currentTrain)?.number}
              </p>
            </div>
          ) : (
            <p className="text-sm text-green-600 font-medium">Available</p>
          )}
        </div>
      ))}
    </div>
  );
};