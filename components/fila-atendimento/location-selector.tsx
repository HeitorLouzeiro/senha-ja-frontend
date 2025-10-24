import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface LocationSelectorProps {
  currentLocation: string;
  onChangeLocation: () => void;
}

export function LocationSelector({ currentLocation, onChangeLocation }: LocationSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
      <div className="mb-2">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
          Local Atual
        </label>
        <p className="text-sm font-semibold text-gray-800 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          {currentLocation}
        </p>
      </div>
      <Button
        onClick={onChangeLocation}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg shadow-sm transition-all text-sm"
      >
        Alterar Local
      </Button>
    </div>
  );
}
