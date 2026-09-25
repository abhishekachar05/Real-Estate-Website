// Configuration constants
export const backendurl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

// API endpoints
export const API_ENDPOINTS = {
  login: '/api/users/admin',
  properties: '/api/products',
  appointments: '/api/appointments',
  users: '/api/users',
  admin: '/api/admin'
};

// App constants
export const APP_CONSTANTS = {
  TOKEN_KEY: 'token',
  IS_ADMIN_KEY: 'isAdmin',
  DEFAULT_TOAST_DURATION: 3000
};
