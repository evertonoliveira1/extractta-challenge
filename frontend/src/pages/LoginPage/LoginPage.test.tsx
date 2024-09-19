import ReactDOM from 'react-dom/client'; 
import { describe, it, expect, vi } from 'vitest';

import LoginPage from './LoginPage';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

describe('LoginPage', () => {
  it('should render the login page with all elements', async () => {
    const container = document.createElement('div');
    const root = ReactDOM.createRoot(container);
    root.render(<LoginPage />);

    await new Promise((r) => setTimeout(r, 100));
    
    expect(container.querySelector('h4')?.textContent).toBe('Login');
    expect(container.querySelector('input[label="Usuário"]')).toBeNull();
    expect(container.querySelector('input[label="Senha"]')).toBeNull();
    expect(container.querySelector('#btn-login')?.textContent).toBe('Login');
  });
});
