import React from "react"; // <-- Add this line
import { render, screen, fireEvent } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileButton from "../src/components/ProfileButton"; // Adjust the path as necessary
import { signOutUser } from "../src/services/authService";// Mocked
import { act } from '@testing-library/react';

// Mock necessary functions
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("../src/services/authService", () => ({
  signOutUser: jest.fn(),
}));

describe("ProfileButton Component", () => {
  let mockDispatch;
  let mockNavigate;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);

    // Set up a mock Redux state for useSelector
    useSelector.mockReturnValue({
      displayName: "John Doe",
      email: "johndoe@example.com",
    });

    // Reset mocks before each test
    jest.clearAllMocks();
  });

  test("renders profile button with initials", () => {
    render(<ProfileButton />);

    // Find the Avatar component and check its initials (JD)
    const avatar = screen.getByText("JD");
    expect(avatar).toBeInTheDocument();
  });

  test("opens the menu when avatar is clicked", () => {
    render(<ProfileButton />);

    // Click on the avatar
    const avatarButton = screen.getByRole("button");
    act(() => {
      fireEvent.click(avatarButton);
    });
    

    // Check if the menu is opened
    const settingsOption = screen.getByText(/Settings/i);
    expect(settingsOption).toBeInTheDocument();
  });

  test("logs out the user and redirects to home", async () => {
    // Mock signOutUser to return success
    signOutUser.mockResolvedValueOnce({ success: true });

    render(<ProfileButton />);

    // Click on the avatar to open the menu
    const avatarButton = screen.getByRole("button");
    fireEvent.click(avatarButton);

    // Click on the logout menu item
    const logoutButton = screen.getByText(/Logout/i);
    await act(async () => {
      fireEvent.click(logoutButton);
    });
    

    // Check that signOutUser was called
    expect(signOutUser).toHaveBeenCalled();

    // Wait for the signout and check that dispatch and navigate were called
    expect(mockDispatch).toHaveBeenCalledWith({ type: "auth/logout" });
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
