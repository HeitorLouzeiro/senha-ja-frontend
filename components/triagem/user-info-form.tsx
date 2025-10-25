"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, FileText } from "lucide-react";

interface UserInfoFormProps {
  userName: string;
  userDocument: string;
  onUserNameChange: (name: string) => void;
  onUserDocumentChange: (document: string) => void;
}

export function UserInfoForm({
  userName,
  userDocument,
  onUserNameChange,
  onUserDocumentChange,
}: UserInfoFormProps) {
  // Formatar CPF enquanto digita
  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove não-números
    
    // Limita a 11 dígitos (CPF)
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    
    // Formata CPF: 000.000.000-00
    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    }
    
    onUserDocumentChange(value);
  };

  return (
    <Card className="p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-3 text-gray-900">
        👤 Informações do Cliente (Opcional)
      </h2>
      
      <div className="space-y-3">
        {/* Nome */}
        <div>
          <Label htmlFor="user-name" className="text-xs font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            Nome Completo
          </Label>
          <Input
            id="user-name"
            type="text"
            placeholder="Ex: João da Silva"
            value={userName}
            onChange={(e) => onUserNameChange(e.target.value)}
            className="mt-1 h-9 text-sm"
          />
        </div>

        {/* Documento (CPF) */}
        <div>
          <Label htmlFor="user-document" className="text-xs font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            CPF
          </Label>
          <Input
            id="user-document"
            type="text"
            placeholder="000.000.000-00"
            value={userDocument}
            onChange={handleDocumentChange}
            maxLength={14}
            className="mt-1 h-9 text-sm"
          />
        </div>
      </div>

      {/* Info adicional */}
      {(userName || userDocument) && (
        <div className="mt-3 p-2.5 bg-blue-50 border-l-4 border-blue-400 rounded-r-md">
          <div className="flex items-start gap-2">
            <span className="text-blue-600 text-xs flex-shrink-0">ℹ️</span>
            <p className="text-xs text-blue-800 leading-relaxed">
              Estes dados serão associados à senha gerada.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
