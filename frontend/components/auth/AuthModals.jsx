'use client';

import { useAuth } from '../../context/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

export default function AuthModals() {
  const { 
    isLoginModalOpen, 
    isRegisterModalOpen, 
    openLoginModal, 
    openRegisterModal, 
    closeAuthModals 
  } = useAuth();

  return (
    <>
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={closeAuthModals} 
        onSwitchToRegister={openRegisterModal} 
      />
      
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={closeAuthModals} 
        onSwitchToLogin={openLoginModal} 
      />
    </>
  );
}
