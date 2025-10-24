"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Megaphone, Play, UserX, CheckCircle, AlertTriangle, Pause, MapPin, Zap, Search, Bell, Printer, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface AttendancePanelProps {
  hasActiveAttendance?: boolean;
  ticketNumber?: string;
  service?: string;
  priority?: string;
  clientName?: string;
  clientDocument?: string;
  isServiceStarted?: boolean;
  isStartingService?: boolean;
  isPaused?: boolean;
  currentLocation?: string;
  attendanceStartTime?: Date;
  onCallNext?: () => void;
  onChangeLocation?: () => void;
  onPauseService?: () => void;
  onResumeService?: () => void;
  onConsultTicket?: () => void;
  onEnableNotification?: () => void;
  onCallAgain?: () => void;
  onStartService?: () => void;
  onNoShow?: () => void;
  onFinishService?: () => void;
  onTriageError?: () => void;
}

export function AttendancePanel({
  hasActiveAttendance = false,
  ticketNumber = "A001",
  service = "Serviço 1",
  priority = "Normal",
  clientName = "",
  clientDocument = "",
  isServiceStarted = false,
  isStartingService = false,
  isPaused = false,
  currentLocation = "GUICHE-1",
  attendanceStartTime,
  onCallNext,
  onChangeLocation,
  onPauseService,
  onResumeService,
  onConsultTicket,
  onEnableNotification,
  onCallAgain,
  onStartService,
  onNoShow,
  onFinishService,
  onTriageError,
}: AttendancePanelProps) {
  const [elapsedTime, setElapsedTime] = useState("00:00:00");

  useEffect(() => {
    if (!hasActiveAttendance || !attendanceStartTime || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - attendanceStartTime.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setElapsedTime(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [hasActiveAttendance, attendanceStartTime, isPaused]);

  return (
    <Card className={`shadow-lg border-2 ${hasActiveAttendance ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200' : 'bg-white border-gray-200'}`}>
      <div className="p-6">
        {!hasActiveAttendance ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Painel de Controle</h2>
            
            {/* Botão Chamar e Local Atual - Lado a Lado */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Botão Chamar Próxima Senha */}
              <Button onClick={onCallNext} className="h-full min-h-[80px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all">
                <Megaphone className="w-6 h-6 mr-3" />
                Chamar Próxima Senha
              </Button>
              
              {/* Local Atual */}
              <Card className="bg-gray-50 border border-gray-200">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-600" />
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase">Local Atual</label>
                        <p className="text-lg font-bold text-gray-800">{currentLocation}</p>
                      </div>
                    </div>
                    <Button onClick={onChangeLocation} variant="outline" size="sm" className="text-blue-600 border-blue-300 hover:bg-blue-50">Alterar</Button>
                  </div>
                </div>
              </Card>
            </div>
            
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-600" />
                  Ações Rápidas
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <Button 
                    onClick={onPauseService} 
                    variant="outline" 
                    className="w-full flex flex-col items-center justify-center h-16 gap-1 border-orange-300 hover:bg-orange-50 text-orange-700 hover:text-orange-800 [&_svg]:!opacity-100"
                    title="Pausar atendimento"
                  >
                    <Pause className="w-4 h-4" />
                    <span className="text-xs font-medium">Pausar</span>
                  </Button>
                  <Button 
                    onClick={onTriageError} 
                    variant="outline" 
                    className="w-full flex flex-col items-center justify-center h-16 gap-1 border-yellow-300 hover:bg-yellow-50 text-yellow-700 hover:text-yellow-800 [&_svg]:!opacity-100"
                    title="Gerar senha de triagem"
                  >
                    <Printer className="w-4 h-4" />
                    <span className="text-xs font-medium">Triagem</span>
                  </Button>
                  <Button 
                    onClick={onConsultTicket} 
                    variant="outline" 
                    className="w-full flex flex-col items-center justify-center h-16 gap-1 border-purple-300 hover:bg-purple-50 text-purple-700 hover:text-purple-800 [&_svg]:!opacity-100"
                    title="Consultar senha"
                  >
                    <Search className="w-4 h-4" />
                    <span className="text-xs font-medium">Consultar</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                Atendimento em Andamento
              </h2>
              <div className="flex items-center gap-2 bg-blue-100 border border-blue-300 rounded-lg px-3 py-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-blue-800">{elapsedTime}</span>
              </div>
            </div>
            {isPaused && (
              <div className="bg-orange-100 border-2 border-orange-300 rounded-lg p-3 flex items-center gap-2">
                <Pause className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">Atendimento pausado</span>
              </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">Informações da Senha</h3>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Senha</label>
                      <p className="text-3xl font-bold text-blue-600 mt-1">{ticketNumber}</p>
                    </div>
                    <div className="text-right">
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Prioridade</label>
                      <p className="text-lg font-semibold text-orange-600 mt-1">{priority}</p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Serviço</label>
                    <p className="text-lg font-semibold text-gray-800 mt-1">{service}</p>
                  </div>
                </div>
                {!isServiceStarted ? (
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <Button onClick={onCallAgain} variant="outline" className="flex flex-col items-center justify-center h-20 gap-1.5 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all">
                      <Megaphone className="w-5 h-5 text-gray-600" />
                      <span className="text-xs font-medium text-gray-700">Chamar Novamente</span>
                    </Button>
                    <Button onClick={onStartService} disabled={isStartingService || isPaused} className="flex flex-col items-center justify-center h-20 gap-1.5 bg-blue-600 hover:bg-blue-700 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
                      {isStartingService ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span className="text-xs font-medium">Iniciando...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          <span className="text-xs font-medium">Iniciar Atendimento</span>
                        </>
                      )}
                    </Button>
                    <Button onClick={onNoShow} variant="outline" className="flex flex-col items-center justify-center h-20 gap-1.5 border-2 border-red-300 hover:bg-red-50 hover:border-red-400 transition-all">
                      <UserX className="w-5 h-5 text-red-600" />
                      <span className="text-xs font-medium text-red-700">Não Compareceu</span>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3 mt-6">
                    {!isPaused && (
                      <div className="bg-green-100 border-2 border-green-300 rounded-lg p-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold text-green-800">Atendimento em andamento</span>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      <Button onClick={onFinishService} disabled={isPaused} className="flex flex-col items-center justify-center h-20 gap-1.5 bg-green-600 hover:bg-green-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-xs font-medium">Encerrar Atendimento</span>
                      </Button>
                      <Button onClick={onTriageError} disabled={isPaused} variant="outline" className="flex flex-col items-center justify-center h-20 gap-1.5 border-2 border-yellow-300 hover:bg-yellow-50 hover:border-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <span className="text-xs font-medium text-yellow-700">Erro de Triagem</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Dados do Cliente</h3>
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-300 hover:bg-blue-50 text-xs">✏️ Editar</Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">Nome Completo</label>
                    <div className="border-2 border-gray-200 rounded-lg p-3 bg-gray-50 min-h-[48px] flex items-center">
                      {clientName ? <span className="text-gray-800 font-medium">{clientName}</span> : <span className="text-gray-400 italic">Não informado</span>}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">Documento (CPF/RG)</label>
                    <div className="border-2 border-gray-200 rounded-lg p-3 bg-gray-50 min-h-[48px] flex items-center">
                      {clientDocument ? <span className="text-gray-800 font-medium">{clientDocument}</span> : <span className="text-gray-400 italic">Não informado</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
