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
import { CheckCircle, Search } from "lucide-react";

interface FinishServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (serviceIds: string[]) => void;
  ticketNumber?: string;
  clientName?: string;
  services: Array<{ id: string; name: string }>;
}

export function FinishServiceDialog({
  open,
  onOpenChange,
  onConfirm,
  ticketNumber = "A001",
  clientName = "",
  services = [],
}: FinishServiceDialogProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleConfirm = () => {
    onConfirm(selectedServices);
    setSelectedServices([]);
    setSearchTerm("");
    onOpenChange(false);
  };

  const handleClose = () => {
    setSelectedServices([]);
    setSearchTerm("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogClose onClose={handleClose} />
        
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <DialogTitle>Encerrar Atendimento</DialogTitle>
              <DialogDescription>
                Finalize o atendimento e adicione observações se necessário
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Senha:</span>{" "}
              <span className="text-green-600 font-bold">{ticketNumber}</span>
            </p>
            {clientName && (
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Cliente:</span> {clientName}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Serviços Realizados <span className="text-red-500">*</span>
              </label>
              
              {/* Campo de Pesquisa */}
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquisar serviços..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Lista de Serviços */}
              <div className="border border-gray-300 rounded-lg p-3 max-h-60 overflow-y-auto space-y-2">
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <label
                      key={service.id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service.id)}
                        onChange={() => handleToggleService(service.id)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{service.name}</span>
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Nenhum serviço encontrado
                  </p>
                )}
              </div>
              {selectedServices.length > 0 && (
                <p className="text-xs text-green-600 mt-2">
                  ✓ {selectedServices.length} serviço(s) selecionado(s)
                </p>
              )}
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-600 leading-relaxed">
                ✅ O atendimento será marcado como concluído e o registro será salvo no histórico
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
            disabled={selectedServices.length === 0}
            className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Encerrar Atendimento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
