import { writable } from 'svelte/store';

// Get the boards from local storage
const storedData = localStorage.getItem('boards');

// Initialize the boards store with the stored data or null
export const boards = writable(storedData !== undefined ? JSON.parse(storedData) : null);

// Subscribe to the changes in the boards store
boards.subscribe(value => {
  // Update the local storage with the new value of the boards store
  localStorage.setItem('boards', JSON.stringify(value));
});