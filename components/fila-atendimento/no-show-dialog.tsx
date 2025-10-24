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
import { UserX } from "lucide-react";

interface NoShowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  ticketNumber?: string;
  clientName?: string;
}

export function NoShowDialog({
  open,
  onOpenChange,
  onConfirm,
  ticketNumber = "A001",
  clientName = "",
}: NoShowDialogProps) {
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
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <UserX className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <DialogTitle>Confirmar Não Comparecimento</DialogTitle>
              <DialogDescription>
                Esta ação não pode ser desfeita
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Senha:</span>{" "}
              <span className="text-orange-600 font-bold">{ticketNumber}</span>
            </p>
            {clientName && (
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Cliente:</span> {clientName}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-700 font-medium">
              Você confirma que o cliente não compareceu ao atendimento?
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-600 leading-relaxed">
                ⚠️ Ao confirmar, a senha será marcada como "Não Compareceu" e será
                removida da fila de atendimento. O histórico será registrado no sistema.
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
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            Confirmar Não Comparecimento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
