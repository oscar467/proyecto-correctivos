import React, { useState, useMemo } from 'react';
import { BusIcon, WrongIcon } from './Icons'; // Importamos iconos

interface CaptchaScreenProps {
  onNext: () => void;
}

const CaptchaScreen: React.FC<CaptchaScreenProps> = ({ onNext }) => {
    const [selected, setSelected] = useState<number | null>(null);
    const [error, setError] = useState(false);

    // Hacemos que la posición del bus sea aleatoria cada vez
    const { items, correctItemIndex } = useMemo(() => {
        const correctIdx = Math.floor(Math.random() * 6);
        const allItems = Array(6).fill(null).map((_, index) => (
            index === correctIdx ? 
            <BusIcon className="w-12 h-12 text-blue-600 animate-bounce" /> : 
            <WrongIcon className="w-10 h-10 text-gray-400" />
        ));
        return { items: allItems, correctItemIndex: correctIdx };
    }, []);

    const handleSelect = (index: number) => {
        setSelected(index);
        setError(false);
    };

    const handleSubmit = () => {
        if (selected === correctItemIndex) {
            onNext();
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000); // El error desaparece
            setSelected(null);
        }
    };

    return (
        <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-2xl shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800">Verifica que no eres un robot</h2>
            <p className="text-gray-500">Selecciona la imagen que contenga un bus: para continuar.</p>
            {error && <p className="text-red-500 font-semibold text-sm">Selección incorrecta. Inténtalo de nuevo.</p>}
            <div className="grid grid-cols-3 gap-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelect(index)}
                        className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 aspect-square ${
                            selected === index ? 'border-blue-500 bg-blue-100 ring-2 ring-blue-500' : 'border-gray-200 bg-gray-50'
                        }`}
                    >
                        {item}
                    </div>
                ))}
            </div>
            <button
                onClick={handleSubmit}
                disabled={selected === null}
                className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
            >
                Siguiente
            </button>
        </div>
    );
};

export default CaptchaScreen;