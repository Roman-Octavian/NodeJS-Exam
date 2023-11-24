import { writable } from 'svelte/store';

const storedData = localStorage.getItem('user');

export const user = writable(storedData !== undefined ? JSON.parse(storedData) : null);
user.subscribe(value => {
  localStorage.setItem('user', JSON.stringify(value));
});