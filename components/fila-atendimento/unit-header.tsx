"use client";

import { Building2, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface UnitHeaderProps {
  unitName: string;
}

export function UnitHeader({ unitName }: UnitHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">{unitName}</h1>
            <p className="text-blue-100 text-sm capitalize">{formatDate(currentTime)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/20 px-4 py-3 rounded-lg">
          <Clock className="w-5 h-5 text-white" />
          <span className="text-2xl font-bold text-white font-mono">{formatTime(currentTime)}</span>
        </div>
      </div>
    </div>
  );
}
