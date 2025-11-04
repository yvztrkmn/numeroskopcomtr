import type { User } from '../types';

const USER_STORAGE_KEY = 'numeroskopUser';

/**
 * Retrieves the stored user from localStorage.
 * @returns A User object or null if not found.
 */
export const getUser = (): User | null => {
  try {
    const storedData = localStorage.getItem(USER_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("Error reading user from localStorage:", error);
    return null;
  }
};

/**
 * Saves a user to localStorage.
 * @param user The user object to save.
 */
export const saveUser = (user: User): void => {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user to localStorage:", error);
  }
};

/**
 * Deletes the user from localStorage.
 */
export const clearUser = (): void => {
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing user from localStorage:", error);
  }
};