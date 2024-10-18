import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Sidebar from '../../src/Pages/UserDashboard/Sidebar';
import { MemoryRouter } from 'react-router-dom';

describe('Sidebar Component', () => {
    test('renders the title', async () => {
      await act(async () => {
        render(
          <MemoryRouter>
            <Sidebar />
          </MemoryRouter>
        );
      });
      
      const titleElement = screen.getByText(/EmoAI/i);
      expect(titleElement).toBeInTheDocument();
    });
  
    test('renders the correct number of links', async () => {
      await act(async () => {
        render(
          <MemoryRouter>
            <Sidebar />
          </MemoryRouter>
        );
      });
      
      const listItemElements = screen.getAllByRole('listitem');
      expect(listItemElements.length).toBe(2); // Since the `links` array has 2 items
    });
  
    test('renders the Home link with icon', async () => {
      await act(async () => {
        render(
          <MemoryRouter>
            <Sidebar />
          </MemoryRouter>
        );
      });
  
      const homeLink = screen.getByText(/Home/i);
      expect(homeLink).toBeInTheDocument();
      
      const homeIcon = screen.getByTestId('HomeIcon');
      expect(homeIcon).toBeInTheDocument();
    });
  
    test('renders the New link with icon', async () => {
      await act(async () => {
        render(
          <MemoryRouter>
            <Sidebar />
          </MemoryRouter>
        );
      });
  
      const newLink = screen.getByText(/New/i);
      expect(newLink).toBeInTheDocument();
      
      const newIcon = screen.getByTestId('NewIcon');
      expect(newIcon).toBeInTheDocument();
    });
  
    test('renders links with the correct "to" attribute', async () => {
      await act(async () => {
        render(
          <MemoryRouter>
            <Sidebar />
          </MemoryRouter>
        );
      });
      
      const homeLink = screen.getByRole('button', { name: /Home/i });
      const newLink = screen.getByRole('link', { name: /New/i });
      
      expect(homeLink).toHaveAttribute('href', '/');
      expect(newLink).toHaveAttribute('href', '/new');
    });
  });