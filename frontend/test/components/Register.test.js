import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Register from '../../src/components/auth/Register';
import { signUp } from '../../src/services/authService';
import { MemoryRouter } from 'react-router-dom';
import { act } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

jest.mock('../../src/services/authService', () => ({
    signUp: jest.fn(),
  }));

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

  describe('Register Component', () => {
    const mockNavigate = jest.fn();
    
    beforeEach(() => {
      useNavigate.mockReturnValue(mockNavigate);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('renders form elements correctly', () => {
      render(
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      );
  
      expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/confirm/i)).toBeInTheDocument();
      expect(screen.getByTestId(/register/i)).toBeInTheDocument();
    });
  
    test('displays validation errors when required fields are empty', async () => {
      render(
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      );
  
      await act(async () => {
        fireEvent.click(screen.getByTestId(/register/i));
      });
  
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      expect(screen.getByText(/confirm your password/i)).toBeInTheDocument();
    });
  
    // test('displays error when passwords do not match', async () => {
    //   render(
    //     <MemoryRouter>
    //       <Register />
    //     </MemoryRouter>
    //   );
  
    //   await act(async () => {
    //     fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password1' } });
    //     fireEvent.change(screen.getByPlaceholderText(/confirm/i), { target: { value: 'password2' } });
    //     fireEvent.click(screen.getByTestId(/register/i));
    //   });
  
    //   const errorMessageElement = await screen.findByText(/Passwords do not match/i);
    //   expect(errorMessageElement).toBeInTheDocument();
    // });
  
    test('calls signUp service and navigates on successful registration', async () => {
      signUp.mockResolvedValue({ success: true, user: { email: 'test@example.com' } });
  
      render(
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      );
  
      await act(async () => {
        fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText(/confirm/i), { target: { value: 'password123' } });
  
        fireEvent.click(screen.getByTestId(/register/i));
      });
  
      await waitFor(() => {
        expect(signUp).toHaveBeenCalledWith('test@example.com', 'password123', 'Test User', 'user');
        expect(mockNavigate).toHaveBeenCalledWith('/signin');
      });
    });
  
    test('shows error message when sign up fails', async () => {
      signUp.mockResolvedValue({ success: false, message: 'Signup failed' });
  
      render(
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      );
  
      await act(async () => {
        fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText(/confirm/i), { target: { value: 'password123' } });
  
        fireEvent.click(screen.getByTestId(/register/i));
      });
  
      await waitFor(() => {
        expect(signUp).toHaveBeenCalledWith('test@example.com', 'password123', 'Test User', 'user');
        expect(screen.getByText(/Signup failed/i)).toBeInTheDocument();
      });
    });
  
    test('toggles password visibility', async () => {
      render(
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      );
  
      const passwordField = screen.getByPlaceholderText(/password/i);
      const toggleButton = screen.getByLabelText(/toggle password visibility/i);
  
      expect(passwordField.type).toBe('password');
  
      await act(async () => {
        fireEvent.click(toggleButton);
      });
      expect(passwordField.type).toBe('text');
  
      await act(async () => {
        fireEvent.click(toggleButton);
      });
      expect(passwordField.type).toBe('password');
    });
  });