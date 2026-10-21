/**
 * LearnMate Storage Utility
 * Handles persistence of student learning data using localStorage.
 */

const STORAGE_KEYS = {
  SESSIONS: 'learnmate_sessions',
  PROGRESS: 'learnmate_progress',
  USER_PROFILE: 'learnmate_user',
};

const STORAGE_CHANGE_EVENT = 'learnmate:storage-change';

function notifyStorageChange(key) {
  window.dispatchEvent(new CustomEvent(STORAGE_CHANGE_EVENT, { detail: { key } }));
}

function subscribeToKey(key, callback) {
  const handleStorage = (event) => {
    if (event.type === 'storage' && event.key !== key && event.key !== null) {
      return;
    }
    if (event.type === STORAGE_CHANGE_EVENT && event.detail?.key !== key) {
      return;
    }
    callback();
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener(STORAGE_CHANGE_EVENT, handleStorage);
  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(STORAGE_CHANGE_EVENT, handleStorage);
  };
}

export const storage = {
  subscribeToProfile: (callback) =>
    subscribeToKey(STORAGE_KEYS.USER_PROFILE, callback),
  getProfileSnapshot: () => localStorage.getItem(STORAGE_KEYS.USER_PROFILE),
  subscribeToProgress: (callback) =>
    subscribeToKey(STORAGE_KEYS.PROGRESS, callback),
  getProgressSnapshot: () => localStorage.getItem(STORAGE_KEYS.PROGRESS),

  // --- Session Management ---
  saveSession: (sessionId, data) => {
    const sessions = storage.getAllSessions();
    sessions[sessionId] = { ...sessions[sessionId], ...data, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  },

  getSession: (sessionId) => {
    const sessions = storage.getAllSessions();
    return sessions[sessionId] || null;
  },

  getAllSessions: () => {
    const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return data ? JSON.parse(data) : {};
  },

  // --- Progress Tracking ---
  saveProgress: (topic, score, subject) => {
    const progress = storage.getAllProgress();
    if (!progress[topic]) {
      progress[topic] = {
        subject,
        attempts: 0,
        bestScore: 0,
        lastScore: 0,
        completedAt: null,
      };
    }
    
    progress[topic].attempts += 1;
    progress[topic].lastScore = score;
    progress[topic].bestScore = Math.max(progress[topic].bestScore, score);
    progress[topic].completedAt = new Date().toISOString();
    
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
    notifyStorageChange(STORAGE_KEYS.PROGRESS);
  },

  getAllProgress: () => {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : {};
  },

  // --- Profile Management ---
  saveProfile: (profile) => {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    notifyStorageChange(STORAGE_KEYS.USER_PROFILE);
  },

  getProfile: () => {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : { name: 'Learner', grade: 'Grade 9' };
  },

  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
      notifyStorageChange(key);
    });
  }
};
