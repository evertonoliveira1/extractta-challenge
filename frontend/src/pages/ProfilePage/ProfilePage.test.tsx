import ReactDOM from 'react-dom/client';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import ProfilePage from './ProfilePage';
import { fetchUserProfile } from '../../services/apiService';

vi.mock('../../services/apiService', () => ({
  fetchUserProfile: vi.fn(),
}));

const mockUserProfile = {
  username: 'testuser',
  email: 'test@example.com',
  createdAt: '2024-01-01T00:00:00Z',
};

describe('ProfilePage', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should render the component', async () => {
    vi.mocked(fetchUserProfile).mockResolvedValueOnce(mockUserProfile);

    const container = document.createElement('div');
    document.body.appendChild(container);

    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      );
    });

    expect(document.body.innerHTML).toContain('testuser');
    expect(document.body.innerHTML).toContain('test@example.com');
  });

  it('should display loading spinner initially', async () => {
    vi.mocked(fetchUserProfile).mockImplementation(() => new Promise(() => { }));

    const container = document.createElement('div');
    document.body.appendChild(container);

    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      );
    });

    expect(document.body.innerHTML).toContain('Carregando...');

    vi.mocked(fetchUserProfile).mockResolvedValue(mockUserProfile);
  });

  it('should display an error message if there is an error', async () => {
    vi.mocked(fetchUserProfile).mockRejectedValueOnce(new Error('Network error'));

    const container = document.createElement('div');
    document.body.appendChild(container);

    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      );
    });

    expect(document.body.innerHTML).toContain('Falha ao carregar os dados do perfil do usuário: Network error');
  });
});
