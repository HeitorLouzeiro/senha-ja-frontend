import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface LocationSelectorProps {
  currentLocation: string;
  onChangeLocation: () => void;
}

export function LocationSelector({ currentLocation, onChangeLocation }: LocationSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="mb-3">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
          Local Atual
        </label>
        <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          {currentLocation}
        </p>
      </div>
      <Button
        onClick={onChangeLocation}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-sm transition-all text-sm"
      >
        Alterar Local
      </Button>
    </div>
  );
}
