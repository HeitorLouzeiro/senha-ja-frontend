"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Check } from "lucide-react";

interface TicketGeneratorProps {
  selectedService: string | null;
  selectedPriority: "normal" | "priority";
  selectedPriorityType: string | null;
  serviceName?: string;
  onGenerateTicket: () => void;
  isGenerating: boolean;
}

export function TicketGenerator({
  selectedService,
  selectedPriority,
  selectedPriorityType,
  serviceName,
  onGenerateTicket,
  isGenerating,
}: TicketGeneratorProps) {
  const canGenerate = selectedService && (selectedPriority === "normal" || selectedPriorityType);

  const getPriorityLabel = () => {
    if (selectedPriority === "normal") return "Normal";
    
    const types: Record<string, string> = {
      idoso: "Idoso",
      gestante: "Gestante",
      deficiente: "Deficiente",
      lactante: "Lactante",
      outros: "Outros",
    };
    
    return selectedPriorityType ? types[selectedPriorityType] : "Preferencial";
  };

  return (
    <Card className="p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-4">Resumo da Senha</h2>
      
      <div className="space-y-3 mb-4">
        {/* Serviço */}
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1.5">Serviço</label>
          <div className={`p-3 rounded-lg border-2 transition-colors ${
            selectedService 
              ? "bg-blue-50 border-blue-200 text-gray-900 font-medium text-sm" 
              : "bg-gray-50 border-gray-200 text-gray-500 text-sm"
          }`}>
            {serviceName || "Nenhum serviço selecionado"}
          </div>
        </div>

        {/* Tipo de Atendimento */}
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1.5">Tipo de Atendimento</label>
          <div className={`p-3 rounded-lg border-2 transition-colors ${
            selectedPriority === "priority" 
              ? "bg-orange-50 border-orange-200" 
              : "bg-green-50 border-green-200"
          }`}>
            <div className="flex items-center gap-2">
              {selectedPriority === "priority" ? (
                <>
                  <span className="text-2xl">⚡</span>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">Preferencial</div>
                    {selectedPriorityType && (
                      <div className="text-xs text-gray-600 mt-0.5">{getPriorityLabel()}</div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <span className="text-2xl">👤</span>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">Normal</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Botão de gerar */}
      <Button
        onClick={onGenerateTicket}
        disabled={!canGenerate || isGenerating}
        className="w-full h-12 text-sm font-semibold shadow-md hover:shadow-lg transition-all"
        size="lg"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Gerando Senha...
          </>
        ) : (
          <>
            <Printer className="mr-2 h-4 w-4" />
            Gerar Senha
          </>
        )}
      </Button>

      {!canGenerate && (
        <p className="text-xs text-gray-500 text-center mt-2">
          {!selectedService 
            ? "⬆️ Selecione um serviço para continuar" 
            : "⬆️ Selecione o motivo da prioridade"}
        </p>
      )}
    </Card>
  );
}
