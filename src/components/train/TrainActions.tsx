import React from 'react';
import { Train, User } from '../../types/types';
import { canModifyAssignment, canAssignPlatform } from '../../utils/permissionUtils';
import { Edit2, X } from 'lucide-react';

interface TrainActionsProps {
  train: Train;
  user: User | null;
  onAssignPlatform: (trainId: string, platformNumber: number) => void;
  onRemoveAssignment: (trainId: string, platformNumber: number) => void;
  onModifyAssignment: (
    trainId: string,
    oldPlatformNumber: number,
    newPlatformNumber: number
  ) => void;
}

export const TrainActions: React.FC<TrainActionsProps> = ({
  train,
  user,
  onAssignPlatform,
  onRemoveAssignment,
  onModifyAssignment,
}) => {
  const [isModifying, setIsModifying] = React.useState(false);

  if (!canAssignPlatform(user)) {
    return null;
  }

  if (train.platform && !isModifying) {
    return (
      <div className="flex space-x-2">
        {canModifyAssignment(user) && (
          <>
            <button
              onClick={() => setIsModifying(true)}
              className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <Edit2 className="w-4 h-4 mr-1" />
              Modify
            </button>
            <button
              onClick={() => onRemoveAssignment(train.id, train.platform!)}
              className="inline-flex items-center px-2 py-1 text-sm text-red-600 hover:text-red-800"
            >
              <X className="w-4 h-4 mr-1" />
              Remove
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <select
      className="text-sm border rounded px-2 py-1"
      onChange={(e) => {
        const newPlatform = Number(e.target.value);
        if (isModifying && train.platform) {
          onModifyAssignment(train.id, train.platform, newPlatform);
          setIsModifying(false);
        } else {
          onAssignPlatform(train.id, newPlatform);
        }
      }}
      defaultValue=""
    >
      <option value="" disabled>
        {isModifying ? 'Select New Platform' : 'Assign Platform'}
      </option>
      {[1, 2, 3, 4].map((num) => (
        <option key={num} value={num}>
          Platform {num}
        </option>
      ))}
    </select>
  );
};