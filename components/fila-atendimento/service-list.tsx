import { Briefcase, ChevronRight } from "lucide-react";

interface Service {
  id: string;
  name: string;
}

interface ServiceListProps {
  services: Service[];
}

export function ServiceList({ services }: ServiceListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-3 border-b border-gray-200">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          Serviços Disponíveis
        </h2>
      </div>
      <div className="p-2">
        {services.length === 0 ? (
          <div className="px-3 py-6 text-center text-gray-400 text-sm">
            Nenhum serviço disponível
          </div>
        ) : (
          <div className="space-y-1">
            {services.map((service) => (
              <button
                key={service.id}
                className="w-full bg-gray-50 hover:bg-blue-50 px-3 py-3 rounded-lg text-gray-700 hover:text-blue-700 text-sm font-medium transition-all flex items-center justify-between group border border-transparent hover:border-blue-200"
              >
                <span>{service.name}</span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
