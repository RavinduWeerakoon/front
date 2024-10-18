import { dataGridCustomizations } from '../../src/theme/customizations/dataGrid';
import { gridClasses } from '@mui/x-data-grid';
import { checkboxClasses } from '@mui/material/Checkbox';
import { tablePaginationClasses } from '@mui/material/TablePagination';
import { iconButtonClasses } from '@mui/material/IconButton';
import { paperClasses } from '@mui/material/Paper';
import { menuItemClasses } from '@mui/material/MenuItem';
import { listItemIconClasses } from '@mui/material/ListItemIcon';
import { listClasses } from '@mui/material/List';

jest.mock('@mui/x-data-grid', () => ({
  gridClasses: {
    columnHeader: 'MuiDataGrid-columnHeader',
    footerContainer: 'MuiDataGrid-footerContainer',
  },
}));

jest.mock('@mui/material/Checkbox', () => ({
  checkboxClasses: {
    root: 'MuiCheckbox-root',
  },
}));

jest.mock('@mui/material/TablePagination', () => ({
  tablePaginationClasses: {
    root: 'MuiTablePagination-root',
  },
}));

jest.mock('@mui/material/IconButton', () => ({
  iconButtonClasses: {
    root: 'MuiIconButton-root',
  },
}));

jest.mock('@mui/material/Paper', () => ({
  paperClasses: {
    root: 'MuiPaper-root',
  },
}));

jest.mock('@mui/material/MenuItem', () => ({
  menuItemClasses: {
    root: 'MuiMenuItem-root',
  },
}));

jest.mock('@mui/material/ListItemIcon', () => ({
  listItemIconClasses: {
    root: 'MuiListItemIcon-root',
  },
}));

jest.mock('@mui/material/List', () => ({
  listClasses: {
    root: 'MuiList-root',
  },
}));

describe('dataGridCustomizations', () => {
  it('should have correct overrides for MuiDataGrid root', () => {
    const rootStyle = dataGridCustomizations.MuiDataGrid.styleOverrides.root({ theme: { palette: { divider: '#000', background: { default: '#fff', paper: '#fafafa' } }, spacing: (value) => `${value * 8}px` } });
    
    expect(rootStyle).toEqual({
      '--DataGrid-overlayHeight': '300px',
      overflow: 'clip',
      borderColor: '#000',
      backgroundColor: '#fff',
      '& .MuiDataGrid-columnHeader': {
        backgroundColor: '#fafafa',
      },
      '& .MuiDataGrid-footerContainer': {
        backgroundColor: '#fafafa',
      },
      '& .MuiCheckbox-root': {
        padding: '4px',
        '& > svg': {
          fontSize: '1rem',
        },
      },
      '& .MuiTablePagination-root': {
        marginRight: '8px',
        '& .MuiIconButton-root': {
          maxHeight: 32,
          maxWidth: 32,
          '& > svg': {
            fontSize: '1rem',
          },
        },
      },
    });
  });

  it('should have correct overrides for MuiDataGrid menu', () => {
    const menuStyle = dataGridCustomizations.MuiDataGrid.styleOverrides.menu({ theme: { shape: { borderRadius: '4px' }, palette: { divider: '#ddd' } } });
    
    expect(menuStyle).toEqual({
      borderRadius: '4px',
      backgroundImage: 'none',
      '& .MuiPaper-root': {
        border: '1px solid #ddd',
      },
      '& .MuiMenuItem-root': {
        margin: '0 4px',
      },
      '& .MuiListItemIcon-root': {
        marginRight: 0,
      },
      '& .MuiList-root': {
        paddingLeft: 0,
        paddingRight: 0,
      },
    });
  });

  it('should have correct overrides for MuiDataGrid row hover and selection styles', () => {
    const rowStyle = dataGridCustomizations.MuiDataGrid.styleOverrides.row({ theme: { palette: { divider: '#ddd', action: { hover: '#f5f5f5', selected: '#e0e0e0' } } } });
    
    expect(rowStyle).toEqual({
      '&:last-of-type': { borderBottom: '1px solid #ddd' },
      '&:hover': {
        backgroundColor: '#f5f5f5',
      },
      '&.Mui-selected': {
        background: '#e0e0e0',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      },
    });
  });

  it('should apply correct iconButtonContainer styles', () => {
    const iconButtonContainerStyle = dataGridCustomizations.MuiDataGrid.styleOverrides.iconButtonContainer({ theme: { palette: { action: { selected: '#ccc' }, background: { default: '#fff' } }, applyStyles: jest.fn() } });

    expect(iconButtonContainerStyle).toEqual({
      '& .MuiIconButton-root': {
        border: 'none',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'rgba(204, 204, 204, 0.3)',
        },
        '&:active': {
          backgroundColor: "hsl(220, 20%, 88%)",
        },
        
      },
    });
  });

  // Add more test cases as needed
});
