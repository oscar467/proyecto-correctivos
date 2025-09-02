import React, { useEffect, useRef, useState } from "react";
import {
    MantenimientoCorrectivoIcon,
    IconoCheckList,
    MantenimientoPreventivoIcon,
    FamiliaIcon

} from "./Icons"; // Importar desde Icons.tsx
import { PiUserCircleFill, PiBuildingOfficeFill } from "react-icons/pi";

interface MenuScreenProps {
    username: string;
    companyName: string;
    onLogout: () => void;
    onNavigateToAlistamiento: () => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({
    username,
    companyName,
    onLogout,
    onNavigateToAlistamiento,
}) => {
    const mainRef = useRef<HTMLElement>(null); // Referencia al elemento main

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Asegura que el scroll esté al inicio cuando el componente se monta
        if (mainRef.current) {
            mainRef.current.scrollTo(0, 0);
        }

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

    const menuOptions = [
        {
            label: "Mantenimiento Preventivo",
            icon: <MantenimientoPreventivoIcon className="w-10 h-10" />,
            action: () => alert("Función no implementada"),
            implemented: false,
        },
        {
            label: "Mantenimiento Correctivo",
            icon: <MantenimientoCorrectivoIcon className="w-10 h-10" />,
            action: () => alert("Función no implementada"),
            implemented: false,
        },
        {
            label: "Alistamiento Diario",
            icon: <IconoCheckList className="w-10 h-10" />,
            action: onNavigateToAlistamiento,
            implemented: true,
        },
        {
            label: "Autorización de Menores",
            icon: <FamiliaIcon className="w-10 h-10" />,
            action: () => alert("Función no implementada"),
            implemented: false,
        },
        {
            label: "Cambiar Contraseña",
            icon: "🔒",
            action: () => alert("Función no implementada"),
            implemented: false,
        },
        {
            label: "Cerrar Sesión",
            icon: "🚪",
            action: onLogout,
            isLogout: true,
            implemented: true,
        },
    ];

    companyName = "Empresa De Prueba";

    return (
        <div className={`w-full md:max-w-md lg:max-w-full lg:w-4/5  h-screen flex flex-col space-y-6 bg-white-100 overflow-hidden ${isMobile ? "lg:w-full" : ""}`}>
            <div
                className={`w-full h-full flex flex-col gap-4 bg-white rounded-2xl shadow-lg md:max-h-[calc(100%-5%)] lg:max-h-full lg:h-full ${
                    isMobile ? "mt-20" : ""
                }`}
            >
                {" "}
                {/* Aplicado max-h con calc */}
                {/* --- HEADER CARD --- */}
                <header className="bg-blue-500 text-white p-4 rounded-2xl flex items-center gap-4 shadow-lg flex-shrink-0">
                    <div className="bg-blue-400 w-16 h-16 lg:w-26 lg:h-26 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        Logo
                    </div>
                    <div className="flex-grow md:w-full flex flex-col justify-around p-2">
                        <h2 className="font-bold md:text-2xl lg:text-xl flex flex-row items-center">
                            <PiBuildingOfficeFill  className="w-6 h-6 text-white mr-2" />
                            {companyName}
                        </h2>
                        <p className="text-blue-100 text-sm flex flex-row items-center font-bold">
                            <PiUserCircleFill  className="w-6 h-6 text-white mr-2" />
                            {username}
                        </p>
                    </div>
                    <div className="flex-grow flex justify-end md:w-0 lg:w-full">
                        <img
                            className={`text-blue-600 rounded-full shadow-xl bg-white h-20 ${
                                isMobile ? "hidden" : "block"
                            }`}
                            src="/logo-calisoft-sas.webp"
                            alt="Logo_Calisoft"
                        />
                    </div>
                </header>
                {/* --- MENU GRID --- */}
                <main
                    ref={mainRef}
                    className="grid grid-cols-2 gap-4 flex-grow p-4 overflow-y-auto"
                >
                    {menuOptions.map((option) => (
                        <div
                            key={option.label}
                            onClick={
                                option.implemented ? option.action : undefined
                            } // Deshabilita el click si no está implementado
                            className={`
              p-4 rounded-2xl shadow-md flex flex-col items-center justify-center gap-2 
              flex-grow transition-transform duration-200
              ${
                  option.isLogout
                      ? "bg-red-100 text-red-600 font-bold"
                      : option.implemented
                      ? "bg-white text-gray-700 cursor-pointer hover:scale-105 active:scale-95"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed grayscale opacity-50"
              }
            `}
                        >
                            {typeof option.icon === "string" ? (
                                <span
                                    className="text-4xl"
                                    role="img"
                                    aria-label={option.label}
                                >
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
