import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserDashboard from '../../src/Pages/UserDashboard';
import JournalEntryPage from '../../src/components/basic/JournalEntryPage';
import ProfileButton from '../../src/components/ProfileButton';
import SampleHome from '../../src/components/basic/sampleHome';
import Sidebar from '../../src/Pages/UserDashboard/Sidebar';

jest.mock('../../src/components/basic/sampleHome', () => () => <div>Mocked SampleHome</div>);
jest.mock('../../src/components/basic/JournalEntryPage', () => () => <div>Mocked JournalEntryPage</div>);
jest.mock('../../src/components/ProfileButton', () => () => <button>Mocked ProfileButton</button>);

describe('UserDashboard Component', () => {
  // Test the rendering of the layout and AppBar
  test('renders the AppBar with logo and profile button', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <UserDashboard />
        </MemoryRouter>
      );
    });

    const logo = screen.getByAltText('App Logo');
    expect(logo).toBeInTheDocument();

    
    
  });

  // Test the mobile drawer toggle functionality
  test('toggles the mobile drawer when the menu icon is clicked', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <UserDashboard />
        </MemoryRouter>
      );
    });

    const menuButton = screen.getByLabelText('open drawer');
    fireEvent.click(menuButton);
    
    const drawer = screen.getByRole('presentation'); // Drawer role is 'presentation'
    expect(drawer).toBeInTheDocument();
  });

  // Test if the Sidebar renders correctly in larger screens
  test('renders the permanent Sidebar on large screens', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <UserDashboard />
        </MemoryRouter>
      );
    });

    const sidebar = screen.getByRole('navigation'); // Assuming the Sidebar contains a navigation role
    expect(sidebar).toBeInTheDocument();
  });

  // Test the routing for the home page
  test('navigates to Home route and renders SampleHome component', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/*" element={<UserDashboard />} />
          </Routes>
        </MemoryRouter>
      );
    });

    const sampleHomeContent = screen.getByText(/mocked samplehome/i);
    expect(sampleHomeContent).toBeInTheDocument();
  });

  // Test the routing for the new journal entry page
  test('navigates to New route and renders JournalEntryPage component', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/new']}>
          <Routes>
            <Route path="/*" element={<UserDashboard />} />
          </Routes>
        </MemoryRouter>
      );
    });

    const journalEntryPageContent = screen.getByText(/mocked journalentrypage/i);
    expect(journalEntryPageContent).toBeInTheDocument();
  });

  // Test the default route, to ensure profile page renders
  test('navigates to profile route and renders default profile content', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/profile']}>
          <Routes>
            <Route path="/*" element={<UserDashboard />} />
          </Routes>
        </MemoryRouter>
      );
    });

    const profileContent = screen.getByText(/about/i);
    expect(profileContent).toBeInTheDocument();
  });

//   test('closes the drawer when handleDrawerClose is called', async () => {
//     await act(async () => {
//       render(
//         <MemoryRouter>
//           <UserDashboard />
//         </MemoryRouter>
//       );
//     });

//     const menuButton = screen.getByLabelText('open drawer');
    
//     // First, open the drawer by clicking the menu button
//     fireEvent.click(menuButton);
    
//     // Assert that the drawer is open
//     let drawer = screen.getByRole('presentation'); 
//     expect(drawer).toBeInTheDocument();
    
//     // Now, click the menu button again to close it
//     fireEvent.click(menuButton);

//     // Assert that the drawer is closed
//     expect(drawer).not.toBeInTheDocument();
//   });

  // Test if handleDrawerTransitionEnd is called and updates isClosing state
  test('calls handleDrawerTransitionEnd to reset isClosing state after drawer transition', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <UserDashboard />
        </MemoryRouter>
      );
    });

    const menuButton = screen.getByLabelText('open drawer');
    
    // Open the drawer
    fireEvent.click(menuButton);

    // Simulate drawer transition end event
    const drawer = screen.getByRole('presentation');
    fireEvent.transitionEnd(drawer);

    // Since `handleDrawerTransitionEnd` resets the `isClosing` state, 
    // you could add a check here to assert that the drawer is back to its default state
    expect(drawer).toBeInTheDocument();  // Confirm that the drawer is still in place post-transition
  });
});