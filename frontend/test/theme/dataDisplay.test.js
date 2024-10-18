import { create } from "@mui/material/styles/createTransitions";
import { dataDisplayCustomizations } from "../../src/theme/customizations/dataDisplay";
import { gray,green,red } from "../../src/theme/themePrimitives";


import { alpha } from '@mui/material/styles';

jest.mock('@mui/material/styles', () => ({
  alpha: jest.fn((color, opacity) => `rgba(${color}, ${opacity})`),
  createTheme: jest.fn(() => ({})),
}));
jest.mock('@mui/material/styles/createTransitions', () => ({
    create: jest.fn(),
  }));

jest.mock('@mui/material/SvgIcon', () => ({
  svgIconClasses: {
    root: 'MuiSvgIcon-root',
  },
}));

jest.mock('@mui/material/Typography', () => ({
  typographyClasses: {
    root: 'MuiTypography-root',
  },
}));

jest.mock('@mui/material/ButtonBase', () => ({
  buttonBaseClasses: {
    root: 'MuiButtonBase-root',
  },
}));

jest.mock('@mui/material/Chip', () => ({
  chipClasses: {
    label: 'MuiChip-label',
    icon: 'MuiChip-icon',
  },
}));

jest.mock('@mui/material/IconButton', () => ({
  iconButtonClasses: {
    root: 'MuiIconButton-root',
  },
}));

describe('dataDisplayCustomizations', () => {
  let mockTheme;

  beforeEach(() => {
    mockTheme = {
      palette: {
        text: {
          secondary: 'rgba(0, 0, 0, 0.6)',
          primary: 'rgba(0, 0, 0, 0.87)',
        },
        action: {
          selected: 'rgba(0, 0, 0, 0.08)',
        },
        divider: '#e0e0e0',
      },
      typography: {
        body2: {
          fontSize: '14px',
          lineHeight: 1.43,
        },
        caption: {
          fontSize: '12px',
          lineHeight: 1.4,
        },
      },
      shape: {
        borderRadius: 8,
      },
      applyStyles: jest.fn((mode, styles) => (mode === 'dark' ? styles : {})),
    };
  });

  test('should apply correct list styles', () => {
    const listStyles = dataDisplayCustomizations.MuiList.styleOverrides.root;
    expect(listStyles).toEqual({
      padding: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
    });
  });

  test('should apply correct list item styles', () => {
    const listItemStyles = dataDisplayCustomizations.MuiListItem.styleOverrides.root({ theme: mockTheme });
    
    expect(listItemStyles[`& .MuiSvgIcon-root`].width).toBe('1rem');
    expect(listItemStyles[`& .MuiSvgIcon-root`].height).toBe('1rem');
    expect(listItemStyles[`& .MuiSvgIcon-root`].color).toBe(mockTheme.palette.text.secondary);
    expect(listItemStyles[`& .MuiTypography-root`].fontWeight).toBe(500);
    expect(listItemStyles[`& .MuiButtonBase-root`].display).toBe('flex');
    expect(listItemStyles[`& .MuiButtonBase-root`].gap).toBe(8);
  });

  test('should apply correct selected list item styles', () => {
    const listItemStyles = dataDisplayCustomizations.MuiListItem.styleOverrides.root({ theme: mockTheme });

    const selectedStyles = listItemStyles[`& .MuiButtonBase-root`]['&.Mui-selected'];
    expect(selectedStyles.opacity).toBe(1);
    expect(selectedStyles.backgroundColor).toBe(alpha(mockTheme.palette.action.selected, 0.3));
    expect(selectedStyles[`& .MuiSvgIcon-root`].color).toBe(mockTheme.palette.text.primary);
  });

  test('should apply correct chip styles for default color', () => {
    const chipStyles = dataDisplayCustomizations.MuiChip.styleOverrides.root({ theme: mockTheme });
    const defaultVariant = chipStyles.variants.find(v => v.props.color === 'default').style;

    expect(defaultVariant.borderColor).toBe("hsl(220, 20%, 25%)");
    expect(defaultVariant.backgroundColor).toBe("hsl(220, 30%, 6%)");
    expect(defaultVariant[`& .MuiChip-label`].color).toBe("hsl(220, 20%, 80%)");
  });

  test('should apply correct chip styles for success color', () => {
    const chipStyles = dataDisplayCustomizations.MuiChip.styleOverrides.root({ theme: mockTheme });
    const successVariant = chipStyles.variants.find(v => v.props.color === 'success').style;

    expect(successVariant.borderColor).toBe("hsl(120, 84%, 10%)");
    expect(successVariant.backgroundColor).toBe("hsl(120, 87%, 6%)");
    expect(successVariant[`& .MuiChip-label`].color).toBe("hsl(120, 61%, 77%)");
  });

  test('should apply correct chip styles for error color', () => {
    const chipStyles = dataDisplayCustomizations.MuiChip.styleOverrides.root({ theme: mockTheme });
    const errorVariant = chipStyles.variants.find(v => v.props.color === 'error').style;

    expect(errorVariant.borderColor).toBe("hsl(0, 95%, 12%)");
    expect(errorVariant.backgroundColor).toBe("hsl(0, 93%, 6%)");
    expect(errorVariant[`& .MuiChip-label`].color).toBe("hsl(0, 94%, 80%)");
  });

  test('should apply correct table pagination styles', () => {
    const tablePaginationStyles = dataDisplayCustomizations.MuiTablePagination.styleOverrides.actions;
    expect(tablePaginationStyles.display).toBe('flex');
    expect(tablePaginationStyles.gap).toBe(8);
    expect(tablePaginationStyles[`& .MuiIconButton-root`].minWidth).toBe(0);
    expect(tablePaginationStyles[`& .MuiIconButton-root`].width).toBe(36);
    expect(tablePaginationStyles[`& .MuiIconButton-root`].height).toBe(36);
  });

  test('should apply correct icon styles for small size', () => {
    const iconStyles = dataDisplayCustomizations.MuiIcon.styleOverrides.root.variants.find(v => v.props.fontSize === 'small').style;
    expect(iconStyles.fontSize).toBe('1rem');
  });
});