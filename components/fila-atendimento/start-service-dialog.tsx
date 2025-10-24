"use client";

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
import { Play, CheckCircle } from "lucide-react";

interface StartServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  ticketNumber?: string;
  clientName?: string;
  service?: string;
}

export function StartServiceDialog({
  open,
  onOpenChange,
  onConfirm,
  ticketNumber = "A001",
  clientName = "",
  service = "",
}: StartServiceDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogClose onClose={() => onOpenChange(false)} />
        
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Play className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <DialogTitle>Iniciar Atendimento</DialogTitle>
              <DialogDescription>
                Confirme o início do atendimento
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Senha:</span>{" "}
                <span className="text-blue-600 font-bold">{ticketNumber}</span>
              </p>
              {service && (
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Serviço:</span> {service}
                </p>
              )}
              {clientName && (
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Cliente:</span> {clientName}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                O atendimento será iniciado e o cronômetro começará a contar
              </p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-600 leading-relaxed">
                💡 Após iniciar, você poderá encerrar o atendimento ou reportar erro de triagem
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-gray-700 border-gray-300 hover:bg-gray-100"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Iniciar Atendimento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
