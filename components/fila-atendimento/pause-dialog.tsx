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
import { Pause } from "lucide-react";

interface PauseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reason: string) => void;
}

const pauseReasons = [
  { id: "cafe", label: "☕ Café / Intervalo" },
  { id: "almoco", label: "🍽️ Almoço" },
  { id: "banheiro", label: "🚻 Banheiro" },
  { id: "reuniao", label: "👥 Reunião" },
  { id: "tecnico", label: "🔧 Problema Técnico" },
  { id: "outro", label: "📝 Outro Motivo" },
];

export function PauseDialog({
  open,
  onOpenChange,
  onConfirm,
}: PauseDialogProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const handleConfirm = () => {
    const reason = selectedReason === "outro" ? otherReason : pauseReasons.find(r => r.id === selectedReason)?.label || "";
    if (reason.trim()) {
      onConfirm(reason);
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
      <DialogContent className="max-w-md">
        <DialogClose onClose={handleClose} />
        
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Pause className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <DialogTitle>Pausar Atendimento</DialogTitle>
              <DialogDescription>
                Selecione o motivo da pausa
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-4">
          <div className="space-y-3">
            {pauseReasons.map((reason) => (
              <label
                key={reason.id}
                className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedReason === reason.id
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                }`}
              >
                <input
                  type="radio"
                  name="pauseReason"
                  value={reason.id}
                  checked={selectedReason === reason.id}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-4 h-4 text-orange-600 focus:ring-2 focus:ring-orange-500"
                />
                <span className="text-sm font-medium text-gray-700">{reason.label}</span>
              </label>
            ))}

            {selectedReason === "outro" && (
              <div className="mt-3 animate-in fade-in duration-200">
                <textarea
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  placeholder="Descreva o motivo da pausa..."
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                  rows={3}
                />
              </div>
            )}
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-4">
            <p className="text-xs text-orange-700 leading-relaxed">
              ⏸️ Durante a pausa, você não poderá atender novas senhas até retomar o atendimento
            </p>
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
            disabled={!selectedReason || (selectedReason === "outro" && !otherReason.trim())}
            className="bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar Pausa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
