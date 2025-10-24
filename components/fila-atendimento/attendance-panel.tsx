"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Megaphone, Play, UserX, CheckCircle, AlertTriangle } from "lucide-react";

interface AttendancePanelProps {
  ticketNumber?: string;
  service?: string;
  priority?: string;
  clientName?: string;
  clientDocument?: string;
  isServiceStarted?: boolean;
  isStartingService?: boolean;
  onCallAgain?: () => void;
  onStartService?: () => void;
  onNoShow?: () => void;
  onFinishService?: () => void;
  onTriageError?: () => void;
}

export function AttendancePanel({
  ticketNumber = "A001",
  service = "Serviço 1",
  priority = "Normal",
  clientName = "",
  clientDocument = "",
  isServiceStarted = false,
  isStartingService = false,
  onCallAgain,
  onStartService,
  onNoShow,
  onFinishService,
  onTriageError,
}: AttendancePanelProps) {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg border-2 border-blue-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            Atendimento em Andamento
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Painel de Informações da Senha */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
              Informações da Senha
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Senha
                  </label>
                  <p className="text-3xl font-bold text-blue-600 mt-1">{ticketNumber}</p>
                </div>
                <div className="text-right">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Prioridade
                  </label>
                  <p className="text-lg font-semibold text-orange-600 mt-1">{priority}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Serviço
                </label>
                <p className="text-lg font-semibold text-gray-800 mt-1">{service}</p>
              </div>
            </div>

            {/* Botões de Ação da Senha */}
            {!isServiceStarted ? (
              // Botões antes de iniciar o atendimento
              <div className="grid grid-cols-3 gap-3 mt-6">
                <Button
                  onClick={onCallAgain}
                  variant="outline"
                  className="flex flex-col items-center justify-center h-20 gap-1.5 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all"
                >
                  <Megaphone className="w-5 h-5 text-gray-600" />
                  <span className="text-xs font-medium text-gray-700">Chamar Novamente</span>
                </Button>

                <Button
                  onClick={onStartService}
                  disabled={isStartingService}
                  className="flex flex-col items-center justify-center h-20 gap-1.5 bg-blue-600 hover:bg-blue-700 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
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

                <Button
                  onClick={onNoShow}
                  variant="outline"
                  className="flex flex-col items-center justify-center h-20 gap-1.5 border-2 border-red-300 hover:bg-red-50 hover:border-red-400 transition-all"
                >
                  <UserX className="w-5 h-5 text-red-600" />
                  <span className="text-xs font-medium text-red-700">Não Compareceu</span>
                </Button>
              </div>
            ) : (
              // Botões após iniciar o atendimento
              <div className="space-y-3 mt-6">
                <div className="bg-green-100 border-2 border-green-300 rounded-lg p-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-green-800">Atendimento em andamento</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={onFinishService}
                    className="flex flex-col items-center justify-center h-20 gap-1.5 bg-green-600 hover:bg-green-700 transition-all shadow-md"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-xs font-medium">Encerrar Atendimento</span>
                  </Button>

                  <Button
                    onClick={onTriageError}
                    variant="outline"
                    className="flex flex-col items-center justify-center h-20 gap-1.5 border-2 border-yellow-300 hover:bg-yellow-50 hover:border-yellow-400 transition-all"
                  >
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <span className="text-xs font-medium text-yellow-700">Erro de Triagem</span>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Painel de Informações do Cliente */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Dados do Cliente
              </h3>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-blue-600 border-blue-300 hover:bg-blue-50 text-xs"
              >
                ✏️ Editar
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">
                  Nome Completo
                </label>
                <div className="border-2 border-gray-200 rounded-lg p-3 bg-gray-50 min-h-[48px] flex items-center">
                  {clientName ? (
                    <span className="text-gray-800 font-medium">{clientName}</span>
                  ) : (
                    <span className="text-gray-400 italic">Não informado</span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">
                  Documento (CPF/RG)
                </label>
                <div className="border-2 border-gray-200 rounded-lg p-3 bg-gray-50 min-h-[48px] flex items-center">
                  {clientDocument ? (
                    <span className="text-gray-800 font-medium">{clientDocument}</span>
                  ) : (
                    <span className="text-gray-400 italic">Não informado</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
