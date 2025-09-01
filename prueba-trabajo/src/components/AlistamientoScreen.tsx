import React, { useState, useEffect } from 'react';
import { LicensePlateIcon, IdCardIcon } from './Icons'; // Importamos los nuevos iconos

// Icono para el botón de "Volver"
const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

interface AlistamientoScreenProps {
    onBackToMenu: () => void;
}

// Componente para animar la entrada de los campos
    const AnimatedDiv: React.FC<{ show: boolean; children: React.ReactNode }> = ({ show, children }) => {
        const [isVisible, setIsVisible] = useState(show); // Inicializa con el valor de show

        useEffect(() => {
            // Actualiza isVisible cuando la prop show cambia
            const timer = setTimeout(() => setIsVisible(show), 50); 
            return () => clearTimeout(timer);
        }, [show]);

        return (
            <div
                className={`transition-all duration-300 ease-in-out transform overflow-hidden
                    ${isVisible ? 'opacity-100 translate-y-0 max-h-screen' : 'opacity-0 -translate-y-2 max-h-0'}`}
            >
                {children}
            </div>
        );
    };

const AlistamientoScreen: React.FC<AlistamientoScreenProps> = ({ onBackToMenu }) => {
    // --- ESTADO PARA LOS CAMPOS Y FUNCIONALIDADES ---
    const [numeroInterno, setNumeroInterno] = useState('');
    const [tipoDoc, setTipoDoc] = useState('');
    const [documento, setDocumento] = useState('');
    const [detalles, setDetalles] = useState('');
    // Estados para controlar la visibilidad de los campos
    const [showTipoDoc, setShowTipoDoc] = useState(false);
    const [showNumeroDoc, setShowNumeroDoc] = useState(false);
    const [showNombreChecklist, setShowNombreChecklist] = useState(false);
    const [showEnviarBoton, setShowEnviarBoton] = useState(false);

    // Lista de items de la checklist
    const checklistItems = [
        "Fugas del motor",
        "Tensión correas",
        "Ajuste de tapas",
        "Niveles de aceites",
        "Nivel agua limpiaparabrisas",
        "Aditivos de radiador",
        "Filtros húmedos y secos",
        "Baterías",
        "Llantas",
        "Equipo de carretera",
        "Botiquín"
    ];
    // Estado para los checkboxes de la checklist
    const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(checklistItems.length).fill(false));

    // Lógica para controlar la visibilidad de los campos
    useEffect(() => {
        // Mostrar Tipo de Documento cuando se ingresa algo en Número Interno
        setShowTipoDoc(numeroInterno.length > 3);
    }, [numeroInterno]);

    useEffect(() => {
        // Mostrar Número de Documento cuando se selecciona Tipo de Documento
        setShowNumeroDoc(tipoDoc !== '');
    }, [tipoDoc]);

    useEffect(() => {
        // Mostrar Nombre y Checklist cuando se ingresan al menos 5 dígitos en Número de Documento
        setShowNombreChecklist(documento.length >= 5);
    }, [documento]);

    useEffect(() => {
        // Mostrar botón Enviar cuando todos los items de la checklist están marcados
        setShowEnviarBoton(checkedItems.every(item => item));
    }, [checkedItems]);

    const handleChecklistItemChange = (index: number) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!checkedItems.every(item => item)) {
            alert('Por favor, complete todos los puntos de la checklist antes de enviar.');
            return;
        }
        alert(`Formulario enviado.\nNúmero Interno: ${numeroInterno}\nDocumento: ${tipoDoc} ${documento}\nDetalles: ${detalles}`);
        onBackToMenu();
    }

    // --- LÓGICA PARA MOSTRAR LA INFORMACIÓN CONTEXTUAL ---
    const showPlacaSugerida = numeroInterno.length === 4;
    const showNombreSugerido = documento.length >= 5; // Ahora depende de 5 dígitos en documento
    // Generamos una placa aleatoria basada en el número interno
    const placaSugerida = `ABC-123`;
    const nombreSugerido = "Juan Perez"; // Nombre de ejemplo

    

    return (
        <div className='w-full h-screen max-w-md mx-none p-4 space-y-6 bg-white-100 overflow-hidden'>
            <div className="w-full h-screen bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
                {/* --- ENCABEZADO ACTUALIZADO --- */}
                <header className="relative bg-blue-500 text-white p-4 flex items-center justify-center flex-shrink-0  rounded-2xl shadow-lg">
                    <button
                        onClick={onBackToMenu}
                        className="absolute left-4 p-2 rounded-full hover:bg-blue-600 transition-colors flex items-center gap-2"
                        aria-label="Volver al menú"
                    >
                        <BackArrowIcon />
                    </button>
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <span role="img" aria-label="checklist icon">📋</span>
                        Alistamiento Diario
                    </h1>
                </header>

                {/* --- CONTENIDO DEL FORMULARIO CON NUEVAS FUNCIONES --- */}
                <main className="flex-grow p-6 space-y-6 overflow-y-auto">
                    <form id="alistamiento-form" onSubmit={handleSubmit} className="space-y-5">

                        {/* Campo Número Interno con icono y lógica */}
                        <AnimatedDiv show={true}> {/* Siempre visible */}
                            <div>
                                <label htmlFor="numero-interno" className="block text-sm font-semibold text-gray-600 mb-1">
                                    Número Interno
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <LicensePlateIcon className="w-5 h-5 text-gray-400" />
                                    </span>
                                    <input
                                        type="text"
                                        id="numero-interno"
                                        required
                                        maxLength={4}
                                        placeholder="0123"
                                        value={numeroInterno}
                                        onChange={(e) => setNumeroInterno(e.target.value.replace(/\D/g, ''))}
                                        className="w-full pl-10 px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* Caja de información para placa sugerida */}
                                {showPlacaSugerida && (
                                    <div className="mt-2 p-2 bg-gray-100 text-blue-600 text-sm font-semibold rounded-lg text-center transition-all duration-300">
                                        Placa relacionada: {placaSugerida}
                                    </div>
                                )}
                            </div>
                        </AnimatedDiv>

                        {/* Campo Tipo de Documento con icono */}
                        <AnimatedDiv show={showTipoDoc}>
                            <div>
                                <label htmlFor="tipoDoc" className="block text-sm font-semibold text-gray-600 mb-1">
                                    Tipo de Documento
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <IdCardIcon className="w-5 h-5 text-gray-400" />
                                    </span>
                                    <select
                                        id="tipoDoc"
                                        required
                                        value={tipoDoc}
                                        onChange={(e) => setTipoDoc(e.target.value)}
                                        className="w-full pl-10 px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                    >
                                        <option value="" disabled>Seleccione...</option>
                                        <option value="CC">Cédula de Ciudadanía</option>
                                        <option value="CE">Cédula de Extranjería</option>
                                        <option value="PA">Pasaporte</option>
                                    </select>
                                </div>
                            </div>
                        </AnimatedDiv>

                        {/* Campo Número de Documento con icono y lógica */}
                        <AnimatedDiv show={showNumeroDoc}>
                            <div>
                                <label htmlFor="documento" className="block text-sm font-semibold text-gray-600 mb-1">
                                    Número de Documento
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <IdCardIcon className="w-5 h-5 text-gray-400" />
                                    </span>
                                    <input
                                        type="text"
                                        id="documento"
                                        required
                                        placeholder="Ingrese número de documento"
                                        value={documento}
                                        onChange={(e) => setDocumento(e.target.value)}
                                        className="w-full pl-10 px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* Caja de información para nombre sugerido */}
                                {showNombreSugerido && (
                                    <div className="mt-2 p-2 bg-gray-100 text-blue-600 text-sm font-semibold rounded-lg text-center transition-all duration-300">
                                        Conductor: {nombreSugerido}
                                    </div>
                                )}
                            </div>
                        </AnimatedDiv>

                        {/* Checklist (sin cambios) */}
                        <AnimatedDiv show={showNombreChecklist}>
                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                <h3 className="text-center text-blue-600 font-bold text-lg mb-4">
                                    Checklist Actividades Minimas
                                </h3>
                                <div className="space-y-3">
                                    {checklistItems.map((item, index) => (
                                        <label key={item} className="flex items-center gap-3 text-gray-700 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                id={item} 
                                                checked={checkedItems[index]}
                                                onChange={() => handleChecklistItemChange(index)}
                                                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                                            />
                                            {item}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </AnimatedDiv>

                        {/* --- FUNCIONALIDAD DE DETALLES --- */}
                        <AnimatedDiv show={showNombreChecklist}> {/* Mostrar detalles junto con nombre y checklist */}
                            <div className="pt-2">
                                <button
                                    type="button"
                                    onClick={() => setDetalles(detalles ? '' : ' ')} // Toggle para mostrar/ocultar textarea
                                    className={`text-sm font-semibold p-2 rounded-md transition-colors ${detalles ? 'text-red-600 hover:bg-red-50' : 'text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    {detalles ? 'Eliminar detalles' : 'Agregar detalles'}
                                </button>
                                {detalles !== '' && ( // Mostrar textarea si detalles no está vacío
                                    <textarea
                                        value={detalles}
                                        onChange={(e) => setDetalles(e.target.value)}
                                        placeholder="Escriba aquí cualquier observación o detalle adicional..."
                                        className="mt-2 w-full p-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        rows={3}
                                    />
                                )}
                            </div>
                        </AnimatedDiv>
                    </form>
                </main>

                <footer className="p-6 flex justify-center flex-shrink-0 bg-white border-t border-gray-100">
                    <AnimatedDiv show={showEnviarBoton}>
                        <button type="submit" form="alistamiento-form" className="w-full max-w-xs py-3 px-8 text-lg font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition-all">
                            Enviar Alistamiento
                        </button>
                    </AnimatedDiv>
                </footer>
            </div>
        </div>
    );
};

export default AlistamientoScreen;
