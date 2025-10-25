"use client";

import { Card } from "@/components/ui/card";
import { ToggleSwitch } from "@/components/fila-atendimento/toggle-switch";

interface TriagemSettingsProps {
  showSuccessModal: boolean;
  onShowSuccessModalChange: (enabled: boolean) => void;
  autoPrint: boolean;
  onAutoPrintChange: (enabled: boolean) => void;
}

export function TriagemSettings({
  showSuccessModal,
  onShowSuccessModalChange,
  autoPrint,
  onAutoPrintChange,
}: TriagemSettingsProps) {
  return (
    <Card className="p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-3 text-gray-900">⚙️ Configurações</h2>
      
      <div className="space-y-3">
        {/* Exibir Senha Gerada */}
        <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
          <div className="flex-1 mr-3">
            <div className="font-semibold text-sm text-gray-900 mb-0.5">
              📱 Exibir Senha Gerada
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Mostra um modal com o número da senha
            </p>
          </div>
          <ToggleSwitch
            id="show-success-modal"
            enabled={showSuccessModal}
            onChange={onShowSuccessModalChange}
          />
        </div>

        {/* Habilitar Impressão Automática */}
        <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
          <div className="flex-1 mr-3">
            <div className="font-semibold text-sm text-gray-900 mb-0.5">
              🖨️ Habilitar Impressão
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Imprime automaticamente a senha
            </p>
          </div>
          <ToggleSwitch
            id="auto-print"
            enabled={autoPrint}
            onChange={onAutoPrintChange}
          />
        </div>
      </div>

      {/* Informação adicional */}
      <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
        <div className="flex items-start gap-2">
          <span className="text-blue-600 text-sm flex-shrink-0">ℹ️</span>
          <div className="text-xs text-blue-800">
            <p className="font-medium mb-0.5">Dica:</p>
            <p className="leading-relaxed">
              Com ambas ativadas, a senha será impressa e exibida no modal.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
