import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('access_token');
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return <div>Saindo...</div>;
};

export default LogoutPage;
