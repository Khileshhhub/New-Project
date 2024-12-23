import React from 'react';
import { Platform, Train } from '../../types/types';
import { PlatformCard } from './PlatformCard';

interface PlatformStatusProps {
  platforms: Platform[];
  trains: Train[];
}

export const PlatformStatus: React.FC<PlatformStatusProps> = ({ platforms, trains }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {platforms.map((platform) => {
        const currentTrain = platform.currentTrain
          ? trains.find((t) => t.id === platform.currentTrain)
          : undefined;

        return (
          <PlatformCard
            key={platform.number}
            platform={platform}
            train={currentTrain}
          />
        );
      })}
    </div>
  );
};