"use client";

import { useState } from "react";
import {
  UnitHeader,
  ServiceList,
  SettingsPanel,
  QueueTable,
  AttendancePanel,
  CancelTicketDialog,
  NoShowDialog,
  FinishServiceDialog,
  TriageErrorDialog,
  PauseDialog,
  PauseOverlay,
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
  
  // 📋 DADOS MOCKADOS PARA TESTE - 10 senhas na fila
  // Inclui senhas normais (A) e prioritárias (P)
  // 📅 Agendadas vs 🎫 Geradas na hora
  const [queueItems] = useState([
    {
      id: "1",
      actions: "👁️",
      passwordArrival: "A001 - 08:30",
      scheduled: "08:30", // Agendada
      service: "Consulta Geral",
      priority: "Normal",
      waiting: "5 min",
      name: "João Silva",
      details: "📅 Agendado",
      isScheduled: true,
    },
    {
      id: "2",
      actions: "👁️",
      passwordArrival: "P002 - 08:35",
      scheduled: "-", // Não agendada
      service: "Atendimento Prioritário",
      priority: "Preferencial",
      waiting: "10 min",
      name: "Maria Santos",
      details: "🎫 Senha na hora | Idoso",
      isScheduled: false,
    },
    {
      id: "3",
      actions: "👁️",
      passwordArrival: "A003 - 08:40",
      scheduled: "08:40", // Agendada
      service: "Documentação",
      priority: "Normal",
      waiting: "15 min",
      name: "Carlos Oliveira",
      details: "📅 Agendado | Renovação",
      isScheduled: true,
    },
    {
      id: "4",
      actions: "👁️",
      passwordArrival: "P004 - 08:42",
      scheduled: "-", // Não agendada
      service: "Consulta Especializada",
      priority: "Preferencial",
      waiting: "17 min",
      name: "Ana Paula Costa",
      details: "🎫 Senha na hora | Gestante",
      isScheduled: false,
    },
    {
      id: "5",
      actions: "👁️",
      passwordArrival: "A005 - 08:45",
      scheduled: "-", // Não agendada
      service: "Informações",
      priority: "Normal",
      waiting: "20 min",
      name: "Pedro Henrique",
      details: "🎫 Senha na hora",
      isScheduled: false,
    },
    {
      id: "6",
      actions: "👁️",
      passwordArrival: "A006 - 08:50",
      scheduled: "08:50", // Agendada
      service: "Consulta Geral",
      priority: "Normal",
      waiting: "25 min",
      name: "Juliana Ferreira",
      details: "📅 Agendado | Retorno",
      isScheduled: true,
    },
    {
      id: "7",
      actions: "👁️",
      passwordArrival: "P007 - 08:52",
      scheduled: "-", // Não agendada
      service: "Atendimento Prioritário",
      priority: "Preferencial",
      waiting: "27 min",
      name: "Roberto Carlos",
      details: "🎫 Senha na hora | Deficiente",
      isScheduled: false,
    },
    {
      id: "8",
      actions: "👁️",
      passwordArrival: "A008 - 08:55",
      scheduled: "08:55", // Agendada
      service: "Documentação",
      priority: "Normal",
      waiting: "30 min",
      name: "Fernanda Lima",
      details: "📅 Agendado | Certidão",
      isScheduled: true,
    },
    {
      id: "9",
      actions: "👁️",
      passwordArrival: "A009 - 09:00",
      scheduled: "-", // Não agendada
      service: "Consulta Geral",
      priority: "Normal",
      waiting: "35 min",
      name: "Lucas Martins",
      details: "🎫 Senha na hora",
      isScheduled: false,
    },
    {
      id: "10",
      actions: "👁️",
      passwordArrival: "P010 - 09:02",
      scheduled: "09:02", // Agendada
      service: "Atendimento Prioritário",
      priority: "Preferencial",
      waiting: "37 min",
      name: "Helena Rodrigues",
      details: "📅 Agendado | Idosa",
      isScheduled: true,
    },
  ]);

  // Estado para atendimento atual
  const [currentAttendance, setCurrentAttendance] = useState<{
    ticketNumber: string;
    service: string;
    priority: string;
    clientName: string;
    clientDocument: string;
    startTime: Date;
  } | null>(null);

  // Estado para o dialog de cancelamento
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [ticketToCancel, setTicketToCancel] = useState<string>("");

  // Estado para o dialog de não comparecimento
  const [noShowDialogOpen, setNoShowDialogOpen] = useState(false);

  // Estados para os dialogs de atendimento
  const [finishServiceDialogOpen, setFinishServiceDialogOpen] = useState(false);
  const [triageErrorDialogOpen, setTriageErrorDialogOpen] = useState(false);
  const [isServiceStarted, setIsServiceStarted] = useState(false);
  const [isStartingService, setIsStartingService] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseDialogOpen, setPauseDialogOpen] = useState(false);
  const [pauseReason, setPauseReason] = useState("");

  // 🏥 SERVIÇOS DISPONÍVEIS - 7 tipos diferentes
  const services = [
    { id: "1", name: "Consulta Geral" },
    { id: "2", name: "Atendimento Prioritário" },
    { id: "3", name: "Documentação" },
    { id: "4", name: "Consulta Especializada" },
    { id: "5", name: "Informações" },
    { id: "6", name: "Agendamento" },
    { id: "7", name: "Renovação" },
  ];

  const handleCallNext = () => {
    console.log("Chamar próxima senha");
    // Simular chamada de próxima senha
    const nextInQueue = queueItems[0];
    if (nextInQueue) {
      setCurrentAttendance({
        ticketNumber: nextInQueue.passwordArrival.split(" - ")[0],
        service: nextInQueue.service,
        priority: nextInQueue.priority,
        clientName: nextInQueue.name,
        clientDocument: "123.456.789-00",
        startTime: new Date(),
      });
    } else {
      setCurrentAttendance({
        ticketNumber: "A001",
        service: "Consulta Geral",
        priority: "Normal",
        clientName: "João Silva",
        clientDocument: "123.456.789-00",
        startTime: new Date(),
      });
    }
  };

  const handleCallAgain = () => {
    console.log("Chamar novamente");
    // Implementar lógica de chamar novamente
  };

  const handleStartService = async () => {
    // Mostrar loading e iniciar atendimento
    setIsStartingService(true);
    console.log("Iniciando atendimento...");
    console.log(`Senha ${currentAttendance?.ticketNumber} - atendimento em andamento`);
    
    // Simular loading (remover quando integrar com API real)
    setTimeout(() => {
      setIsServiceStarted(true);
      setIsStartingService(false);
    }, 1500);
    
    // Implementar lógica de iniciar atendimento (chamar API, iniciar timer)
  };

  const handleNoShow = () => {
    setNoShowDialogOpen(true);
  };

  const handleConfirmNoShow = () => {
    console.log("Não compareceu confirmado");
    console.log(`Senha ${currentAttendance?.ticketNumber} marcada como não compareceu`);
    // Implementar lógica de não compareceu (chamar API)
    setCurrentAttendance(null);
    setIsServiceStarted(false);
    setIsPaused(false);
    setNoShowDialogOpen(false);
  };

  const handleFinishService = () => {
    setFinishServiceDialogOpen(true);
  };

  const handleConfirmFinishService = (serviceIds: string[]) => {
    const serviceNames = serviceIds
      .map(id => services.find(s => s.id === id)?.name)
      .filter(Boolean)
      .join(", ");
    
    console.log("Atendimento encerrado");
    console.log(`Senha ${currentAttendance?.ticketNumber}`);
    console.log(`Serviços realizados: ${serviceNames}`);
    console.log(`IDs dos serviços: ${serviceIds.join(", ")}`);
    // Implementar lógica de encerrar atendimento (chamar API)
    setCurrentAttendance(null);
    setIsServiceStarted(false);
    setIsPaused(false);
    setFinishServiceDialogOpen(false);
  };

  const handleTriageError = () => {
    setTriageErrorDialogOpen(true);
  };

  const handleConfirmTriageError = (correctService: string) => {
    console.log("Erro de triagem reportado");
    console.log(`Senha ${currentAttendance?.ticketNumber}`);
    console.log(`Serviço atual: ${currentAttendance?.service}`);
    console.log(`Serviço correto: ${correctService}`);
    // Implementar lógica de erro de triagem (chamar API, redirecionar)
    setCurrentAttendance(null);
    setIsServiceStarted(false);
    setIsPaused(false);
    setTriageErrorDialogOpen(false);
  };

  const handleChangeLocation = () => {
    console.log("Alterar local");
    // Implementar lógica de alterar local
  };

  const handlePauseService = () => {
    setPauseDialogOpen(true);
  };

  const handleConfirmPause = (reason: string) => {
    console.log("Pausando atendimento");
    console.log(`Motivo: ${reason}`);
    setPauseReason(reason);
    setIsPaused(true);
    setPauseDialogOpen(false);
  };

  const handleResumeService = () => {
    console.log("Retomando atendimento");
    setIsPaused(false);
    setPauseReason("");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Implementar lógica de paginação
  };

  const handleCancelTicket = (ticketNumber: string) => {
    setTicketToCancel(ticketNumber);
    setCancelDialogOpen(true);
  };

  const handleCallTicketFromTable = (ticketNumber: string, item: any) => {
    console.log(`Chamando senha ${ticketNumber}`);
    setCurrentAttendance({
      ticketNumber: ticketNumber,
      service: item.service,
      priority: item.priority,
      clientName: item.name,
      clientDocument: "123.456.789-00",
      startTime: new Date(),
    });
  };

  const handleStartServiceFromTable = async (ticketNumber: string, item: any) => {
    console.log(`Iniciando atendimento da senha ${ticketNumber}`);
    
    // Primeiro, chama a senha se não estiver em atendimento
    if (!currentAttendance || currentAttendance.ticketNumber !== ticketNumber) {
      setCurrentAttendance({
        ticketNumber: ticketNumber,
        service: item.service,
        priority: item.priority,
        clientName: item.name,
        clientDocument: "123.456.789-00",
        startTime: new Date(),
      });
    }
    
    // Depois inicia o serviço
    setIsStartingService(true);
    setTimeout(() => {
      setIsServiceStarted(true);
      setIsStartingService(false);
    }, 1500);
  };

  const handleConfirmCancel = (reason: string) => {
    console.log(`Senha ${ticketToCancel} cancelada. Motivo: ${reason}`);
    // Implementar lógica de cancelamento
    // Aqui você faria a chamada para a API
    setCancelDialogOpen(false);
    setTicketToCancel("");
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

          {/* Painel de Atendimento / Controle */}
          <AttendancePanel
            hasActiveAttendance={currentAttendance !== null}
            ticketNumber={currentAttendance?.ticketNumber}
            service={currentAttendance?.service}
            priority={currentAttendance?.priority}
            clientName={currentAttendance?.clientName}
            clientDocument={currentAttendance?.clientDocument}
            isServiceStarted={isServiceStarted}
            isStartingService={isStartingService}
            isPaused={isPaused}
            currentLocation="GUICHE-1"
            attendanceStartTime={currentAttendance?.startTime}
            onCallNext={handleCallNext}
            onChangeLocation={handleChangeLocation}
            onPauseService={handlePauseService}
            onResumeService={handleResumeService}
            onConsultTicket={() => console.log("Consultar senha")}
            onEnableNotification={() => console.log("Habilitar notificação")}
            onCallAgain={handleCallAgain}
            onStartService={handleStartService}
            onNoShow={handleNoShow}
            onFinishService={handleFinishService}
            onTriageError={handleTriageError}
          />

          {/* Layout Principal - Grade Responsiva */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Coluna Esquerda - Tabela de Filas */}
            <section className="lg:col-span-2">
              <QueueTable
                items={queueItems}
                currentPage={currentPage}
                totalPages={2}
                totalItems={queueItems.length}
                onPageChange={handlePageChange}
                onCancelTicket={handleCancelTicket}
                onCallTicket={handleCallTicketFromTable}
                isServiceInProgress={currentAttendance !== null}
              />
            </section>

            {/* Coluna Direita - Painel de Configurações */}
            <aside className="lg:col-span-1">
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
        </div>
      </main>
      
      {/* Footer */}
      <Footer />

      {/* Dialog de Cancelamento */}
      <CancelTicketDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        onConfirm={handleConfirmCancel}
        ticketNumber={ticketToCancel}
      />

      {/* Dialog de Não Comparecimento */}
      <NoShowDialog
        open={noShowDialogOpen}
        onOpenChange={setNoShowDialogOpen}
        onConfirm={handleConfirmNoShow}
        ticketNumber={currentAttendance?.ticketNumber}
        clientName={currentAttendance?.clientName}
      />

      {/* Dialog de Encerrar Atendimento */}
      <FinishServiceDialog
        open={finishServiceDialogOpen}
        onOpenChange={setFinishServiceDialogOpen}
        onConfirm={handleConfirmFinishService}
        ticketNumber={currentAttendance?.ticketNumber}
        clientName={currentAttendance?.clientName}
        services={services}
      />

      {/* Dialog de Erro de Triagem */}
      <TriageErrorDialog
        open={triageErrorDialogOpen}
        onOpenChange={setTriageErrorDialogOpen}
        onConfirm={handleConfirmTriageError}
        ticketNumber={currentAttendance?.ticketNumber}
        currentService={currentAttendance?.service}
      />

      {/* Dialog de Pausar Atendimento */}
      <PauseDialog
        open={pauseDialogOpen}
        onOpenChange={setPauseDialogOpen}
        onConfirm={handleConfirmPause}
      />

      {/* Overlay de Pausa - Bloqueia toda a tela */}
      {isPaused && (
        <PauseOverlay
          pauseReason={pauseReason || ''}
          onResume={handleResumeService}
        />
      )}
    </div>
  );
}
