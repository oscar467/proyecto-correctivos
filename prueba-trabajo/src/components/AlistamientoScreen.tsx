import React, { useState } from 'react';
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

const AlistamientoScreen: React.FC<AlistamientoScreenProps> = ({ onBackToMenu }) => {
    // --- ESTADO PARA LOS CAMPOS Y FUNCIONALIDADES ---
    const [numeroInterno, setNumeroInterno] = useState('');
    const [tipoDoc, setTipoDoc] = useState('');
    const [documento, setDocumento] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    const [detalles, setDetalles] = useState('');

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Formulario enviado.\nNúmero Interno: ${numeroInterno}\nDocumento: ${tipoDoc} ${documento}\nDetalles: ${detalles}`);
        onBackToMenu();
    }

    // --- LÓGICA PARA MOSTRAR LA INFORMACIÓN CONTEXTUAL ---
    const showPlacaSugerida = numeroInterno.length === 4;
    const showNombreSugerido = tipoDoc && documento;
    // Generamos una placa aleatoria basada en el número interno
    const placaSugerida = `ABC-123`;
    const nombreSugerido = "Juan Perez"; // Nombre de ejemplo

    return (
        // Contenedor exterior que asegura el mismo ancho y espaciado que el menú.
        <div style={{ width: '145%', position: 'relative', left: '-22%', height: '90%' }} className='bg-gray-100 rounded-2xl p-4 max-h-full'>
            <div className="w-full max-w-md mx-auto p-4">
                <div className="w-full bg-white rounded-2xl shadow-lg flex flex-col max-h-[calc(100vh-4rem)] overflow-hidden">

                    {/* --- ENCABEZADO ACTUALIZADO --- */}
                    <header className="relative bg-blue-500 text-white p-4 flex items-center justify-center flex-shrink-0">
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

                            {/* Campo Tipo de Documento con icono */}
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

                            {/* Campo Número de Documento con icono y lógica */}
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

                            {/* Checklist (sin cambios) */}
                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                <h3 className="text-center text-blue-600 font-bold text-lg mb-4">
                                    Checklist Actividades Minimas
                                </h3>
                                <div className="space-y-3">
                                    {checklistItems.map(item => (
                                        <label key={item} className="flex items-center gap-3 text-gray-700 cursor-pointer">
                                            <input type="checkbox" id={item} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                            {item}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* --- FUNCIONALIDAD DE DETALLES --- */}
                            <div className="pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowDetails(!showDetails)}
                                    className={`text-sm font-semibold p-2 rounded-md transition-colors ${showDetails ? 'text-red-600 hover:bg-red-50' : 'text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    {showDetails ? 'Eliminar detalles' : 'Agregar detalles'}
                                </button>
                                {showDetails && (
                                    <textarea
                                        value={detalles}
                                        onChange={(e) => setDetalles(e.target.value)}
                                        placeholder="Escriba aquí cualquier observación o detalle adicional..."
                                        className="mt-2 w-full p-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        rows={3}
                                    />
                                )}
                            </div>
                        </form>
                    </main>

                    <footer className="p-6 flex justify-center flex-shrink-0 bg-white border-t border-gray-100">
                        <button type="submit" form="alistamiento-form" className="w-full max-w-xs py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all">
                            Enviar Alistamiento
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default AlistamientoScreen;