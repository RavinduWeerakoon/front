import React from 'react';
import { render, screen, fireEvent, waitFor , act} from '@testing-library/react';
import { MemoryRouter} from 'react-router-dom';
import SignIn from '../../src/Pages/login/SignIn';
import { useDispatch , useSelector} from 'react-redux';
import { loginSuccess, loginFailure } from '../../src/store/authSlice';
import {signIn, getUser} from '../../src/services/authService';

jest.mock('../../src/services/authService', () => ({
    signIn: jest.fn(),
    getUser: jest.fn(),
  }));

jest.mock('../../src/store/authSlice', () => ({
    loginSuccess: jest.fn(),
    loginFailure: jest.fn(),
  }));

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }));

  describe('SignIn Component', () => {
    let dispatchMock;
    beforeAll(() => {
        window.matchMedia = jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // optional
            removeListener: jest.fn(), // optional
            addEventListener: jest.fn(), // optional
            removeEventListener: jest.fn(), // optional
            dispatchEvent: jest.fn(), // optional
        }));
    });
    
  
    beforeEach(() => {
      dispatchMock = jest.fn();
      useDispatch.mockReturnValue(dispatchMock);
      
      useSelector.mockImplementation((selector) => selector({
        auth: {
          email: null,
          uid: null,
          displayName: null,
          role: null,
          error: null,
        },
      }));
    });
  
    afterEach(() => {
      jest.clearAllMocks(); // Clears any previous mock calls between tests
    });
  
    it('renders SignIn form with all elements', () => {
      render(
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      );
  
      expect(screen.getByPlaceholderText(/your@email.com/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/••••••/i)).toBeInTheDocument();
      expect(screen.getByTitle(/signIn/i)).toBeInTheDocument();
      expect(screen.getByText(/forgot your password/i)).toBeInTheDocument();
    });
  
    test('displays error message when email or password is missing', async () => {
      render(
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      );
  
      await act(async () => {
        fireEvent.click(screen.getByTitle(/signIn/i));
      });
  
      expect(screen.getByText('Email and password are required')).toBeInTheDocument();
    });
  
    test('dispatches loginSuccess on successful login', async () => {
      const mockUser = {
        uid: 'user123',
        email: 'test@test.com',
      };
  
      signIn.mockResolvedValue(mockUser);
      getUser.mockResolvedValue({ role: 'user', displayName: 'Test User' });
  
      render(
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      );
  
      await act(async () => {
        fireEvent.change(screen.getByPlaceholderText(/your@email.com/i), {
          target: { value: 'test@test.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/••••••/i), {
          target: { value: 'password' },
        });
  
        fireEvent.click(screen.getByTitle(/signIn/i));
      });
  
      await waitFor(() => {
        expect(loginSuccess).toHaveBeenCalledWith({
          email: 'test@test.com',
          uid: 'user123',
          displayName: 'Test User',
          role: 'user',
        });
        expect(dispatchMock).toHaveBeenCalled();
      });
    });
  
    test('dispatches loginFailure on failed login', async () => {
      signIn.mockResolvedValue({ success: false, message: 'Invalid credentials' });
  
      render(
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      );
  
      await act(async () => {
        fireEvent.change(screen.getByPlaceholderText(/your@email.com/i), {
          target: { value: 'wrong@test.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/••••••/i), {
          target: { value: 'wrongpassword' },
        });
  
        fireEvent.click(screen.getByTitle(/signIn/i));
      });
  
      await waitFor(() => {
        
        expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
     
      });
    });
  });