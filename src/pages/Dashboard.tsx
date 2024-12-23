import React from 'react';
import { Header } from '../components/Header';
import { PlatformStatus } from '../components/platform/PlatformStatus';
import { TrainList } from '../components/train/TrainList';
import { AssignmentHistory } from '../components/dashboard/AssignmentHistory';
import { useAuthStore } from '../store/authStore';
import { useTrainStore } from '../store/trainStore';
import { LogOut } from 'lucide-react';

export const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const {
    trains,
    platforms,
    assignPlatform,
    updateTrainStatus,
    removePlatformAssignment,
    modifyPlatformAssignment,
  } = useTrainStore();

  const handleAssignPlatform = (trainId: string, platformNumber: number) => {
    if (user) {
      assignPlatform(trainId, platformNumber, user.id);
    }
  };

  const handleModifyAssignment = (
    trainId: string,
    oldPlatformNumber: number,
    newPlatformNumber: number
  ) => {
    if (user) {
      modifyPlatformAssignment(trainId, oldPlatformNumber, newPlatformNumber, user.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {user?.username} ({user?.role})
            </p>
          </div>
          <button
            onClick={logout}
            className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-800"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Platform Status</h2>
              <PlatformStatus platforms={platforms} trains={trains} />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Train Schedule</h2>
              <TrainList
                trains={trains}
                user={user}
                onAssignPlatform={handleAssignPlatform}
                onRemoveAssignment={removePlatformAssignment}
                onModifyAssignment={handleModifyAssignment}
                onUpdateStatus={updateTrainStatus}
              />
            </section>
          </div>

          <div className="lg:col-span-1">
            <AssignmentHistory />
          </div>
        </div>
      </main>
    </div>
  );
};