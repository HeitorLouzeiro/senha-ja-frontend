import { MenuCard } from "./menu-card";
import {
  Settings,
  ClipboardList,
  IdCard,
  ArrowUpDown,
  List,
} from "lucide-react";

export function AdministrationSection() {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <div className="w-1 h-6 bg-secondary rounded-full"></div>
        Administração
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MenuCard icon={Settings} title="Sistema" variant="admin" />
        <MenuCard icon={ClipboardList} title="Serviços" variant="admin" />
        <MenuCard icon={IdCard} title="Perfis" variant="admin" />
        <MenuCard icon={ArrowUpDown} title="Prioridades" variant="admin" />
        <MenuCard icon={List} title="Locais" variant="admin" />
      </div>
    </div>
  );
}
