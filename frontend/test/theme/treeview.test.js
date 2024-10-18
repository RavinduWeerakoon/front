jest.mock('@mui/x-charts', () => ({
    axisClasses: {},
    legendClasses: {},
    chartsGridClasses: {},
  }));

jest.mock('@mui/x-data-grid', () => ({
    gridClasses: {},
    
  }));

jest.mock('@mui/x-date-pickers', () => ({
    pickersYearClasses:{},
    pickersMonthClasses:{},
    pickersDayClasses:{},
  }));
import { treeViewCustomizations } from "../../src/theme/customizations";
import { alpha } from '@mui/material/styles';
import { gray, brand } from '../../src/theme/themePrimitives';

jest.mock('@mui/material/styles', () => ({
    alpha: jest.fn((color, value) => `${color}-alpha-${value}`), // Mock implementation of alpha function
  }));
  
  jest.mock('../../src/theme/themePrimitives', () => ({
    gray: { 300: '#ccc', 500: '#999' },
    brand: { 500: '#007B8F' },
  }));
  
  describe('treeViewCustomizations', () => {
    it('should have correct styleOverrides for MuiTreeItem2 root', () => {
      const theme = {
        spacing: jest.fn((value) => value * 8),
        palette: { divider: '#ccc' },
      };
  
      const rootStyles = treeViewCustomizations.MuiTreeItem2.styleOverrides.root({ theme });
  
      expect(rootStyles).toEqual(expect.objectContaining({
        position: 'relative',
        boxSizing: 'border-box',
        padding: theme.spacing(0, 1),
        '& .groupTransition': {
          marginLeft: theme.spacing(2),
          padding: theme.spacing(0),
          borderLeft: '1px solid',
          borderColor: theme.palette.divider,
        },
        '&:focus-visible .focused': {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: '2px',
          '&:hover': {
            backgroundColor: `${gray[300]}-alpha-0.2`,
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: '2px',
          },
        },
      }));
  
      // Ensure that theme.spacing was called with correct parameters
      expect(theme.spacing).toHaveBeenCalledWith(0, 1);
      expect(theme.spacing).toHaveBeenCalledWith(2);
  
      // Ensure alpha function was called correctly
      expect(alpha).toHaveBeenCalledWith(brand[500], 0.5);
      expect(alpha).toHaveBeenCalledWith(gray[300], 0.2);
    });
  
    it('should have correct styleOverrides for MuiTreeItem2 content', () => {
      const theme = {
        spacing: jest.fn((value) => value * 8),
        applyStyles: jest.fn((mode, styles) => (mode === 'dark' ? styles : {})),
      };
  
      const contentStyles = treeViewCustomizations.MuiTreeItem2.styleOverrides.content({ theme });
  
      expect(contentStyles).toEqual(expect.objectContaining({
        marginTop: 8,
        padding: 4,
        overflow: 'clip',
        '&:hover': {
          backgroundColor: "#999-alpha-0.2",
        },
        '&.selected': {
          backgroundColor: "#999-alpha-0.4",
          '&:hover': {
            backgroundColor: "#999-alpha-0.6",
          },
          

        },
        "&:focus-visible":{
            "&:hover":{
              backgroundColor: "#999-alpha-0.2",
            }

          }
      }));
  
      expect(theme.applyStyles).toHaveBeenCalledWith('dark', expect.objectContaining({
        '&:hover': {
          backgroundColor: `${gray[500]}-alpha-0.2`,
        },
        '&.selected': {
          backgroundColor: `${gray[500]}-alpha-0.4`,
          '&:hover': {
            backgroundColor: `${gray[500]}-alpha-0.6`,
          },
        },
      }));
    });
    



  });