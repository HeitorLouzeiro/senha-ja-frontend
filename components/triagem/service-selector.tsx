"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServiceSelectorProps {
  services: Array<{
    id: string;
    name: string;
    description?: string;
    estimatedTime?: string;
  }>;
  selectedServiceId: string | null;
  onSelectService: (serviceId: string) => void;
}

export function ServiceSelector({
  services,
  selectedServiceId,
  onSelectService,
}: ServiceSelectorProps) {
  return (
    <Card className="p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-3">Selecione o Serviço</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelectService(service.id)}
            className={`
              p-3 rounded-lg border-2 text-left transition-all duration-200
              ${
                selectedServiceId === service.id
                  ? "border-blue-600 bg-blue-50 shadow-lg scale-[1.02]"
                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md"
              }
            `}
          >
            <div className="flex justify-between items-start mb-1.5">
              <h3 className="font-semibold text-sm text-gray-900">{service.name}</h3>
              {service.estimatedTime && (
                <Badge variant="secondary" className="text-xs shrink-0 ml-2 py-0 px-1.5">
                  {service.estimatedTime}
                </Badge>
              )}
            </div>
            {service.description && (
              <p className="text-xs text-gray-600 leading-snug">{service.description}</p>
            )}
            {selectedServiceId === service.id && (
              <div className="mt-2 flex items-center gap-1 text-blue-600 text-xs font-medium">
                <span>✓</span>
                <span>Selecionado</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </Card>
  );
}
