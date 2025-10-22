"use client";

import { UnitSelector } from "./unit-selector";
import { UserMenu } from "./user-menu";

export function DashboardHeader() {
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
