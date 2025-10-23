"use client";

import { UnitSelector } from "./dashboard/unit-selector";
import { UserMenu } from "./dashboard/user-menu";

export function Navbar() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold text-xl shadow-md">
              Senha Já
            </div>
            <UnitSelector />
          </div>
          <div className="flex items-center gap-4">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
