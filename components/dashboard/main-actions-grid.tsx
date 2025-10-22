import { MenuCard } from "./menu-card";
import {
  Calendar,
  FileText,
  UserCircle,
  Settings,
  Monitor,
  BarChart3,
  Printer,
  Users,
} from "lucide-react";

export function MainActionsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MenuCard icon={Calendar} title="Agendamento" />
      <MenuCard icon={FileText} title="Fila de Atendimento" />
      <MenuCard icon={UserCircle} title="Clientes" />
      <MenuCard icon={Settings} title="Configurações" />
      <MenuCard icon={Monitor} title="Monitor" />
      <MenuCard icon={BarChart3} title="Relatórios" />
      <MenuCard icon={Printer} title="Triagem" />
      <MenuCard icon={Users} title="Usuários" />
    </div>
  );
}
