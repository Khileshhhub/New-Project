import React from 'react';
import { Train } from '../../types/types';

interface TrainStatusBadgeProps {
  status: Train['status'];
  onStatusChange?: (status: Train['status']) => void;
}

export const TrainStatusBadge: React.FC<TrainStatusBadgeProps> = ({
  status,
  onStatusChange,
}) => {
  const getStatusColor = (status: Train['status']) => {
    switch (status) {
      case 'ON_TIME':
        return 'bg-green-100 text-green-800';
      case 'DELAYED':
        return 'bg-red-100 text-red-800';
      case 'ARRIVED':
        return 'bg-blue-100 text-blue-800';
      case 'DEPARTED':
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (onStatusChange) {
    return (
      <select
        className={`text-xs font-medium rounded-full px-2 py-1 ${getStatusColor(
          status
        )}`}
        value={status}
        onChange={(e) => onStatusChange(e.target.value as Train['status'])}
      >
        <option value="ON_TIME">On Time</option>
        <option value="DELAYED">Delayed</option>
        <option value="ARRIVED">Arrived</option>
        <option value="DEPARTED">Departed</option>
      </select>
    );
  }

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
        status
      )}`}
    >
      {status.replace('_', ' ')}
    </span>
  );
};