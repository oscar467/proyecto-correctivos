import React, { useState } from 'react';
import './App.css';
import NitScreen from './components/NitScreen';
import CaptchaScreen from './components/CaptchaScreen';
import LoginScreen from './components/LoginScreen';
import MenuScreen from './components/MenuScreen';
import AlistamientoScreen from './components/AlistamientoScreen';

// Definimos los posibles estados de la vista
type View = 'NIT' | 'CAPTCHA' | 'LOGIN' | 'MENU' | 'ALISTAMIENTO';

function App() {
  const [currentView, setCurrentView] = useState<View>('NIT');
  const [companyNit, setCompanyNit] = useState('');
  const [username, setUsername] = useState('');

  const handleNitSubmit = (nit: string) => {
    setCompanyNit(nit);
    setCurrentView('CAPTCHA');
  };

  const handleCaptchaSuccess = () => {
    setCurrentView('LOGIN');
  };
  
  const handleLogin = (user: string) => {
    setUsername(user);
    setCurrentView('MENU');
  };

  const handleLogout = () => {
    setCompanyNit('');
    setUsername('');
    setCurrentView('NIT');
  };

  const navigateToAlistamiento = () => {
    setCurrentView('ALISTAMIENTO');
  };

  const navigateToMenu = () => {
    setCurrentView('MENU');
  };

  // Renderiza el componente adecuado según la vista actual
  const renderView = () => {
    switch (currentView) {
      case 'NIT':
        return <NitScreen onNext={handleNitSubmit} />;
      case 'CAPTCHA':
        return <CaptchaScreen onNext={handleCaptchaSuccess} />;
      case 'LOGIN':
        return <LoginScreen onLogin={handleLogin} />;
      case 'MENU':
        return <MenuScreen 
                  username={username}
                  companyName={`Empresa NIT ${companyNit}`}
                  onLogout={handleLogout}
                  onNavigateToAlistamiento={navigateToAlistamiento}
                />;
      case 'ALISTAMIENTO':
        return <AlistamientoScreen onBackToMenu={navigateToMenu} />;
      default:
        return <NitScreen onNext={handleNitSubmit} />;
    }
  };

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , width: '100%', height: '100%'}} >

    </div>
      {renderView()}
    </>
  );
}

export default App;