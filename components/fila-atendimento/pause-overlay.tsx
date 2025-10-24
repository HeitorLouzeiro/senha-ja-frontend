"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

interface PauseOverlayProps {
  pauseReason: string;
  onResume: () => void;
}

export function PauseOverlay({ pauseReason, onResume }: PauseOverlayProps) {
  const [pauseTime, setPauseTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPauseTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fechar com ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onResume();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onResume]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-300 shadow-2xl">
        <div className="p-8 text-center space-y-6">
          {/* Ícone Animado */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
                <Pause className="w-12 h-12 text-orange-600" />
              </div>
              <div className="absolute inset-0 w-24 h-24 bg-orange-200 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>

          {/* Título */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Atendimento Pausado
            </h2>
            <p className="text-sm text-gray-600">
              O atendimento está temporariamente suspenso
            </p>
          </div>

          {/* Motivo da Pausa */}
          <Card className="bg-white border-2 border-orange-200">
            <div className="p-4">
              <label className="text-xs font-semibold text-orange-600 uppercase tracking-wide block mb-2">
                Motivo da Pausa
              </label>
              <p className="text-base font-medium text-gray-800">{pauseReason}</p>
            </div>
          </Card>

          {/* Contador de Tempo */}
          <Card className="bg-white border-2 border-orange-200">
            <div className="p-4">
              <label className="text-xs font-semibold text-orange-600 uppercase tracking-wide block mb-2">
                Tempo em Pausa
              </label>
              <p className="text-3xl font-bold text-orange-600 font-mono">{formatTime(pauseTime)}</p>
            </div>
          </Card>

          {/* Botão Retomar */}
          <Button
            onClick={onResume}
            className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Play className="w-5 h-5 mr-2" />
            Retomar Atendimento
          </Button>

          {/* Aviso */}
          <div className="bg-orange-100 border border-orange-300 rounded-lg p-3">
            <p className="text-xs text-orange-700 leading-relaxed">
              ℹ️ Clique em "Retomar Atendimento" para voltar a atender senhas
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
