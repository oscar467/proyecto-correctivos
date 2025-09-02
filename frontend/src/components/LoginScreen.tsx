import React, { useState } from 'react';
import {  LockIcon } from './Icons'; // Importamos iconos
import { PiUserCircleFill } from "react-icons/pi";


interface LoginScreenProps {
  onLogin: (username: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const canLogin = username.trim() !== '' && password.trim() !== '';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (canLogin) {
      onLogin(username);
    }
  };

  return (
    <div className="w-full md:max-w-md lg:max-w-lg p-8 space-y-6 bg-white rounded-2xl shadow-lg text-center border-2 border-indigo-200">
      <div className="text-center">
        <img className="w-full mx-auto text-blue-600 rounded-full shadow-xl mb-4" src="/logo-calisoft-sas.webp" alt="Logo_Calisoft" />
        <img className="w-full px-8 p-1 mx-auto text-blue-600 rounded-full shadow-xl" src="/bannerSuperTransporte.png" alt="Logo_SuperTransporte" />
        <h2 className="mt-4 text-4xl font-bold text-blue-800">Iniciar Sesión</h2>
        <p className="text-gray-500 mt-2">Usa tus credenciales para acceder</p>
      </div>
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <PiUserCircleFill  className="w-6 h-6 text-gray-400" />
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
            className="w-full px-4 py-3 pl-10 text-lg text-gray-700 bg-gray-100 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockIcon className="w-5 h-5 text-gray-400" />
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full px-4 py-3 pl-10 text-lg text-gray-700 bg-gray-100 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={!canLogin}
          className="w-auto px-12 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;