import authReducer, { loginSuccess, loginFailure, logout } from '../../src/store/authSlice';
describe('authSlice', () => {
  const initialState = {
    role: null,
    error: null,
    uid: null,
    email: null,
    displayName: null,
  };

  it('should handle loginSuccess', () => {
    const userPayload = {
      email: 'test@example.com',
      uid: '12345',
      displayName: 'Test User',
      role: 'admin',
    };

    const nextState = authReducer(initialState, loginSuccess(userPayload));

    expect(nextState).toEqual({
      email: 'test@example.com',
      uid: '12345',
      displayName: 'Test User',
      role: 'admin',
      error: null,
    });
  });

  it('should handle loginFailure', () => {
    const errorPayload = 'Login failed';
    
    const nextState = authReducer(initialState, loginFailure(errorPayload));

    expect(nextState.error).toEqual('Login failed');
    expect(nextState.uid).toBeNull(); // Ensure the state doesn't change other fields
  });

  it('should handle logout', () => {
    const loggedInState = {
      email: 'test@example.com',
      uid: '12345',
      displayName: 'Test User',
      role: 'admin',
      error: null,
    };

    const nextState = authReducer(loggedInState, logout());

    expect(nextState).toEqual({
      email: null,
      uid: null,
      displayName: null,
      role: null,
      error: null,
    });
  });
});
