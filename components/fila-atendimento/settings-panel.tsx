import { ToggleSwitch } from "./toggle-switch";

interface SettingsPanelProps {
  newPasswordAlert: boolean;
  onNewPasswordAlertChange: (enabled: boolean) => void;
  keyboardShortcuts: boolean;
  onKeyboardShortcutsChange: (enabled: boolean) => void;
  autoCall: boolean;
  onAutoCallChange: (enabled: boolean) => void;
  autoNoShowOnSecondCall: boolean;
  onAutoNoShowOnSecondCallChange: (enabled: boolean) => void;
}

export function SettingsPanel({
  newPasswordAlert,
  onNewPasswordAlertChange,
  keyboardShortcuts,
  onKeyboardShortcutsChange,
  autoCall,
  onAutoCallChange,
  autoNoShowOnSecondCall,
  onAutoNoShowOnSecondCallChange,
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
              Atalhos: <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded font-semibold">F1</span> Chamar/Repetir, 
              <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded font-semibold ml-1">F2</span> Iniciar/Encerrar, 
              <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded font-semibold ml-1">F3</span> Não Compareceu/Erro
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

      {/* Não compareceu automático na 2ª chamada */}
      <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              🚫 Não Compareceu Automático
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Marca automaticamente como "não compareceu" ao chamar a mesma senha pela 2ª vez
            </p>
          </div>
          <ToggleSwitch
            id="auto-no-show"
            enabled={autoNoShowOnSecondCall}
            onChange={onAutoNoShowOnSecondCallChange}
          />
        </div>
      </div>
    </div>
  );
}
