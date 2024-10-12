import React from "react"; // <-- Add this line
import { render, screen, fireEvent } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { act } from '@testing-library/react';

import JournalEntry from "../../src/components/basic/ListEntry";
describe('JournalEntry Component', () => {
    test('renders the date and text passed as props', () => {
      // Arrange: Pass test date and text props
      const testDate = 'October 12, 2024';
      const testText = 'Today was a great day. I learned a lot about testing in React!';
  
      // Act: Render the component
      render(<JournalEntry date={testDate} text={testText} />);
  
      // Assert: Check if the date and text are rendered on the screen
      const dateElement = screen.getByText(testDate);
      const textElement = screen.getByText(testText);
  
      expect(dateElement).toBeInTheDocument();
      expect(textElement).toBeInTheDocument();
    });
  
    test('applies correct styles to date and text', () => {
      // Arrange: Pass test date and text props
      const testDate = 'October 12, 2024';
      const testText = 'Testing styles with React Testing Library.';
  
      // Act: Render the component
      render(<JournalEntry date={testDate} text={testText} />);
  
      // Assert: Verify styles applied to the date
      const dateElement = screen.getByText(testDate);
      expect(dateElement).toHaveStyle('color: #007B8F');
      expect(dateElement).toHaveStyle('font-weight: bold');
  
      // Assert: Verify styles applied to the text
      const textElement = screen.getByText(testText);
      expect(textElement).toHaveStyle('color: #5A6F72');
      expect(textElement).toHaveStyle('margin-top: 8px');
    });
  });