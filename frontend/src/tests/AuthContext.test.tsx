import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuthContext } from '../context/AuthContext';

const TestComponent = () => {
  const { isAuthenticated, login, logout } = useAuthContext();

  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>
      <button onClick={() => login('testuser', 'password')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  test('initial state is not authenticated', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    const authStatus = screen.getByTestId('auth-status');
    expect(authStatus).toHaveTextContent('Not Authenticated');
  });

  test('login updates authentication state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    const authStatus = screen.getByTestId('auth-status');
    expect(authStatus).toHaveTextContent('Authenticated');
  });

  test('logout updates authentication state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    const authStatus = screen.getByTestId('auth-status');
    expect(authStatus).toHaveTextContent('Not Authenticated');
  });
});
