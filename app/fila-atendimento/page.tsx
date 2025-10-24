"use client";

import { useState, useEffect, useCallback } from "react";
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
  AlertToast,
} from "@/components/fila-atendimento";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function FilaAtendimentoPage() {
  // Estado para controlar se estamos no cliente (evita erro de hidratação)
  const [isMounted, setIsMounted] = useState(false);
  
  // Estados para as configurações
  const [newPasswordAlert, setNewPasswordAlert] = useState(false);
  const [keyboardShortcuts, setKeyboardShortcuts] = useState(true);
  const [autoCall, setAutoCall] = useState(false);
  const [autoNoShowOnSecondCall, setAutoNoShowOnSecondCall] = useState(true);
  
  // Estado para o som de alerta selecionado
  const [selectedAlertSound, setSelectedAlertSound] = useState('ding-dong.wav');
  
  // Lista de sons disponíveis para alertas
  const availableAlertSounds = [
    { name: 'Ding Dong', file: 'ding-dong.wav' },
    { name: 'Campainha (Bingbong)', file: 'doorbell-bingbong.wav' },
    { name: 'Campainha de Brinquedo', file: 'toydoorbell.wav' },
    { name: 'Aeroporto (Bingbong)', file: 'airport-bingbong.wav' },
    { name: 'Info Bleep', file: 'infobleep.wav' },
    { name: 'Ekiga VM', file: 'ekiga-vm.wav' },
    { name: 'Quito Airport', file: 'quito-mariscal-sucre.wav' },
  ];

  // Estados para toasts de notificação
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  // Executar apenas no cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // Estados para cooldown do botão chamar
  const [isCallCooldown, setIsCallCooldown] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  // Estados para cooldown do botão chamar novamente
  const [isCallAgainCooldown, setIsCallAgainCooldown] = useState(false);
  const [callAgainCooldownSeconds, setCallAgainCooldownSeconds] = useState(0);
  const [shouldAutoNoShow, setShouldAutoNoShow] = useState(false); // Flag para controlar auto no-show

  // Estados para chamada automática
  const [autoCallCountdown, setAutoCallCountdown] = useState(0);
  const [autoCallTrigger, setAutoCallTrigger] = useState(0); // Trigger para forçar reativação

  // Estado para rastrear chamadas por senha (Map: ticketNumber -> callCount)
  const [ticketCallCount, setTicketCallCount] = useState<Map<string, number>>(new Map());

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
    if (isCallCooldown) return; // Não permite chamar durante cooldown
    
    console.log("Chamar próxima senha");
    
    // Iniciar cooldown de 5 segundos
    setIsCallCooldown(true);
    setCooldownSeconds(5);
    
    // Simular chamada de próxima senha
    const nextInQueue = queueItems[0];
    let ticketNumber = "";
    
    if (nextInQueue) {
      ticketNumber = nextInQueue.passwordArrival.split(" - ")[0];
      setCurrentAttendance({
        ticketNumber: ticketNumber,
        service: nextInQueue.service,
        priority: nextInQueue.priority,
        clientName: nextInQueue.name,
        clientDocument: "123.456.789-00",
        startTime: new Date(),
      });
    } else {
      ticketNumber = "A001";
      setCurrentAttendance({
        ticketNumber: ticketNumber,
        service: "Consulta Geral",
        priority: "Normal",
        clientName: "João Silva",
        clientDocument: "123.456.789-00",
        startTime: new Date(),
      });
    }
    
    // Inicializar contador de chamadas para esta senha (primeira chamada = 1)
    if (!ticketCallCount.has(ticketNumber)) {
      setTicketCallCount(new Map(ticketCallCount.set(ticketNumber, 1)));
    }
    
    // Resetar flag de auto no-show
    setShouldAutoNoShow(false);
    
    // Iniciar cooldown de 10 segundos no botão "Chamar Novamente"
    setIsCallAgainCooldown(true);
    setCallAgainCooldownSeconds(10);
  };

  // Countdown do cooldown
  useEffect(() => {
    if (!isCallCooldown || cooldownSeconds <= 0) {
      if (isCallCooldown && cooldownSeconds <= 0) {
        setIsCallCooldown(false);
      }
      return;
    }

    const timer = setInterval(() => {
      setCooldownSeconds(prev => {
        if (prev <= 1) {
          setIsCallCooldown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCallCooldown, cooldownSeconds]);

    // Countdown do cooldown do chamar novamente
  useEffect(() => {
    if (!isCallAgainCooldown) {
      return;
    }
    
    if (callAgainCooldownSeconds <= 0) {
      setIsCallAgainCooldown(false);
      
      // Verificar se deve marcar como não compareceu após o cooldown
      if (currentAttendance && shouldAutoNoShow && autoNoShowOnSecondCall) {
        const ticketNumber = currentAttendance.ticketNumber;
        
        setToastMessage(`🚫 Senha ${ticketNumber} marcada como não compareceu (2ª chamada)`);
        setShowToast(true);
        
        // Marcar como não compareceu
        setCurrentAttendance(null);
        setIsServiceStarted(false);
        setIsPaused(false);
        
        // Limpar flag
        setShouldAutoNoShow(false);
        
        // Limpar contador desta senha
        const newMap = new Map(ticketCallCount);
        newMap.delete(ticketNumber);
        setTicketCallCount(newMap);
        
        // Reativar chamada automática se estiver ativa
        if (autoCall) {
          setTimeout(() => {
            setAutoCallTrigger(Date.now());
          }, 100);
        }
      }
      return;
    }

    const timer = setInterval(() => {
      setCallAgainCooldownSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isCallAgainCooldown, callAgainCooldownSeconds, currentAttendance, shouldAutoNoShow, ticketCallCount, autoNoShowOnSecondCall, autoCall]);

  const handleCallAgain = () => {
    if (isCallAgainCooldown) return;
    
    if (!currentAttendance) return;
    
    const ticketNumber = currentAttendance.ticketNumber;
    
    // Atualizar contador de chamadas
    setTicketCallCount(prevMap => {
      const currentCount = prevMap.get(ticketNumber) || 0;
      const newCount = currentCount + 1;
      const newMap = new Map(prevMap);
      newMap.set(ticketNumber, newCount);
      
      // Se é a segunda chamada e auto no-show está ativo, marcar flag
      if (newCount >= 2 && autoNoShowOnSecondCall) {
        setShouldAutoNoShow(true);
      }
      
      return newMap;
    });
    
    // Iniciar cooldown de 10 segundos
    setIsCallAgainCooldown(true);
    setCallAgainCooldownSeconds(10);
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
    
    // Limpar contador desta senha
    if (currentAttendance?.ticketNumber) {
      const newMap = new Map(ticketCallCount);
      newMap.delete(currentAttendance.ticketNumber);
      setTicketCallCount(newMap);
    }
    
    // Implementar lógica de não compareceu (chamar API)
    setCurrentAttendance(null);
    setIsServiceStarted(false);
    setIsPaused(false);
    setNoShowDialogOpen(false);
    
    // Reativar chamada automática se estiver ativa (com pequeno delay para garantir state update)
    if (autoCall) {
      setTimeout(() => {
        setAutoCallTrigger(Date.now());
      }, 100);
    }
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
    
    // Limpar contador desta senha (atendimento finalizado com sucesso)
    if (currentAttendance?.ticketNumber) {
      const newMap = new Map(ticketCallCount);
      newMap.delete(currentAttendance.ticketNumber);
      setTicketCallCount(newMap);
    }
    
    // Implementar lógica de encerrar atendimento (chamar API)
    setCurrentAttendance(null);
    setIsServiceStarted(false);
    setIsPaused(false);
    setFinishServiceDialogOpen(false);
    
    // Reativar chamada automática se estiver ativa (com pequeno delay para garantir state update)
    if (autoCall) {
      setTimeout(() => {
        setAutoCallTrigger(Date.now());
      }, 100);
    }
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
    
    // Reativar chamada automática se estiver ativa (com pequeno delay para garantir state update)
    if (autoCall) {
      setTimeout(() => {
        setAutoCallTrigger(Date.now());
      }, 100);
    }
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

    // 🔔 ALERTA DE NOVA SENHA - Toca som quando ativado
  useEffect(() => {
    if (!newPasswordAlert) return;

    const playNotificationSound = () => {
      // Tocar o som selecionado da pasta /sound/alert/
      const audio = new Audio(`/sound/alert/${selectedAlertSound}`);
      audio.volume = 0.7; // Volume padrão de 70%
      audio.play().catch((error) => {
        console.error('Erro ao tocar som de alerta:', error);
        // Fallback: criar beep com Web Audio API se o arquivo não carregar
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.value = 800;
          oscillator.type = 'sine';
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
          console.error('Erro no fallback de áudio:', e);
        }
      });
    };

    const handleNewPassword = () => {
      playNotificationSound();
      
      // Mostrar notificação do navegador
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Nova Senha na Fila', {
          body: 'Uma nova senha entrou na fila de atendimento',
          icon: '/icon.png',
        });
      }
    };

    // Simular detecção de nova senha (em produção, seria um WebSocket ou polling)
    // Por enquanto, vamos apenas pedir permissão de notificação
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Em produção, você adicionaria um listener aqui para detectar novas senhas
    // window.addEventListener('newPasswordAdded', handleNewPassword);
    
    return () => {
      // window.removeEventListener('newPasswordAdded', handleNewPassword);
    };
  }, [newPasswordAlert, selectedAlertSound]);

  // ⌨️ ATALHOS DE TECLADO - F1, F2, F3
  useEffect(() => {
    if (!keyboardShortcuts) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      // F1 - Chamar próxima senha OU Chamar novamente
      if (event.key === 'F1') {
        event.preventDefault();
        if (!currentAttendance && !isCallCooldown) {
          // Sem atendimento: chamar próxima senha
          handleCallNext();
        } else if (currentAttendance && !isCallAgainCooldown) {
          // Com atendimento: chamar novamente
          handleCallAgain();
        }
      }
      
      // F2 - Iniciar OU Encerrar atendimento
      if (event.key === 'F2') {
        event.preventDefault();
        if (currentAttendance) {
          if (!isServiceStarted) {
            // Iniciar atendimento
            handleStartService();
          } else {
            // Encerrar atendimento
            setFinishServiceDialogOpen(true);
          }
        }
      }
      
      // F3 - Não Compareceu OU Erro de Triagem
      if (event.key === 'F3') {
        event.preventDefault();
        if (currentAttendance) {
          if (!isServiceStarted) {
            // Antes de iniciar o serviço: Não Compareceu
            handleNoShow();
          } else {
            // Durante o atendimento: Erro de Triagem
            setTriageErrorDialogOpen(true);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keyboardShortcuts, currentAttendance, isServiceStarted, isCallCooldown, isCallAgainCooldown]);

  // 🤖 CHAMADA AUTOMÁTICA - Chama próxima senha automaticamente
  useEffect(() => {
    if (!autoCall) {
      setAutoCallCountdown(0);
      return;
    }
    if (currentAttendance) {
      setAutoCallCountdown(0);
      return; // Não chama se já tem atendimento ativo
    }
    if (queueItems.length === 0) {
      setAutoCallCountdown(0);
      return; // Não chama se não tem senhas na fila
    }

    // Iniciar countdown de 3 segundos
    setAutoCallCountdown(3);

    // Countdown regressivo
    const countdownInterval = setInterval(() => {
      setAutoCallCountdown(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Aguarda 3 segundos antes de chamar automaticamente
    const timer = setTimeout(() => {
      handleCallNext();
      setAutoCallCountdown(0);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [autoCall, currentAttendance, queueItems.length, autoCallTrigger]);

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
            isCallCooldown={isCallCooldown}
            cooldownSeconds={cooldownSeconds}
            autoCallCountdown={autoCallCountdown}
            isCallAgainCooldown={isCallAgainCooldown}
            callAgainCooldownSeconds={callAgainCooldownSeconds}
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
                  onNewPasswordAlertChange={(enabled) => {
                    setNewPasswordAlert(enabled);
                    if (enabled) {
                      setToastMessage("🔔 Alerta de nova senha ativado");
                      setShowToast(true);
                      // Pedir permissão para notificações
                      if ('Notification' in window && Notification.permission === 'default') {
                        Notification.requestPermission();
                      }
                    }
                  }}
                  keyboardShortcuts={keyboardShortcuts}
                  onKeyboardShortcutsChange={(enabled) => {
                    setKeyboardShortcuts(enabled);
                    if (enabled) {
                      setToastMessage("⌨️ Atalhos de teclado ativados (F1, F2, F3)");
                      setShowToast(true);
                    }
                  }}
                  autoCall={autoCall}
                  onAutoCallChange={(enabled) => {
                    setAutoCall(enabled);
                    if (enabled) {
                      setToastMessage("🤖 Chamada automática ativada");
                      setShowToast(true);
                    }
                  }}
                  autoNoShowOnSecondCall={autoNoShowOnSecondCall}
                  onAutoNoShowOnSecondCallChange={(enabled) => {
                    setAutoNoShowOnSecondCall(enabled);
                    if (enabled) {
                      setToastMessage("🚫 Não compareceu automático ativado (2ª chamada)");
                      setShowToast(true);
                    }
                  }}
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

      {/* Toast de Notificação */}
      <AlertToast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
