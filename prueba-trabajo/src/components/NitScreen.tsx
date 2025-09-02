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
    <div className="w-full md:max-w-md lg:max-w-lg p-8 space-y-6 bg-white rounded-2xl shadow-lg text-center border-2 border-indigo-200 ">
      <div className="text-center">
        <img className="w-full mx-auto text-blue-600 rounded-full shadow-xl mb-4" src="/logo-calisoft-sas.webp" alt="Logo_Calisoft" />
        <img className="w-full px-8 p-1 mx-auto text-blue-600 rounded-full shadow-xl" src="/bannerSuperTransporte.png" alt="Logo_SuperTransporte" />
        <h1 className="mt-4 text-4xl font-bold text-blue-700">Bienvenido</h1>
        <h2 className="mt-none text-2xl font-bold text-blue-700">al Provedor Tecnologico</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="tel" // Cambiado a 'tel' para teclado numérico en móviles
          inputMode="numeric" // Sugiere un teclado numérico
          pattern="[0-9]*" // Patrón para validación básica (no estricta)
          value={nit}
          onChange={(e) => {
            const value = e.target.value;
            const numericValue = value.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
            setNit(numericValue);
          }}
          maxLength={10}
          placeholder="Escribe el NIT aquí"
          className="w-full px-4 py-3 text-lg text-gray-900 bg-gray-100 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={!nit.trim()}
          className="w-auto px-12 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-300"
        >
          Siguiente
        </button>
      </form>
      
    </div>
  );
};

export default NitScreen;

