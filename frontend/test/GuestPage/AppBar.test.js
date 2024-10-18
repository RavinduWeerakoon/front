import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../../src/Pages/GuestPage.jsx/AppBar';

describe('NavBar Component', () => {
    test('renders the logo image', () => {
      render(
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      );
  
      // Check if the logo image is present
      const logo = screen.getByAltText('App Logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', 'src/assets/logo-no-background.png');
    });
  
    test('renders SignIn, Register, and Contact buttons', () => {
      render(
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      );
  
      // Check if the "SignIn" button is rendered and links correctly
      const signInButton = screen.getByRole('link', { name: /signin/i });
      expect(signInButton).toBeInTheDocument();
      expect(signInButton).toHaveAttribute('href', '/signin');
  
      // Check if the "Register" button is rendered and links correctly
      const registerButton = screen.getByRole('link', { name: /register/i });
      expect(registerButton).toBeInTheDocument();
      expect(registerButton).toHaveAttribute('href', '/register');
  
      // Check if the "Contact" button is rendered
      const contactButton = screen.getByRole('button', { name: /contact/i });
      expect(contactButton).toBeInTheDocument();
    });
  
    test('ensures proper navigation links are in place', () => {
      render(
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      );
  
      // Check if the buttons contain the correct navigation links
      const signInLink = screen.getByRole('link', { name: /signin/i });
      expect(signInLink).toHaveAttribute('href', '/signin');
  
      const registerLink = screen.getByRole('link', { name: /register/i });
      expect(registerLink).toHaveAttribute('href', '/register');
    });
  });
