"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, Baby, Accessibility } from "lucide-react";

interface PrioritySelectorProps {
  selectedPriority: "normal" | "priority";
  selectedPriorityType: string | null;
  onSelectPriority: (priority: "normal" | "priority") => void;
  onSelectPriorityType: (type: string | null) => void;
}

const priorityTypes = [
  { id: "idoso", label: "Idoso (60+)", icon: Users },
  { id: "gestante", label: "Gestante", icon: Baby },
  { id: "deficiente", label: "Deficiente", icon: Accessibility },
  { id: "lactante", label: "Lactante", icon: Baby },
  { id: "outros", label: "Outros", icon: UserCheck },
];

export function PrioritySelector({
  selectedPriority,
  selectedPriorityType,
  onSelectPriority,
  onSelectPriorityType,
}: PrioritySelectorProps) {
  return (
    <Card className="p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-3">Tipo de Atendimento</h2>
      
      {/* Tipo de senha */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => {
            onSelectPriority("normal");
            onSelectPriorityType(null);
          }}
          className={`
            p-4 rounded-lg border-2 text-center transition-all duration-200
            ${
              selectedPriority === "normal"
                ? "border-green-600 bg-green-50 shadow-lg scale-[1.02]"
                : "border-gray-200 hover:border-green-300 hover:bg-green-50/50 hover:shadow-md"
            }
          `}
        >
          <div className="text-3xl mb-2">👤</div>
          <h3 className="font-semibold text-base text-gray-900">Normal</h3>
          <p className="text-xs text-gray-600 mt-1">Atendimento padrão</p>
          {selectedPriority === "normal" && (
            <div className="mt-2 text-green-600 text-xs font-medium">✓ Selecionado</div>
          )}
        </button>

        <button
          onClick={() => onSelectPriority("priority")}
          className={`
            p-4 rounded-lg border-2 text-center transition-all duration-200
            ${
              selectedPriority === "priority"
                ? "border-orange-600 bg-orange-50 shadow-lg scale-[1.02]"
                : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 hover:shadow-md"
            }
          `}
        >
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-semibold text-base text-gray-900">Preferencial</h3>
          <p className="text-xs text-gray-600 mt-1">Atendimento prioritário</p>
          {selectedPriority === "priority" && (
            <div className="mt-2 text-orange-600 text-xs font-medium">✓ Selecionado</div>
          )}
        </button>
      </div>

      {/* Tipos de prioridade */}
      {selectedPriority === "priority" && (
        <div className="pt-4 border-t border-gray-200 animate-in fade-in duration-300">
          <h3 className="text-sm font-semibold mb-3 text-gray-900">Motivo da Prioridade</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {priorityTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => onSelectPriorityType(type.id)}
                  className={`
                    p-2.5 rounded-lg border-2 text-left transition-all duration-200 flex items-center gap-2
                    ${
                      selectedPriorityType === type.id
                        ? "border-orange-600 bg-orange-50 shadow-md"
                        : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50"
                    }
                  `}
                >
                  <Icon className="w-4 h-4 text-gray-700 shrink-0" />
                  <span className="text-xs font-medium text-gray-900">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}
