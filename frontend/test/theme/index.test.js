import * as customizations from '../../src/theme/customizations/index.jsx'



describe('customizations module exports', () => {
  it('should export chartsCustomizations', () => {
    expect(customizations.chartsCustomizations).toBeDefined();
  });

  it('should export dataGridCustomizations', () => {
    expect(customizations.dataGridCustomizations).toBeDefined();
  });

  it('should export datePickersCustomizations', () => {
    expect(customizations.datePickersCustomizations).toBeDefined();
  });

  it('should export treeViewCustomizations', () => {
    expect(customizations.treeViewCustomizations).toBeDefined();
  });

  it('should export inputsCustomizations', () => {
    expect(customizations.inputsCustomizations).toBeDefined();
  });

  it('should export dataDisplayCustomizations', () => {
    expect(customizations.dataDisplayCustomizations).toBeDefined();
  });

  it('should export feedbackCustomizations', () => {
    expect(customizations.feedbackCustomizations).toBeDefined();
  });

  it('should export navigationCustomizations', () => {
    expect(customizations.navigationCustomizations).toBeDefined();
  });

  it('should export surfacesCustomizations', () => {
    expect(customizations.surfacesCustomizations).toBeDefined();
  });
});
