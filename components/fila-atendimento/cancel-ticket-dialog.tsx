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

interface CancelTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reason: string) => void;
  ticketNumber?: string;
}

export function CancelTicketDialog({
  open,
  onOpenChange,
  onConfirm,
  ticketNumber = "A001",
}: CancelTicketDialogProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const reasons = [
    "Cliente não compareceu",
    "Cliente desistiu do atendimento",
    "Erro na emissão da senha",
    "Serviço não disponível",
    "Cliente já foi atendido",
    "Outros",
  ];

  const handleConfirm = () => {
    const finalReason = selectedReason === "Outros" ? otherReason : selectedReason;
    if (finalReason) {
      onConfirm(finalReason);
      setSelectedReason("");
      setOtherReason("");
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setSelectedReason("");
    setOtherReason("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogClose onClose={handleClose} />
        
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <DialogTitle>Cancelar Senha</DialogTitle>
              <DialogDescription>
                Senha: <span className="font-bold text-red-600">{ticketNumber}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-4">
          <p className="text-sm text-gray-700 mb-4 font-medium">
            Selecione o motivo do cancelamento:
          </p>

          <div className="space-y-2">
            {reasons.map((reason) => (
              <label
                key={reason}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedReason === reason
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-4 h-4 text-red-600 focus:ring-red-500"
                />
                <span className="ml-3 text-sm text-gray-700">{reason}</span>
              </label>
            ))}
          </div>

          {selectedReason === "Outros" && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descreva o motivo:
              </label>
              <textarea
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                rows={3}
                placeholder="Digite o motivo do cancelamento..."
              />
            </div>
          )}
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
            disabled={!selectedReason || (selectedReason === "Outros" && !otherReason.trim())}
            className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar Cancelamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
