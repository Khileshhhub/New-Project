import { Train, Platform, Assignment } from '../types/types';

export const initialTrains: Train[] = [
  {
    id: '1',
    name: 'Express Mail',
    number: 'EM1234',
    arrival: '10:00',
    departure: '10:15',
    platform: 1,
    status: 'ON_TIME',
    type: 'EXPRESS',
  },
  {
    id: '2',
    name: 'Superfast Express',
    number: 'SF5678',
    arrival: '10:30',
    departure: '10:45',
    platform: 2,
    status: 'DELAYED',
    type: 'SUPERFAST',
  },
  {
    id: '3',
    name: 'Regional Fast',
    number: 'RF9012',
    arrival: '11:00',
    departure: '11:20',
    platform: null,
    status: 'ON_TIME',
    type: 'LOCAL',
  },
];

export const initialPlatforms: Platform[] = [
  { number: 1, isOccupied: true, currentTrain: '1', type: 'MAIN' },
  { number: 2, isOccupied: true, currentTrain: '2', type: 'MAIN' },
  { number: 3, isOccupied: false, currentTrain: null, type: 'MAIN' },
  { number: 4, isOccupied: false, currentTrain: null, type: 'SUBURBAN' },
];

export const initialAssignments: Assignment[] = [];