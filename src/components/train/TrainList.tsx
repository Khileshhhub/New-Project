import React from 'react';
import { Clock, Train as TrainIcon } from 'lucide-react';
import { Train, User } from '../../types/types';
import { TrainActions } from './TrainActions';
import { TrainStatusBadge } from './TrainStatusBadge';

interface TrainListProps {
  trains: Train[];
  user: User | null;
  onAssignPlatform: (trainId: string, platformNumber: number) => void;
  onRemoveAssignment: (trainId: string, platformNumber: number) => void;
  onModifyAssignment: (
    trainId: string,
    oldPlatformNumber: number,
    newPlatformNumber: number
  ) => void;
  onUpdateStatus: (trainId: string, status: Train['status']) => void;
}

export const TrainList: React.FC<TrainListProps> = ({
  trains,
  user,
  onAssignPlatform,
  onRemoveAssignment,
  onModifyAssignment,
  onUpdateStatus,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Train
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Schedule
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Platform
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {trains.map((train) => (
            <tr key={train.id}>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <TrainIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {train.name}
                    </div>
                    <div className="text-sm text-gray-500">{train.number}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <div>
                    <div className="text-sm text-gray-900">
                      Arrival: {train.arrival}
                    </div>
                    <div className="text-sm text-gray-500">
                      Departure: {train.departure}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100">
                  {train.platform || 'Not Assigned'}
                </span>
              </td>
              <td className="px-6 py-4">
                <TrainStatusBadge
                  status={train.status}
                  onStatusChange={
                    user?.role === 'ADMIN'
                      ? (status) => onUpdateStatus(train.id, status)
                      : undefined
                  }
                />
              </td>
              <td className="px-6 py-4">
                <TrainActions
                  train={train}
                  user={user}
                  onAssignPlatform={onAssignPlatform}
                  onRemoveAssignment={onRemoveAssignment}
                  onModifyAssignment={onModifyAssignment}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};