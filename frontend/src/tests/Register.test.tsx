import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../pages/Register';
import { AuthProvider } from '../context/AuthContext';

describe('Register Page', () => {
  test('renders Register component', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('allows user to input username, email, and password', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthProvider>
    );

    const usernameInput = screen.getByLabelText('Username');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(usernameInput.value).toBe('testuser');
    expect(emailInput.value).toBe('testuser@example.com');
    expect(passwordInput.value).toBe('password');
  });

  test('calls register function on form submit', () => {
    const registerMock = jest.fn();
    render(
      <AuthProvider value={{ register: registerMock }}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthProvider>
    );

    const usernameInput = screen.getByLabelText('Username');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const registerButton = screen.getByText('Register');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(registerButton);

    expect(registerMock).toHaveBeenCalledWith('testuser', 'testuser@example.com', 'password');
  });
});
