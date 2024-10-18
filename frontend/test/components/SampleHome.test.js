// Import necessary libraries
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SampleHome from '../../src/components/basic/sampleHome'; // Assuming this is the correct path
import * as journalService from '../../src/services/journalService';
import { useSelector, useDispatch } from 'react-redux';
import { act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
// Mock the journalService
jest.mock('../../src/services/journalService', () => ({
  getJournals: jest.fn(),
}));

// Mock react-redux
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('SampleHome Component', () => {
  let mockDispatch;

  beforeEach(() => {
    // Mock useDispatch
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    // Mock the initial state returned by useSelector
    useSelector.mockImplementation((callback) => {
      return callback({
        auth: {
          uid: 'test-user-id', // Assuming the user id is stored in the auth slice of state
          role: 'user', // Assuming there's a role in the state, modify according to your actual state structure
        },
      });
    });
  });

  afterEach(() => {
    // Clear all mocks after each test to prevent state leakage between tests
    jest.clearAllMocks();
  });

  test('fetches and displays journal entries', async () => {
    // Arrange: Mock the expected response from getJournals
    const mockJournals = [
      { id: '1', date: '2024-10-10', text: 'First journal entry', emotion: 'happy' },
      { id: '2', date: '2024-10-11', text: 'Second journal entry', emotion: 'sad' },
    ];

    // Set the mock return value for the getJournals function
    journalService.getJournals.mockResolvedValue(mockJournals);

    // Act: Render the component
    await act(async () => {
        
        render(
        <MemoryRouter>
        <SampleHome />
        </MemoryRouter>
        );
      });

    // Assert: Check that journal entries are fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('First journal entry')).toBeInTheDocument();
      expect(screen.getByText('Second journal entry')).toBeInTheDocument();
    });
  });

  test('displays an empty state if no journals are returned', async () => {
    // Arrange: Mock an empty response from the API
    journalService.getJournals.mockResolvedValue([]);

    // Act: Render the component
    await act(async () => {
        
      render(
      <MemoryRouter>
      <SampleHome />
      </MemoryRouter>
      );
    });

    // Assert: Check that an empty state is displayed
    await waitFor(() => {
      expect(screen.getByText('No journal entries found')).toBeInTheDocument(); // Assuming this is the empty state message
    });
  });

  test('handles API errors gracefully', async () => {
    // Arrange: Mock an error response from the API
    journalService.getJournals.mockRejectedValue(new Error('Failed to fetch journal entries'));

    // Act: Render the component
    await act(async () => {
        
      render(
      <MemoryRouter>
      <SampleHome />
      </MemoryRouter>
      );
    });
    // Assert: Check that the error is handled and displayed
    await waitFor(() => {
      expect(screen.getByText('Error fetching journal entries')).toBeInTheDocument(); // Assuming this is the error message
    });
  });
});
