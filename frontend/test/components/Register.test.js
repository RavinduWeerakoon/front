import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Register from '../../src/components/auth/Register';
import { signUp } from '../../src/services/authService';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../src/services/authService', () => ({
    signUp: jest.fn(),
  }));

