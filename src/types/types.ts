export interface User {
  id: string;
  username: string;
  role: 'ADMIN' | 'OPERATOR';
}

export interface Train {
  id: string;
  name: string;
  number: string;
  arrival: string;
  departure: string;
  platform: number | null;
  status: 'ON_TIME' | 'DELAYED' | 'ARRIVED' | 'DEPARTED';
  type: 'EXPRESS' | 'LOCAL' | 'SUPERFAST';
}

export interface Platform {
  number: number;
  isOccupied: boolean;
  currentTrain: string | null;
  type: 'MAIN' | 'SUBURBAN';
}

export interface Assignment {
  id: string;
  trainId: string;
  platformId: number;
  assignedAt: string;
  assignedBy: string;
}