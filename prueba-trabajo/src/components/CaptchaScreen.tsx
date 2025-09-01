import React, { useState, useMemo } from 'react';
import { BusIcon, WrongIcon } from './Icons'; // Importamos iconos

interface CaptchaScreenProps {
  onNext: () => void;
  onReturnToNitScreen: () => void; // Nueva prop para retornar a la pantalla de NIT
}

const CaptchaScreen: React.FC<CaptchaScreenProps> = ({ onNext, onReturnToNitScreen }) => {
    const [selected, setSelected] = useState<number | null>(null);
    const [error, setError] = useState(false);
    const [captchaKey, setCaptchaKey] = useState(0); // Nuevo estado para forzar el re-render del captcha
    const [attempts, setAttempts] = useState(0); // Contador de intentos fallidos
    const [showAttemptsModal, setShowAttemptsModal] = useState(false); // Estado para mostrar el modal

    // Hacemos que la posición del bus sea aleatoria cada vez
    const { items, correctItemIndex } = useMemo(() => {
        const correctIdx = Math.floor(Math.random() * 6);
        const allItems = Array(6).fill(null).map((_, index) => (
            index === correctIdx ? 
            <BusIcon className="w-12 h-12 text-blue-600 animate-bounce" /> : 
            <WrongIcon className="w-10 h-10 text-gray-400" />
        ));
        return { items: allItems, correctItemIndex: correctIdx };
    }, [captchaKey]); // Añadimos captchaKey como dependencia

    const handleSelect = (index: number) => {
        setSelected(index);
        setError(false);
    };

    const handleSubmit = () => {
        if (selected === correctItemIndex) {
            setAttempts(0); // Reinicia los intentos si es correcto
            onNext();
        } else {
            setError(true);
            setSelected(null);
            setCaptchaKey(prevKey => prevKey + 1); // Incrementa la clave para forzar un nuevo captcha
            
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= 3) {
                setShowAttemptsModal(true);
                setTimeout(() => {
                    setShowAttemptsModal(false);
                    setAttempts(0); // Reinicia los intentos
                    onReturnToNitScreen(); // Retorna a la pantalla de NIT
                }, 3000); // Muestra el modal por 3 segundos
            } else {
                setTimeout(() => setError(false), 2000); // El error desaparece si no hay modal
            }
        }
    };

    return (
        <>
            <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-2xl shadow-lg text-center border-2 border-indigo-200">
                <img className="w-full mx-auto text-blue-600 rounded-lg shadow-xl  border-blue-500 p-4 mb-4" src="/logo-calisoft-sas.webp" alt="Logo_Calisoft" />
                <p className="text-blue-800 font-semibold">Selecciona la imagen que contenga un bus para continuar.</p>
                {error && !showAttemptsModal && <p className="text-red-500 font-semibold text-sm">Selección incorrecta. Inténtalo de nuevo.</p>}
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
                    disabled={selected === null || showAttemptsModal}
                    className="w-auto px-12 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
                >
                    Confirmar
                </button>
                <img className="h-16 p-1 mx-auto text-blue-600 rounded-full shadow-xl" src="/bannerSuperTransporte.png" alt="Logo_Calisoft" />
            </div>

            {showAttemptsModal && (
                <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl text-center border-2 border-red-600">
                        <h3 className="text-xl font-bold text-red-600 mb-4">¡Exceso de Intentos!</h3>
                        <p className="text-gray-700">Has excedido el número de intentos permitidos. Serás redirigido a la pantalla de NIT.</p>
                    </div>
                </div>
            )}
        </>
    );
}; // Cierre del componente CaptchaScreen

export default CaptchaScreen;
