import { create } from 'zustand';
import { Train, Platform, Assignment } from '../types/types';
import { initialTrains, initialPlatforms, initialAssignments } from '../data/initialData';
import { toast } from 'react-hot-toast';

interface TrainState {
  trains: Train[];
  platforms: Platform[];
  assignments: Assignment[];
  assignPlatform: (trainId: string, platformNumber: number, userId: string) => void;
  updateTrainStatus: (trainId: string, status: Train['status']) => void;
  removePlatformAssignment: (trainId: string, platformNumber: number) => void;
  modifyPlatformAssignment: (
    trainId: string,
    oldPlatformNumber: number,
    newPlatformNumber: number,
    userId: string
  ) => void;
}

export const useTrainStore = create<TrainState>((set) => ({
  trains: initialTrains,
  platforms: initialPlatforms,
  assignments: initialAssignments,

  assignPlatform: (trainId: string, platformNumber: number, userId: string) =>
    set((state) => {
      // Check if platform is already occupied
      const isPlatformOccupied = state.platforms.find(
        (p) => p.number === platformNumber && p.isOccupied
      );

      if (isPlatformOccupied) {
        toast.error('Platform is already occupied');
        return state;
      }

      const newAssignment: Assignment = {
        id: Date.now().toString(),
        trainId,
        platformId: platformNumber,
        assignedAt: new Date().toISOString(),
        assignedBy: userId,
      };

      toast.success('Platform assigned successfully');

      return {
        trains: state.trains.map((train) =>
          train.id === trainId ? { ...train, platform: platformNumber } : train
        ),
        platforms: state.platforms.map((platform) =>
          platform.number === platformNumber
            ? { ...platform, isOccupied: true, currentTrain: trainId }
            : platform
        ),
        assignments: [newAssignment, ...state.assignments],
      };
    }),

  updateTrainStatus: (trainId: string, status: Train['status']) =>
    set((state) => {
      toast.success(`Train status updated to ${status}`);
      return {
        ...state,
        trains: state.trains.map((train) =>
          train.id === trainId ? { ...train, status } : train
        ),
      };
    }),

  removePlatformAssignment: (trainId: string, platformNumber: number) =>
    set((state) => {
      toast.success('Platform assignment removed');
      return {
        ...state,
        trains: state.trains.map((train) =>
          train.id === trainId ? { ...train, platform: null } : train
        ),
        platforms: state.platforms.map((platform) =>
          platform.number === platformNumber
            ? { ...platform, isOccupied: false, currentTrain: null }
            : platform
        ),
        assignments: state.assignments.filter(
          (a) => !(a.trainId === trainId && a.platformId === platformNumber)
        ),
      };
    }),

  modifyPlatformAssignment: (
    trainId: string,
    oldPlatformNumber: number,
    newPlatformNumber: number,
    userId: string
  ) =>
    set((state) => {
      // Check if new platform is already occupied
      const isNewPlatformOccupied = state.platforms.find(
        (p) => p.number === newPlatformNumber && p.isOccupied
      );

      if (isNewPlatformOccupied) {
        toast.error('New platform is already occupied');
        return state;
      }

      const newAssignment: Assignment = {
        id: Date.now().toString(),
        trainId,
        platformId: newPlatformNumber,
        assignedAt: new Date().toISOString(),
        assignedBy: userId,
      };

      toast.success('Platform assignment modified successfully');

      return {
        ...state,
        trains: state.trains.map((train) =>
          train.id === trainId ? { ...train, platform: newPlatformNumber } : train
        ),
        platforms: state.platforms.map((platform) => {
          if (platform.number === oldPlatformNumber) {
            return { ...platform, isOccupied: false, currentTrain: null };
          }
          if (platform.number === newPlatformNumber) {
            return { ...platform, isOccupied: true, currentTrain: trainId };
          }
          return platform;
        }),
        assignments: [newAssignment, ...state.assignments],
      };
    }),
}));