import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Services/AuthService';
import RegistrationPage from './Registration';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../Services/AuthService', () => ({
  register: jest.fn().mockReturnValue(Promise.resolve()),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('RegistrationPage', () => {
  it('calls AuthService.register with the correct arguments when the form is submitted', async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <Router>
        <RegistrationPage />
      </Router>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const emailInput = screen.getByLabelText(/email/i);
    const ageInput = screen.getByLabelText(/age/i);
    const submitButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
    fireEvent.change(ageInput, { target: { value: '30' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(AuthService.register).toHaveBeenCalledWith('testuser', 'testpass', 'testuser@example.com', '30');
    });
  });
});
