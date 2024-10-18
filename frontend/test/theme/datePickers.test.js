import { datePickersCustomizations } from '../../src/theme/customizations/datePickers';

import { alpha } from '@mui/material/styles';
import { gray, brand } from '../../src/theme/themePrimitives';

jest.mock('@mui/x-date-pickers', () => ({
  pickersYearClasses: {
    selected: 'MuiPickersYear-selected',
  },
  pickersMonthClasses: {
    selected: 'MuiPickersMonth-selected',
  },
  pickersDayClasses: {
    selected: 'MuiPickersDay-selected',
  },
}));

jest.mock('@mui/material/MenuItem', () => ({
  menuItemClasses: {
    root: 'MuiMenuItem-root',
  },
}));

describe('datePickersCustomizations', () => {
  it('should have correct overrides for MuiPickersPopper paper', () => {
    const paperStyle = datePickersCustomizations.MuiPickersPopper.styleOverrides.paper({
      theme: {
        shape: { borderRadius: 4 },
        palette: {
          divider: '#ddd',
          grey: { 500: '#999' },
        },
        applyStyles: jest.fn((mode, styles) => styles),
      },
    });

    expect(paperStyle).toEqual({
      marginTop: 4,
      borderRadius: 4,
      border: '1px solid #ddd',
      backgroundImage: 'none',
      background: 'hsl(0, 0%, 100%)',
      boxShadow:
        'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
      '& .MuiMenuItem-root': {
        borderRadius: 6,
        margin: '0 6px',
      },
      // Apply dark mode styles (if applicable)
      background: gray[900],
      boxShadow:
        'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
    });
  });

  it('should have correct overrides for MuiPickersArrowSwitcher button', () => {
    const buttonStyle = datePickersCustomizations.MuiPickersArrowSwitcher.styleOverrides.button({
      theme: {
        palette: {
          grey: { 500: '#999' },
        },
        applyStyles: jest.fn((mode, styles) => styles),
      },
    });

    expect(buttonStyle).toEqual({
      backgroundColor: 'transparent',
      
      // Apply dark mode styles (if applicable)
      color: undefined,
    });
  });

  it('should have correct overrides for MuiPickersMonth monthButton', () => {
    const monthButtonStyle = datePickersCustomizations.MuiPickersMonth.styleOverrides.monthButton({
      theme: {
        typography: {
          body1: { fontSize: '16px' },
        },
        palette: {
          grey: { 600: '#666' },
          action: { hover: '#f0f0f0' },
        },
        shape: { borderRadius: 4 },
        spacing: (value) => `${value * 8}px`,
        applyStyles: jest.fn((mode, styles) => styles),
      },
    });

    expect(monthButtonStyle).toEqual({
      fontSize: '16px',
      color: '#666',
      padding: '4px',
      borderRadius: 4,
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
      '&.MuiPickersMonth-selected': {
        backgroundColor: gray[700],
        fontWeight: 'medium',
      },
      '&:focus': {
        outline: `3px solid ${alpha(brand[500], 0.5)}`,
        outlineOffset: '2px',
        backgroundColor: 'transparent',
        '&.MuiPickersMonth-selected': { backgroundColor: gray[700] },
      },
      // Apply dark mode styles (if applicable)
      color: '#ccc',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
      '&.MuiPickersMonth-selected': {
        color: '#000',
        fontWeight: 'medium',
        backgroundColor: gray[300],
      },
      '&:focus': {
        outline: `3px solid ${alpha(brand[500], 0.5)}`,
        outlineOffset: '2px',
        backgroundColor: 'transparent',
        '&.MuiPickersMonth-selected': { backgroundColor: gray[300] },
      },
    });
  });

  it('should have correct overrides for MuiPickersYear yearButton', () => {
    const yearButtonStyle = datePickersCustomizations.MuiPickersYear.styleOverrides.yearButton({
      theme: {
        typography: {
          body1: { fontSize: '16px' },
        },
        palette: {
          grey: { 600: '#666' },
          action: { hover: '#f0f0f0' },
        },
        shape: { borderRadius: 4 },
        applyStyles: jest.fn((mode, styles) => styles),
      },
    });

    expect(yearButtonStyle).toEqual({
      fontSize: '16px',
      color: '#666',
      padding: '4px',
      borderRadius: 4,
      height: 'fit-content',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
      '&.MuiPickersYear-selected': {
        backgroundColor: gray[700],
        fontWeight: 'medium',
      },
      '&:focus': {
        outline: `3px solid ${alpha(brand[500], 0.5)}`,
        outlineOffset: '2px',
        backgroundColor: 'transparent',
        '&.MuiPickersYear-selected': { backgroundColor: gray[700] },
      },
      // Apply dark mode styles (if applicable)
      color: '#ccc',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
      '&.MuiPickersYear-selected': {
        color: '#000',
        fontWeight: 'medium',
        backgroundColor: gray[300],
      },
      '&:focus': {
        outline: `3px solid ${alpha(brand[500], 0.5)}`,
        outlineOffset: '2px',
        backgroundColor: 'transparent',
        '&.MuiPickersYear-selected': { backgroundColor: gray[300] },
      },
    });
  });

  it('should have correct overrides for MuiPickersDay root', () => {
    const dayStyle = datePickersCustomizations.MuiPickersDay.styleOverrides.root({
      theme: {
        typography: {
          body1: { fontSize: '16px' },
        },
        palette: {
          grey: { 600: '#666' },
          action: { hover: '#f0f0f0' },
        },
        shape: { borderRadius: 4 },
        applyStyles: jest.fn((mode, styles) => styles),
      },
    });

    expect(dayStyle).toEqual({
      fontSize: '16px',
      color: '#666',
      padding: '4px',
      borderRadius: 4,
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
      '&.MuiPickersDay-selected': {
        backgroundColor: gray[700],
        fontWeight: 'medium',
      },
      '&:focus': {
        outline: `3px solid ${alpha(brand[500], 0.5)}`,
        outlineOffset: '2px',
        backgroundColor: 'transparent',
        '&.MuiPickersDay-selected': { backgroundColor: gray[700] },
      },
      // Apply dark mode styles (if applicable)
      color: '#ccc',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
      '&.MuiPickersDay-selected': {
        color: '#000',
        fontWeight: 'medium',
        backgroundColor: gray[300],
      },
      '&:focus': {
        outline: `3px solid ${alpha(brand[500], 0.5)}`,
        outlineOffset: '2px',
        backgroundColor: 'transparent',
        '&.MuiPickersDay-selected': { backgroundColor: gray[300] },
      },
    });
  });
});
