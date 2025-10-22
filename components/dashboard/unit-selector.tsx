"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Building2, ChevronDown, Settings } from "lucide-react";
import { MenuItem } from "./menu-item";

export function UnitSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-white hover:bg-primary transition-colors">
          <Building2 className="w-4 h-4 group-hover:text-white" />
          <span>Minha unidade</span>
          <ChevronDown className="w-4 h-4 group-hover:text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Selecione uma unidade</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <MenuItem icon={Building2} label="Unidade Principal" />
        <MenuItem icon={Building2} label="Unidade Centro" />
        <MenuItem icon={Building2} label="Unidade Norte" />
        <MenuItem icon={Building2} label="Unidade Sul" />
        
        <DropdownMenuSeparator />
        
        <MenuItem icon={Settings} label="Gerenciar unidades" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
