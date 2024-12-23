import { User } from '../types/types';

export const canModifyAssignment = (user: User | null): boolean => {
  return user?.role === 'ADMIN';
};

export const canAssignPlatform = (user: User | null): boolean => {
  return user?.role === 'ADMIN' || user?.role === 'OPERATOR';
};