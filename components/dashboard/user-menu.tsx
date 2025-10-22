"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, User, HelpCircle, Lock, LogOut } from "lucide-react";
import { MenuItem } from "./menu-item";

interface UserMenuProps {
  userName?: string;
  userRole?: string;
  userInitial?: string;
}

export function UserMenu({ 
  userName = "HEITOR", 
  userRole = "Administrador",
  userInitial = "H"
}: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 hover:bg-transparent p-0">
          <span className="text-sm text-muted-foreground hidden md:block">
            Bem-vindo {userName}
          </span>
          <Avatar className="cursor-pointer">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {userInitial}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">{userRole}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <MenuItem icon={User} label="Perfil" />
        <MenuItem icon={Settings} label="Configurações" />
        <MenuItem icon={HelpCircle} label="Ajuda?" />
        
        <DropdownMenuSeparator />
        
        <MenuItem icon={Lock} label="Alterar senha" />
        <MenuItem icon={LogOut} label="Sair" variant="destructive" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
