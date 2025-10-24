"use client";

import { Button } from "@/components/ui/button";
import { Search, Bell } from "lucide-react";

interface ActionButtonsProps {
  onConsultTicket?: () => void;
  onEnableNotification?: () => void;
}

export function ActionButtons({
  onConsultTicket,
  onEnableNotification,
}: ActionButtonsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
      <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
        Ações Rápidas
      </h3>
      <div className="flex flex-col gap-2">
        <Button
          onClick={onConsultTicket}
          variant="outline"
          className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-300 py-2.5 rounded-lg shadow-sm flex items-center justify-center gap-2 font-medium transition-all text-xs"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Consultar Senha</span>
        </Button>

        <Button
          onClick={onEnableNotification}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 py-2.5 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-semibold transition-all border-2 border-yellow-600 text-xs"
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Habilitar Notificação</span>
        </Button>
      </div>
    </div>
  );
}
