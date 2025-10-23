import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";

interface CallNextButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function CallNextButton({ onClick, disabled = false }: CallNextButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-6 text-base lg:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border-2 border-yellow-600"
    >
      <PhoneCall className="w-5 h-5 lg:w-6 lg:h-6" />
      CHAMAR PRÓXIMA SENHA
    </Button>
  );
}
