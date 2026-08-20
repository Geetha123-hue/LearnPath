import { useContext } from 'react';
import { PathContext } from '../context/PathContext';

export const useFetchPaths = () => {
  const context = useContext(PathContext);
  if (!context) {
    throw new Error('useFetchPaths must be used within a PathProvider');
  }
  return context;
};
