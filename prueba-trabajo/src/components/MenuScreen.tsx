import React from 'react';

interface MenuScreenProps {
  username: string;
  companyName: string;
  onLogout: () => void;
  onNavigateToAlistamiento: () => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ username, companyName, onLogout, onNavigateToAlistamiento }) => {
  
  const menuOptions = [
    { label: 'Mantenimiento Preventivo', icon: '🔧', action: () => alert('Función no implementada') },
    { label: 'Mantenimiento Correctivo', icon: '🛠️', action: () => alert('Función no implementada') },
    { label: 'Alistamiento Diario', icon: '📋', action: onNavigateToAlistamiento },
    { label: 'Autorización de Menores', icon: '👨‍👩‍👧', action: () => alert('Función no implementada') },
    { label: 'Cambiar Contraseña', icon: '🔒', action: () => alert('Función no implementada') },
    { label: 'Cerrar Sesión', icon: '🚪', action: onLogout, isLogout: true },
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-6 bg-white-100 rounded-2xl shadow-lg">
      {/* --- HEADER CARD --- */}
      <header className="bg-blue-500 text-white p-5 rounded-2xl flex items-center gap-4 shadow-lg">
        <div className="bg-blue-400 w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
          Logo
        </div>
        <div>
          <h2 className="font-bold text-xl">Empresa De Prueba</h2>
          <p className="text-blue-100 text-sm">Bienvenido {username}!</p>
        </div>
      </header>
      
      {/* --- MENU GRID --- */}
      <main className="grid grid-cols-2 gap-4">
        {menuOptions.map(option => (
          <div 
            key={option.label}
            onClick={option.action}
            className={`
              p-4 rounded-2xl shadow-md flex flex-col items-center justify-center gap-2 
              aspect-square cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95
              ${option.isLogout 
                ? 'bg-red-100 text-red-600 font-bold' 
                : 'bg-white text-gray-700'
              }
            `}
          >
            <span className="text-4xl" role="img" aria-label={option.label}>
              {option.icon}
            </span>
            <span className="text-sm font-semibold text-center leading-tight">
              {option.label}
            </span>
          </div>
        ))}
      </main>
    </div>
  );
};

export default MenuScreen;