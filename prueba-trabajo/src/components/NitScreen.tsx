import React, { useState } from 'react';

interface NitScreenProps {
  onNext: (nit: string) => void;
}

const NitScreen: React.FC<NitScreenProps> = ({ onNext }) => {
  const [nit, setNit] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nit.trim()) {
      onNext(nit.trim());
    }
  };

  return (
    <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-2xl shadow-lg">
      <div className="text-center">
        <img className="w-72 h-36 mx-auto text-blue-600 rounded-lg" src="src/assets/logo.gif" alt="Logo" />
        <h1 className="mt-4 text-3xl font-bold text-gray-800">Bienvenido</h1>
        <p className="text-gray-500">Ingresa el NIT de tu empresa</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          value={nit}
          onChange={(e) => setNit(e.target.value)}
          placeholder="Escribe el NIT aquí"
          className="w-full px-4 py-3 text-lg text-gray-700 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={!nit.trim()}
          className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
        >
          Siguiente
        </button>
      </form>
    </div>
  );
};

export default NitScreen;