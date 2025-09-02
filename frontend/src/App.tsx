import './App.css';
import { useState } from 'react';
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
  
  const handleReturnToNitScreen = () => {
    setCurrentView('NIT');
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
        return <CaptchaScreen onNext={handleCaptchaSuccess} onReturnToNitScreen={handleReturnToNitScreen} />;
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
    <div className="flex flex-col justify-center items-center min-h-full h-screen bg-gray-100 lg:h-screen content-center bg-blue-100">
        {renderView()}
    </div>
  );
}

export default App;

