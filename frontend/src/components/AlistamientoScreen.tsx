import React, { useState, useEffect, useMemo } from "react";
import { LicensePlateIcon, IdCardIcon } from "./Icons"; // Importamos los nuevos iconos
import { IconoCheckList } from "./Icons";

// Icono para el botón de "Volver"
const BackArrowIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
        />
    </svg>
);

interface AlistamientoScreenProps {
    onBackToMenu: () => void;
}

// Componente para animar la entrada de los campos
const AnimatedDiv: React.FC<{ show: boolean; children: React.ReactNode }> = ({
    show,
    children,
}) => {
    const [isVisible, setIsVisible] = useState(show); // Inicializa con el valor de show

    useEffect(() => {
        // Actualiza isVisible cuando la prop show cambia
        const timer = setTimeout(() => setIsVisible(show), 50);
        return () => clearTimeout(timer);
    }, [show]);

    return (
        <div
            className={`transition-all duration-300 ease-in-out transform overflow-hidden
                    ${
                        isVisible
                            ? "opacity-100 translate-y-0 max-h-screen"
                            : "opacity-0 -translate-y-2 max-h-0"
                    }`}
        >
            {children}
        </div>
    );
};

const AlistamientoScreen: React.FC<AlistamientoScreenProps> = ({
    onBackToMenu,
}) => {
    // --- ESTADO PARA LOS CAMPOS Y FUNCIONALIDADES ---
    const [numeroInterno, setNumeroInterno] = useState("");
    const [tipoDoc, setTipoDoc] = useState("");
    const [documento, setDocumento] = useState("");
    const [detalles, setDetalles] = useState("");
    // Estados para controlar la visibilidad de los campos
    const [showTipoDoc, setShowTipoDoc] = useState(false);
    const [showNumeroDoc, setShowNumeroDoc] = useState(false);
    const [showNombreChecklist, setShowNombreChecklist] = useState(false);
    const [showEnviarBoton, setShowEnviarBoton] = useState(false);

    const [isMobile, setIsMobile] = useState(false);

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
        "Botiquín",
    ];
    // Estado para los checkboxes de la checklist
    const [checkedItems, setCheckedItems] = useState<boolean[]>(
        new Array(checklistItems.length).fill(false)
    );
    const [fillAllChecked, setFillAllChecked] = useState(false); // Nuevo estado para "llenar todos"

    useEffect(() => {
        const userAgent = navigator.userAgent;
        const mobileRegex =
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|rim)|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
        const tabletRegex = /android|ipad|playbook|silk/i;

        if (mobileRegex.test(userAgent) || tabletRegex.test(userAgent)) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, []);

    // Lógica para controlar la visibilidad de los campos
    useEffect(() => {
        const isNumeroInternoCompleto =
            numeroInterno.length === 4 &&
            !isNaN(Number(numeroInterno.charAt(0)));
        const isPlacaCompleta =
            numeroInterno.length === 6 && /[A-Z]/.test(numeroInterno.charAt(0));
        setShowTipoDoc(isNumeroInternoCompleto || isPlacaCompleta);
    }, [numeroInterno]);

    useEffect(() => {
        // Mostrar Número de Documento cuando se selecciona Tipo de Documento
        setShowNumeroDoc(tipoDoc !== "");
    }, [tipoDoc]);

    useEffect(() => {
        // Mostrar Nombre y Checklist cuando se ingresan al menos 5 dígitos en Número de Documento
        setShowNombreChecklist(documento.length >= 5);
    }, [documento]);

    useEffect(() => {
        // Mostrar botón Enviar cuando todos los items de la checklist están marcados
        setShowEnviarBoton(checkedItems.every((item) => item));
    }, [checkedItems]);

    const handleChecklistItemChange = (index: number) => {
        if (fillAllChecked) {
            // Si "llenar todos" está marcado, no permitir desmarcar
            return;
        }
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
    };

    const handleFillAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setFillAllChecked(isChecked);
        if (isChecked) {
            // Si "llenar todos" está marcado, marcar todos los checkboxes individuales
            setCheckedItems(new Array(checklistItems.length).fill(true));
        } else {
            // Si "llenar todos" se desmarca, desmarcar todos los checkboxes individuales
            setCheckedItems(new Array(checklistItems.length).fill(false));
        }
    };

    const handleNumeroInternoChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        let value = e.target.value.toUpperCase(); // Convertir a mayúsculas para placas

        if (value.length === 0) {
            setNumeroInterno("");
            return;
        }

        const firstChar = value.charAt(0);

        if (!isNaN(Number(firstChar))) {
            // Empieza con número (Número Interno)
            // Permitir solo dígitos y máximo 4 caracteres
            value = value.replace(/\D/g, "").substring(0, 4);
        } else if (/[A-Z]/.test(firstChar)) {
            // Empieza con letra (Placa)
            // Primeros 3 caracteres letras, siguientes números, máximo 6 caracteres
            let formattedValue = "";
            for (let i = 0; i < value.length; i++) {
                if (i < 3) {
                    // Primeros 3 caracteres
                    if (/[A-Z]/.test(value[i])) {
                        formattedValue += value[i];
                    } else {
                        break; // Si no es letra, detener
                    }
                } else {
                    // Caracteres restantes
                    if (!isNaN(Number(value[i]))) {
                        formattedValue += value[i];
                    } else {
                        break; // Si no es número, detener
                    }
                }
                if (formattedValue.length >= 6) break; // Máximo 6 caracteres
            }
            value = formattedValue;
        } else {
            // Si el primer carácter no es número ni letra, limpiar el input
            value = "";
        }
        setNumeroInterno(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!checkedItems.every((item) => item)) {
            alert(
                "Por favor, complete todos los puntos de la checklist antes de enviar."
            );
            return;
        }
        alert(
            `Formulario enviado.\nNúmero Interno: ${numeroInterno}\nDocumento: ${tipoDoc} ${documento}\nDetalles: ${detalles}`
        );
        onBackToMenu();
    };

    // --- LÓGICA PARA MOSTRAR LA INFORMACIÓN CONTEXTUAL ---
    const isNumeroInterno =
        numeroInterno.length > 0 && !isNaN(Number(numeroInterno.charAt(0)));
    const isPlaca =
        numeroInterno.length > 0 && /[A-Z]/.test(numeroInterno.charAt(0));

    const showPlacaSugerida =
        (isNumeroInterno && numeroInterno.length === 4) ||
        (isPlaca && numeroInterno.length === 6);

    const placaSugeridaTexto = useMemo(() => {
        if (isNumeroInterno) {
            return `Placa: ABC123`;
        } else if (isPlaca) {
            return `Número Interno: 1234`;
        }
        return "";
    }, [numeroInterno, isNumeroInterno, isPlaca]);

    const showNombreSugerido = documento.length >= 5; // Ahora depende de 5 dígitos en documento
    const nombreSugerido = "Juan Perez"; // Nombre de ejemplo

    return (
        <div className={`w-full h-screen md:max-w-xl lg:max-w-4xl mx-none pt-0 space-y-6 bg-white-100 ${isMobile ? 'mt-[25vh]' : ''}`}>
            <div className="w-full h-screen bg-white rounded-2xl shadow-lg flex flex-col ">
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
                        <span role="img" aria-label="checklist icon">
                            <IconoCheckList className="w-10 h-10" />
                        </span>
                        Alistamiento Diario
                    </h1>
                </header>

                {/* --- CONTENIDO DEL FORMULARIO CON NUEVAS FUNCIONES --- */}
                <main className="flex-grow p-6 space-y-6 overflow-y-auto">
                    <form
                        id="alistamiento-form"
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        {/* Campo Número Interno con icono y lógica */}
                        <AnimatedDiv show={true}>
                            {" "}
                            {/* Siempre visible */}
                            <div>
                                <label
                                    htmlFor="numero-interno"
                                    className="block text-sm font-semibold text-gray-600 mb-1"
                                >
                                    Número Interno/Placa del vehiculo
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <LicensePlateIcon className="w-5 h-5 text-gray-400" />
                                    </span>
                                    <input
                                        type="text"
                                        id="numero-interno"
                                        required
                                        placeholder="0123/ABC123"
                                        value={numeroInterno}
                                        onChange={handleNumeroInternoChange}
                                        className="w-full pl-10 px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* Caja de información para placa sugerida */}
                                {showPlacaSugerida && (
                                    <div className="mt-2 p-2 bg-gray-100 text-blue-600 text-sm font-semibold rounded-lg text-center transition-all duration-300">
                                        {placaSugeridaTexto}
                                    </div>
                                )}
                            </div>
                        </AnimatedDiv>

                        {/* Campo Tipo de Documento con icono */}
                        <AnimatedDiv show={showTipoDoc}>
                            <div>
                                <label
                                    htmlFor="tipoDoc"
                                    className="block text-sm font-semibold text-gray-600 mb-1"
                                >
                                    Tipo de Documento del Conductor
                                </label>
                                <div className="relative flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                                    <div className="flex items-center justify-between w-full md:w-auto p-2 border border-gray-300 rounded-lg">
                                        <label htmlFor="tipoDocCC" className="flex items-center text-sm font-medium text-gray-700 cursor-pointer mr-2">
                                            <span className="flex items-center pr-2">
                                                <IdCardIcon className="w-5 h-5 text-gray-400" />
                                            </span>
                                            Cédula de Ciudadanía
                                        </label>
                                        <input
                                            type="radio"
                                            id="tipoDocCC"
                                            name="tipoDoc"
                                            value="CC"
                                            checked={tipoDoc === "CC"}
                                            onChange={(e) => setTipoDoc(e.target.value)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 ml-auto"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between w-full md:w-auto p-2 border border-gray-300 rounded-lg">
                                        <label htmlFor="tipoDocCE" className="flex items-center text-sm font-medium text-gray-700 cursor-pointer mr-2">
                                            <span className="flex items-center pr-2">
                                                <IdCardIcon className="w-5 h-5 text-gray-400" />
                                            </span>
                                            Cédula de Extranjería
                                        </label>
                                        <input
                                            type="radio"
                                            id="tipoDocCE"
                                            name="tipoDoc"
                                            value="CE"
                                            checked={tipoDoc === "CE"}
                                            onChange={(e) => setTipoDoc(e.target.value)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 ml-auto"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between w-full md:w-auto p-2 border border-gray-300 rounded-lg">
                                        <label htmlFor="tipoDocPA" className="flex items-center text-sm font-medium text-gray-700 cursor-pointer mr-2">
                                            <span className="flex items-center pr-2">
                                                <IdCardIcon className="w-5 h-5 text-gray-400" />
                                            </span>
                                            Pasaporte
                                        </label>
                                        <input
                                            type="radio"
                                            id="tipoDocPA"
                                            name="tipoDoc"
                                            value="PA"
                                            checked={tipoDoc === "PA"}
                                            onChange={(e) => setTipoDoc(e.target.value)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 ml-auto"
                                        />
                                    </div>
                                </div>
                            </div>
                        </AnimatedDiv>

                        {/* Campo Número de Documento con icono y lógica */}
                        <AnimatedDiv show={showNumeroDoc}>
                            <div>
                                <label
                                    htmlFor="documento"
                                    className="block text-sm font-semibold text-gray-600 mb-1"
                                >
                                    Número de Documento del Conductor
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
                                        onChange={(e) =>
                                            setDocumento(e.target.value)
                                        }
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
                            <div className="bg-gray-50 p-2 rounded-xl border border-gray-200 flex flex-col text-left">
                                <div className={`flex ${isMobile ? 'flex-col' : 'flex-row justify-between  items-center'}  pl-2`}>
                                    <h3 className="text-blue-600 font-bold text-lg mb-4">
                                        ✅ Actividades Minimas
                                    </h3>
                                    {/* Checkbox "Llenar todos" */}
                                    <div className="flex items-center gap-3 text-gray-700 cursor-pointer justify-between mb-4 bg-blue-100 p-2 rounded-full">
                                        <span className={`font-semibold text-sm`}>
                                            Llenar todos
                                        </span>
                                        <input
                                            type="checkbox"
                                            checked={fillAllChecked}
                                            onChange={handleFillAllChange}
                                            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3 p-2">
                                    {checklistItems.map((item, index) => (
                                        <div className="flex flex-col mb-2">
                                            <label
                                                key={item}
                                                className="flex items-center gap-3 text-gray-700 cursor-pointer justify-between"
                                            >
                                                <span className="text-md">
                                                    {item}
                                                </span>
                                                <input
                                                    type="checkbox"
                                                    id={item}
                                                    checked={
                                                        checkedItems[index]
                                                    }
                                                    onChange={() =>
                                                        handleChecklistItemChange(
                                                            index
                                                        )
                                                    }
                                                    disabled={fillAllChecked}
                                                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                            </label>
                                            <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AnimatedDiv>

                        {/* --- FUNCIONALIDAD DE DETALLES --- */}
                        <AnimatedDiv show={showNombreChecklist}>
                            {" "}
                            {/* Mostrar detalles junto con nombre y checklist */}
                            <div className="pt-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setDetalles(detalles ? "" : " ")
                                    } // Toggle para mostrar/ocultar textarea
                                    className={`text-sm font-semibold p-2 rounded-md transition-colors ${
                                        detalles
                                            ? "text-red-600 hover:bg-red-50"
                                            : "text-gray-500 hover:bg-gray-100"
                                    }`}
                                >
                                    {detalles
                                        ? "Eliminar detalles"
                                        : "Agregar detalles"}
                                </button>
                                {detalles !== "" && ( // Mostrar textarea si detalles no está vacío
                                    <textarea
                                        value={detalles}
                                        onChange={(e) =>
                                            setDetalles(e.target.value)
                                        }
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
                        <button
                            type="submit"
                            form="alistamiento-form"
                            className="w-full max-w-xs py-3 px-8 text-lg font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition-all"
                        >
                            Enviar Alistamiento
                        </button>
                    </AnimatedDiv>
                </footer>
            </div>
        </div>
    );
};

export default AlistamientoScreen;
