import { ToggleSwitch } from "./toggle-switch";

interface SettingsPanelProps {
  newPasswordAlert: boolean;
  onNewPasswordAlertChange: (enabled: boolean) => void;
  keyboardShortcuts: boolean;
  onKeyboardShortcutsChange: (enabled: boolean) => void;
  autoCall: boolean;
  onAutoCallChange: (enabled: boolean) => void;
}

export function SettingsPanel({
  newPasswordAlert,
  onNewPasswordAlertChange,
  keyboardShortcuts,
  onKeyboardShortcutsChange,
  autoCall,
  onAutoCallChange,
}: SettingsPanelProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 px-1">Configurações</h2>
      
      {/* Alerta de Nova Senha */}
      <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              🔔 Alerta de Nova Senha
            </h3>
            <p className="text-xs text-gray-600">
              Receba notificações quando uma nova senha entrar na fila
            </p>
          </div>
          <ToggleSwitch
            id="new-password-alert"
            enabled={newPasswordAlert}
            onChange={onNewPasswordAlertChange}
          />
        </div>
      </div>

      {/* Atalhos de teclado */}
      <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              ⌨️ Atalhos de Teclado
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Use atalhos rápidos: <span className="font-mono bg-gray-100 px-1 rounded">F1</span> Chamar, 
              <span className="font-mono bg-gray-100 px-1 rounded ml-1">F2</span> Repetir, 
              <span className="font-mono bg-gray-100 px-1 rounded ml-1">F3</span> Cancelar
            </p>
          </div>
          <ToggleSwitch
            id="keyboard-shortcuts"
            enabled={keyboardShortcuts}
            onChange={onKeyboardShortcutsChange}
          />
        </div>
      </div>

      {/* Chamar automaticamente a próxima senha */}
      <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              🤖 Chamada Automática
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              A próxima senha será chamada automaticamente quando você estiver disponível
            </p>
          </div>
          <ToggleSwitch
            id="auto-call"
            enabled={autoCall}
            onChange={onAutoCallChange}
          />
        </div>
      </div>
    </div>
  );
}
