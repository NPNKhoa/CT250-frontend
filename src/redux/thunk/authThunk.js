import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '@services/auth.service';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);

      // Lưu access token và refresh token vào localStorage
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// export const logoutThunk = createAsyncThunk(
//   'auth/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await authService.logout();

//       if (response.status === 204) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('refreshToken');
//         return response;
//       } else {
//         throw new Error('Logout failed!');
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.error || 'Logout failed!');
//     }
//   }
// );