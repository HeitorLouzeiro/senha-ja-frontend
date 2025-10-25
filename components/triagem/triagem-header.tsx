"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, User, Clock } from "lucide-react";

interface TriagemHeaderProps {
  unitName: string;
  attendantName: string;
  currentTime: string;
}

export function TriagemHeader({
  unitName,
  attendantName,
  currentTime,
}: TriagemHeaderProps) {
  return (
    <Card className="p-4 shadow-md border-l-4 border-l-blue-600">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold mb-2 text-gray-900">
            🎫 Triagem - Geração de Senhas
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-medium">{unitName}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-medium">{attendantName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-medium font-mono">{currentTime}</span>
            </div>
          </div>
        </div>
        <div>
          <Badge variant="secondary" className="text-sm px-4 py-1.5 bg-green-100 text-green-700 border border-green-300">
            <span className="inline-block w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
            Em Operação
          </Badge>
        </div>
      </div>
    </Card>
  );
}
