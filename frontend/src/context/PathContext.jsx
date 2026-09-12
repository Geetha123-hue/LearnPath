import React, { createContext, useState, useEffect } from 'react';
import { fetchAllPaths } from '../services/pathService';

export const PathContext = createContext();

export const PathProvider = ({ children }) => {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const refreshPaths = async () => {
    setLoading(true);
    try {
      const data = await fetchAllPaths();
      setPaths(data);
    } catch (err) {
      console.error('Failed to load learning paths:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPaths();
  }, []);

  const filteredPaths = selectedCategory === 'All'
    ? paths
    : paths.filter(p => p.category === selectedCategory);

  return (
    <PathContext.Provider value={{ paths: filteredPaths, allPaths: paths, loading, selectedCategory, setSelectedCategory, refreshPaths }}>
      {children}
    </PathContext.Provider>
  );
};
