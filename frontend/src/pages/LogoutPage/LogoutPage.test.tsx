import ReactDOM from 'react-dom/client'; 
import { describe, it, expect, vi } from 'vitest';

import LogoutPage from './LogoutPage';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

describe('LogoutPage', () => {
  it('should render "Saindo..." message', async () => {
    const container = document.createElement('div');
    const root = ReactDOM.createRoot(container);
    root.render(<LogoutPage />);
    await new Promise((r) => setTimeout(r, 200));

    expect(container.textContent).toContain('Saindo...');
  });
});
