"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Printer } from "lucide-react";

interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketNumber: string;
  serviceName: string;
  priority: string;
  userName?: string;
  userDocument?: string;
  onPrint: () => void;
  onNewTicket: () => void;
}

export function SuccessModal({
  open,
  onOpenChange,
  ticketNumber,
  serviceName,
  priority,
  userName,
  userDocument,
  onPrint,
  onNewTicket,
}: SuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {/* Header com ícone de sucesso */}
        <DialogHeader className="space-y-0 border-b-0 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Check className="w-7 h-7 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-semibold">
              Senha Gerada com Sucesso!
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Conteúdo */}
        <div className="px-6 pb-6 space-y-6">
          {/* Card do número da senha */}
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <div className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">
              Número da Senha
            </div>
            <div className="text-7xl font-bold text-blue-600 mb-5 tracking-tight leading-none">
              {ticketNumber}
            </div>
            <div className="text-base text-gray-700 font-medium">
              <span>{serviceName}</span>
              <span className="mx-2 text-gray-400">•</span>
              <span>{priority}</span>
            </div>
            
            {/* Informações do usuário se fornecidas */}
            {(userName || userDocument) && (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-1">
                {userName && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Nome:</span> {userName}
                  </div>
                )}
                {userDocument && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">CPF:</span> {userDocument}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Alerta de aguardar */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md">
            <div className="flex items-center gap-3">
              <span className="text-yellow-600 text-lg flex-shrink-0">⚠️</span>
              <p className="text-sm text-yellow-800 font-medium leading-relaxed">
                Por favor, aguarde ser chamado no painel de atendimento
              </p>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="px-6 pb-6 grid grid-cols-2 gap-3">
          <Button
            onClick={onPrint}
            variant="outline"
            size="lg"
            className="w-full h-12 text-base font-medium border-2 hover:bg-gray-50"
          >
            <Printer className="mr-2 h-5 w-5" />
            Imprimir
          </Button>
          <Button
            onClick={onNewTicket}
            size="lg"
            className="w-full h-12 text-base font-semibold bg-green-600 hover:bg-green-700 shadow-sm"
          >
            <Check className="mr-2 h-5 w-5" />
            Nova Senha
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
