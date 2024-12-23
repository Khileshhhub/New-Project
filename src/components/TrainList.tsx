import React from 'react';
import { Clock, Train as TrainIcon } from 'lucide-react';
import { Train } from '../types/types';

interface TrainListProps {
  trains: Train[];
  onAssignPlatform: (trainId: string, platform: number) => void;
}

export const TrainList = ({ trains, onAssignPlatform }: TrainListProps) => {
  const getStatusColor = (status: Train['status']) => {
    switch (status) {
      case 'ON_TIME':
        return 'text-green-600';
      case 'DELAYED':
        return 'text-red-600';
      case 'ARRIVED':
        return 'text-blue-600';
      case 'DEPARTED':
        return 'text-gray-600';
    }
  };

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
                <span
                  className={`inline-flex text-sm font-medium ${getStatusColor(
                    train.status
                  )}`}
                >
                  {train.status}
                </span>
              </td>
              <td className="px-6 py-4">
                {!train.platform && (
                  <select
                    className="text-sm border rounded px-2 py-1"
                    onChange={(e) =>
                      onAssignPlatform(train.id, Number(e.target.value))
                    }
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Assign Platform
                    </option>
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        Platform {num}
                      </option>
                    ))}
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};