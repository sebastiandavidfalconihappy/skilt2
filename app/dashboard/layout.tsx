"use client";

import { Button } from "@/components/ui/button"; // Importar ShadCN Button
import Link from "next/link";
import { useState, useEffect } from "react";

export default function DashboardLayout({ children }) {
  // Estado para almacenar la hora actual
  const [currentTime, setCurrentTime] = useState("");

  // Función para actualizar la hora
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    // Actualiza la hora cada segundo
    const interval = setInterval(updateTime, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <div className="flex-1 flex flex-col">
        {/* Top bar con botones */}
        <header className="bg-blue-900 p-4 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Panel de Control</h2>
            <nav className="flex items-center space-x-6">
              {/* Hora actual */}
              <div className="text-white font-medium">{currentTime}</div>

              {/* Avatar del usuario */}
              <div className="flex items-center space-x-2">
                <img
                  src="https://i.pinimg.com/originals/8c/99/1f/8c991fda1a6e144d249ee6fd0b6b90cf.png"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <span className="text-white">Usuario</span>
              </div>
            </nav>
          </div>
          <div className="flex justify-between items-center mt-4">
            <nav className="flex space-x-4">
              <Link href="/dashboard/consulta">
                <Button variant="default" className="bg-transparent border-2 border-transparent hover:border-blue-600 text-white hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Consulta
                </Button>
              </Link>
              <Link href="/dashboard/transferencias">
                <Button variant="default" className="bg-transparent border-2 border-transparent hover:border-blue-600 text-white hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Transferencias
                </Button>
              </Link>
              <Link href="/dashboard/reportes">
                <Button variant="default" className="bg-transparent border-2 border-transparent hover:border-blue-600 text-white hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Reportes
                </Button>
              </Link>
              <Link href="/dashboard/perfil">
                <Button variant="default" className="bg-transparent border-2 border-transparent hover:border-blue-600 text-white hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Perfil
                </Button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="flex-1 bg-white p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
