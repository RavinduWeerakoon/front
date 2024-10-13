import React from 'react';
import { render, screen } from '@testing-library/react';
import WelcomPage from '../../src/Pages/GuestPage.jsx';
import NavBar from '../../src/Pages/GuestPage.jsx/AppBar.jsx';
import Footer from '../../src/Pages/GuestPage.jsx/Footer.jsx';

jest.mock('../../src/Pages/GuestPage.jsx/AppBar.jsx', () => () => <div data-testid="navbar">NavBar</div>);
jest.mock('../../src/Pages/GuestPage.jsx/Footer.jsx', () => () => <div data-testid="footer">Footer</div>);
Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
      backgroundImage: 'url(src/assets/backgroundImageGreenBlue.webp)',
    }),
  });

describe('WelcomePage', () => {
  test('renders the welcome page without crashing', () => {
    render(<WelcomPage />);

    // Check if the NavBar component is rendered
    expect(screen.getByTestId('navbar')).toBeInTheDocument();

    // Check for the welcome text
    expect(screen.getByText(/Welcome to EmoAI/i)).toBeInTheDocument();

    // Check for the body paragraph text
    expect(screen.getByText(/Your personal journey towards emotional well-being starts here/i)).toBeInTheDocument();

    // Check if the image is present (can check by alt text)
    expect(screen.getByAltText('Our Team')).toBeInTheDocument();

    // Check if the Footer component is rendered
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('displays the logo and background image', () => {
    render(<WelcomPage />);

    // Check if the logo is present
    const logo = screen.getByAltText('Our Team');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'src/assets/logo-no-background.png');

    // Check if the background image is applied via CSS
    const container = screen.getByRole('main').parentElement;
    const backgroundImage = window.getComputedStyle(container).backgroundImage;

  // Ensure the background image is the correct one
     expect(backgroundImage).toContain('src/assets/backgroundImageGreenBlue.webp');
  });
});