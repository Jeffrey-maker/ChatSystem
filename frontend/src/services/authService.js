import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/';

export const register = async (username, email, password) => {
    const response = await axios.post(`${API_URL}register`, {
        username,
        email,
        password,
    });
    if (response.data.userId) {
        localStorage.setItem('userId', response.data.userId); // Store the userId in local storage
    }
    return response.data;
};

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}login`, {
        email,
        password,
    });
    if (response.data.userId) {
        localStorage.setItem('userId', response.data.userId); // Store the userId in local storage
    }
    if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Store the token in local storage
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('userId'); // Remove the userId from local storage on logout
    localStorage.removeItem('token'); // Remove the token from local storage on logout

};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};