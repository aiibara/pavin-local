jest.mock('react-native-unistyles', () => {
  return {
    createStyleSheet: jest.fn(),
    useStyles: jest.fn().mockReturnValue({ styles: {}, theme: {} }),
  };
});