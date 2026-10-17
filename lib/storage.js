/**
 * LearnMate Storage Utility
 * Handles persistence of student learning data using localStorage.
 */

const STORAGE_KEYS = {
  SESSIONS: 'learnmate_sessions',
  PROGRESS: 'learnmate_progress',
  USER_PROFILE: 'learnmate_user',
};

export const storage = {
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
  },

  getAllProgress: () => {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : {};
  },

  // --- Profile Management ---
  saveProfile: (profile) => {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  getProfile: () => {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : { name: 'Learner', grade: 'Grade 9' };
  },

  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  }
};
