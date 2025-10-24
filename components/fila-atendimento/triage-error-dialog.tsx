"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface TriageErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (correctService: string) => void;
  ticketNumber?: string;
  currentService?: string;
}

export function TriageErrorDialog({
  open,
  onOpenChange,
  onConfirm,
  ticketNumber = "A001",
  currentService = "",
}: TriageErrorDialogProps) {
  const [correctService, setCorrectService] = useState("");

  const handleConfirm = () => {
    if (correctService) {
      onConfirm(correctService);
      setCorrectService("");
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setCorrectService("");
    onOpenChange(false);
  };

  const availableServices = [
    "Consulta Geral",
    "Atendimento Prioritário",
    "Documentação",
    "Consulta Especializada",
    "Informações",
    "Agendamento",
    "Renovação",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogClose onClose={handleClose} />
        
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <DialogTitle>Reportar Erro de Triagem</DialogTitle>
              <DialogDescription>
                Cliente direcionado ao serviço incorreto
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Senha:</span>{" "}
              <span className="text-yellow-600 font-bold">{ticketNumber}</span>
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Serviço atual:</span> {currentService}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Serviço correto *
              </label>
              <select
                value={correctService}
                onChange={(e) => setCorrectService(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">Selecione o serviço correto</option>
                {availableServices.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-600 leading-relaxed">
                ⚠️ O cliente será redirecionado para a fila correta e o erro será registrado para análise
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            className="text-gray-700 border-gray-300 hover:bg-gray-100"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!correctService}
            className="bg-yellow-600 hover:bg-yellow-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar Erro de Triagem
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
