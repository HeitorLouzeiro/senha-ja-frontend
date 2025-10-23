interface ToggleSwitchProps {
  id: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function ToggleSwitch({ id, enabled, onChange }: ToggleSwitchProps) {
  return (
    <button
      id={id}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        enabled ? 'bg-green-500 focus:ring-green-500' : 'bg-gray-300 focus:ring-gray-400'
      }`}
      role="switch"
      aria-checked={enabled}
    >
      <span
        className={`${
          enabled ? 'translate-x-9' : 'translate-x-1'
        } inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-md`}
      />
      <span
        className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${
          enabled ? 'text-white pr-7' : 'text-gray-600 pl-7'
        }`}
      >
        {enabled ? 'ON' : 'OFF'}
      </span>
    </button>
  );
}
