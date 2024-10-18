import { chartsCustomizations } from "../../src/theme/customizations/charts";
import { gray } from "../../src/theme/themePrimitives";

jest.mock('@mui/x-charts', () => ({
    axisClasses: {
      line: 'MuiAxis-line',
      tick: 'MuiAxis-tick',
      tickLabel: 'MuiAxis-tickLabel',
    },
    legendClasses: {
      mark: 'MuiLegend-mark',
    },
    chartsGridClasses: {
      line: 'MuiGrid-line',
    },
  }));
  
  describe('chartsCustomizations', () => {
    let mockTheme;
  
    beforeEach(() => {
      mockTheme = {
        palette: {
          divider: '#e0e0e0',
        },
        shape: {
          borderRadius: 8,
        },
        applyStyles: jest.fn((mode, styles) => (mode === 'dark' ? styles : {})),
      };
    });
  
    test('should apply correct axis styles for light theme', () => {
      const axisStyles = chartsCustomizations.MuiChartsAxis.styleOverrides.root({ theme: mockTheme });
      
      expect(axisStyles).toMatchSnapshot();
      expect(axisStyles[`& .MuiAxis-line`].stroke).toBe("hsl(220, 20%, 25%)");
      expect(axisStyles[`& .MuiAxis-tick`].stroke).toBe("hsl(220, 20%, 25%)");
      expect(axisStyles[`& .MuiAxis-tickLabel`].fill).toBe("hsl(220, 20%, 80%)");
    });
  
    test('should apply correct axis styles for dark theme', () => {
      mockTheme.applyStyles = jest.fn((mode, styles) => (mode === 'dark' ? styles : {}));
      
      const axisStyles = chartsCustomizations.MuiChartsAxis.styleOverrides.root({ theme: mockTheme });
  
      expect(mockTheme.applyStyles).toHaveBeenCalledWith('dark', expect.any(Object));
      expect(axisStyles[`& .MuiAxis-line`].stroke).toBe(gray[700]);
      expect(axisStyles[`& .MuiAxis-tick`].stroke).toBe(gray[700]);
      expect(axisStyles[`& .MuiAxis-tickLabel`].fill).toBe(gray[300]);
    });
  
    test('should apply correct tooltip styles', () => {
      const tooltipMarkStyles = chartsCustomizations.MuiChartsTooltip.styleOverrides.mark({ theme: mockTheme });
      const tooltipTableStyles = chartsCustomizations.MuiChartsTooltip.styleOverrides.table({ theme: mockTheme });
  
      expect(tooltipMarkStyles.ry).toBe(6);
      expect(tooltipMarkStyles.border).toBe(`1px solid ${mockTheme.palette.divider}`);
      expect(tooltipTableStyles.border).toBe(`1px solid ${mockTheme.palette.divider}`);
      expect(tooltipTableStyles.borderRadius).toBe(mockTheme.shape.borderRadius);
      expect(tooltipTableStyles.background).toBe('hsl(220, 35%, 3%)');
    });
  
    test('should apply correct tooltip styles for dark theme', () => {
      mockTheme.applyStyles = jest.fn((mode, styles) => (mode === 'dark' ? styles : {}));
  
      const tooltipTableStyles = chartsCustomizations.MuiChartsTooltip.styleOverrides.table({ theme: mockTheme });
      
      expect(tooltipTableStyles.background).toBe(gray[900]);
    });
  
    test('should apply correct legend styles', () => {
      const legendStyles = chartsCustomizations.MuiChartsLegend.styleOverrides.root;
  
      expect(legendStyles[`& .MuiLegend-mark`].ry).toBe(6);
    });
  
    test('should apply correct grid styles for light theme', () => {
      const gridStyles = chartsCustomizations.MuiChartsGrid.styleOverrides.root({ theme: mockTheme });
  
      expect(gridStyles[`& .MuiGrid-line`].stroke).toBe("hsl(220, 20%, 25%)");
      expect(gridStyles[`& .MuiGrid-line`].strokeDasharray).toBe('4 2');
      expect(gridStyles[`& .MuiGrid-line`].strokeWidth).toBe(0.8);
    });
  
    test('should apply correct grid styles for dark theme', () => {
      mockTheme.applyStyles = jest.fn((mode, styles) => (mode === 'dark' ? styles : {}));
  
      const gridStyles = chartsCustomizations.MuiChartsGrid.styleOverrides.root({ theme: mockTheme });
  
      expect(gridStyles[`& .MuiGrid-line`].stroke).toBe(gray[700]);
      expect(gridStyles[`& .MuiGrid-line`].strokeDasharray).toBe('4 2');
      expect(gridStyles[`& .MuiGrid-line`].strokeWidth).toBe(0.8);
    });
  });
  