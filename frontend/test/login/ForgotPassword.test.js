import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ForgotPassword from '../../src/Pages/login/ForgotPassword';


describe('ForgotPassword Component', () => {

    const handleClose = jest.fn();
  
    test('renders the dialog when "open" is true', () => {
      render(<ForgotPassword open={true} handleClose={handleClose} />);
  
      // Check if the dialog and its content are rendered
      expect(screen.getByText('Reset password')).toBeInTheDocument();
      expect(
        screen.getByText(
          "Enter your account's email address, and we'll send you a link to reset your password."
        )
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    });
  
    test('does not render the dialog when "open" is false', () => {
      const { queryByText } = render(<ForgotPassword open={false} handleClose={handleClose} />);
  
      // Check that the dialog is not rendered
      expect(queryByText('Reset password')).toBeNull();
    });
  
    test('calls handleClose when "Cancel" button is clicked', () => {
      render(<ForgotPassword open={true} handleClose={handleClose} />);
  
      // Click the "Cancel" button
      fireEvent.click(screen.getByText('Cancel'));
  
      // Verify handleClose was called
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  
    // test('calls handleClose on form submit', () => {
    //   render(<ForgotPassword open={true} handleClose={handleClose} />);
  
    //   // Fill in the email input
    //   fireEvent.change(screen.getByPlaceholderText('Email address'), {
    //     target: { value: 'test@example.com' },
    //   });
  
    //   // Submit the form
    //   fireEvent.submit(screen.getByRole('button', { name: /continue/i }));
  
    //   // Verify handleClose is called when form is submitted
    //   expect(handleClose).toHaveBeenCalledTimes(1);
    // });
  
    test('requires email input', () => {
      render(<ForgotPassword open={true} handleClose={handleClose} />);
  
      // Ensure that the email input has the "required" attribute
      expect(screen.getByPlaceholderText('Email address')).toBeRequired();
    });
  });