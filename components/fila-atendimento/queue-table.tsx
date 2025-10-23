interface QueueItem {
  id: string;
  actions: string;
  passwordArrival: string;
  scheduled: string;
  service: string;
  priority: string;
  waiting: string;
  name: string;
  details: string;
}

interface QueueTableProps {
  items: QueueItem[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export function QueueTable({
  items,
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}: QueueTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      {/* Tabs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex overflow-x-auto">
          <button className="px-4 lg:px-6 py-3 text-xs lg:text-sm font-medium text-blue-600 border-b-2 border-blue-600 bg-white whitespace-nowrap">
            📋 Próximas Senhas
          </button>
          <button className="px-4 lg:px-6 py-3 text-xs lg:text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 whitespace-nowrap transition-colors">
            ✅ Últimos Atendimentos
          </button>
          <button className="px-4 lg:px-6 py-3 text-xs lg:text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 whitespace-nowrap transition-colors">
            📊 Consolidados
          </button>
          <button className="px-4 lg:px-6 py-3 text-xs lg:text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 whitespace-nowrap transition-colors">
            ❌ Canceladas
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            🔍 Filtros:
          </label>
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
            <option>Todos os Serviços</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
            <option>Todas as Prioridades</option>
          </select>
          <button className="sm:ml-auto bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors shadow-sm">
            Filtrar
          </button>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-50 border-b-2 border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Ações
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Senha/Chegada
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Agendado
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Serviço
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Prioridade
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Espera
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Nome
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Detalhes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {items.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-6xl text-gray-300">📋</div>
                    <p className="text-gray-500 font-medium">Nenhuma senha na fila</p>
                    <p className="text-sm text-gray-400">As próximas senhas aparecerão aqui</p>
                  </div>
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {item.actions}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {item.passwordArrival}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.scheduled}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {item.service}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.waiting}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.details}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="px-4 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 font-medium">
            Página <span className="text-blue-600">{currentPage}</span> de <span className="text-blue-600">{totalPages || 1}</span>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 flex-1 max-w-xs">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              ‹
            </button>
            <div className="flex-1 bg-gray-300 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: `${totalPages > 0 ? (currentPage / totalPages) * 100 : 0}%`,
                }}
              />
            </div>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              ›
            </button>
          </div>

          <div className="text-sm text-gray-600">
            Total: <span className="font-semibold text-gray-800">{totalItems} senha(s)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
