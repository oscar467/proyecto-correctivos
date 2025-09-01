import React from 'react';
import { MantenimientoCorrectivoIcon, IconoCheckList } from './Icons'; // Importar desde Icons.tsx

interface MenuScreenProps {
  username: string;
  companyName: string;
  onLogout: () => void;
  onNavigateToAlistamiento: () => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ username, companyName, onLogout, onNavigateToAlistamiento }) => {
  
  const menuOptions = [
    { label: 'Mantenimiento Preventivo', icon: '🔧', action: () => alert('Función no implementada'), implemented: false },
    { label: 'Mantenimiento Correctivo', icon: <MantenimientoCorrectivoIcon className="w-10 h-10" />, action: () => alert('Función no implementada'), implemented: false },
    { label: 'Alistamiento Diario', icon: <IconoCheckList className="w-10 h-10" />, action: onNavigateToAlistamiento, implemented: true },
    { label: 'Autorización de Menores', icon: '👨‍👩‍👧', action: () => alert('Función no implementada'), implemented: false },
    { label: 'Cambiar Contraseña', icon: '🔒', action: () => alert('Función no implementada'), implemented: false },
    { label: 'Cerrar Sesión', icon: '🚪', action: onLogout, isLogout: true, implemented: true },
  ];

  companyName = 'Empresa De Prueba';

  return (
    <div className="w-full h-screen flex flex-col p-4 gap-6 space-y-6 bg-white-100">
      <div className="w-full h-full flex flex-col gap-4 bg-white rounded-2xl shadow-lg">
      {/* --- HEADER CARD --- */}
        <header className="bg-blue-500 text-white p-5 rounded-2xl flex items-center gap-4 shadow-lg flex-shrink-0">
          <div className="bg-blue-400 w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
            Logo
          </div>
          <div>
            <h2 className="font-bold text-xl">{companyName}</h2>
            <p className="text-blue-100 text-sm">{username}</p>
          </div>
        </header>

        {/* --- MENU GRID --- */}
        <main className="grid grid-cols-2 gap-4 flex-grow p-4">
          {menuOptions.map(option => (
            <div 
              key={option.label}
            onClick={option.implemented ? option.action : undefined} // Deshabilita el click si no está implementado
            className={`
              p-4 rounded-2xl shadow-md flex flex-col items-center justify-center gap-2 
              aspect-square transition-transform duration-200
              ${option.isLogout 
                ? 'bg-red-100 text-red-600 font-bold' 
                : option.implemented 
                  ? 'bg-white text-gray-700 cursor-pointer hover:scale-105 active:scale-95' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
            >
            {typeof option.icon === 'string' ? (
              <span className="text-4xl" role="img" aria-label={option.label}>
                {option.icon}
              </span>
            ) : (
              option.icon
            )}
              <span className="text-sm font-semibold text-center leading-tight">
                {option.label}
              </span>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default MenuScreen;
