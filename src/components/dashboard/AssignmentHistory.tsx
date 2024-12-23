import React from 'react';
import { useTrainStore } from '../../store/trainStore';
import { formatDateTime } from '../../utils/dateUtils';

export const AssignmentHistory = () => {
  const assignments = useTrainStore((state) => state.assignments);
  const trains = useTrainStore((state) => state.trains);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Assignments</h3>
      <div className="space-y-4">
        {assignments.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent assignments</p>
        ) : (
          assignments.map((assignment) => {
            const train = trains.find((t) => t.id === assignment.trainId);
            return (
              <div
                key={assignment.id}
                className="border-l-4 border-indigo-500 pl-4 py-2"
              >
                <p className="font-medium">{train?.name}</p>
                <p className="text-sm text-gray-600">
                  Platform {assignment.platformId}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDateTime(assignment.assignedAt)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};