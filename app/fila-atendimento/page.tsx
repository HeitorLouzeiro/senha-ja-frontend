"use client";

import { useState } from "react";
import {
  UnitHeader,
  ServiceList,
  CallNextButton,
  LocationSelector,
  SettingsPanel,
  QueueTable,
  AttendancePanel,
  ActionButtons,
} from "@/components/fila-atendimento";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function FilaAtendimentoPage() {
  // Estados para as configurações
  const [newPasswordAlert, setNewPasswordAlert] = useState(false);
  const [keyboardShortcuts, setKeyboardShortcuts] = useState(true);
  const [autoCall, setAutoCall] = useState(false);

  // Estados para a fila
  const [currentPage, setCurrentPage] = useState(1);
  const [queueItems] = useState([
    // Exemplo de dados - substitua com dados reais da API
  ]);

  // Estado para atendimento atual
  const [currentAttendance, setCurrentAttendance] = useState<{
    ticketNumber: string;
    service: string;
    priority: string;
    clientName: string;
    clientDocument: string;
  } | null>(null);

  // Dados de exemplo
  const services = [
    { id: "1", name: "Serviço 1" },
  ];

  const handleCallNext = () => {
    console.log("Chamar próxima senha");
    // Simular chamada de próxima senha
    setCurrentAttendance({
      ticketNumber: "A001",
      service: "Serviço 1",
      priority: "Normal",
      clientName: "",
      clientDocument: "",
    });
  };

  const handleCallAgain = () => {
    console.log("Chamar novamente");
    // Implementar lógica de chamar novamente
  };

  const handleStartService = () => {
    console.log("Iniciar atendimento");
    // Implementar lógica de iniciar atendimento
  };

  const handleNoShow = () => {
    console.log("Não compareceu");
    // Implementar lógica de não compareceu
    setCurrentAttendance(null);
  };

  const handleChangeLocation = () => {
    console.log("Alterar local");
    // Implementar lógica de alterar local
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Implementar lógica de paginação
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 px-4 py-6 lg:px-6 lg:py-8">
        <div className="max-w-[1920px] mx-auto space-y-6">
          {/* Cabeçalho com nome da unidade */}
          <UnitHeader unitName="GUICHE-1" />

          {/* Painel de Atendimento Atual - Destaque quando há atendimento ativo */}
          {currentAttendance && (
            <div className="animate-in fade-in duration-300">
              <AttendancePanel
                ticketNumber={currentAttendance.ticketNumber}
                service={currentAttendance.service}
                priority={currentAttendance.priority}
                clientName={currentAttendance.clientName}
                clientDocument={currentAttendance.clientDocument}
                onCallAgain={handleCallAgain}
                onStartService={handleStartService}
                onNoShow={handleNoShow}
              />
            </div>
          )}

          {/* Layout Principal - Grade Responsiva */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-6">
            {/* Coluna Esquerda - Controles e Serviços */}
            <aside className="xl:col-span-3 2xl:col-span-2 space-y-4">
              {/* Lista de Serviços */}
              <div className="bg-white rounded-lg shadow-sm">
                <ServiceList services={services} />
              </div>

              {/* Botão Chamar Próxima Senha */}
              <CallNextButton onClick={handleCallNext} />

              {/* Seletor de Local */}
              <LocationSelector
                currentLocation="GUICHE-1"
                onChangeLocation={handleChangeLocation}
              />

              {/* Botões de Ação Adicionais - Apenas quando há atendimento */}
              {currentAttendance && (
                <div className="hidden xl:block">
                  <ActionButtons
                    onConsultTicket={() => console.log("Consultar senha")}
                    onEnableNotification={() => console.log("Habilitar notificação")}
                  />
                </div>
              )}
            </aside>

            {/* Coluna Central - Tabela de Filas */}
            <section className="xl:col-span-6 2xl:col-span-7">
              <QueueTable
                items={queueItems}
                currentPage={currentPage}
                totalPages={1}
                totalItems={0}
                onPageChange={handlePageChange}
              />
            </section>

            {/* Coluna Direita - Painel de Configurações */}
            <aside className="xl:col-span-3 2xl:col-span-3">
              <div className="sticky top-6">
                <SettingsPanel
                  newPasswordAlert={newPasswordAlert}
                  onNewPasswordAlertChange={setNewPasswordAlert}
                  keyboardShortcuts={keyboardShortcuts}
                  onKeyboardShortcutsChange={setKeyboardShortcuts}
                  autoCall={autoCall}
                  onAutoCallChange={setAutoCall}
                />
              </div>
            </aside>
          </div>

          {/* Botões de Ação Mobile - Aparecem apenas em telas menores */}
          {currentAttendance && (
            <div className="xl:hidden">
              <ActionButtons
                onConsultTicket={() => console.log("Consultar senha")}
                onEnableNotification={() => console.log("Habilitar notificação")}
              />
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
