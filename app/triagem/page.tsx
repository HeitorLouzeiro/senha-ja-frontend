"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  ServiceSelector,
  PrioritySelector,
  TicketGenerator,
  SuccessModal,
  TriagemHeader,
  TriagemSettings,
  UserInfoForm,
} from "@/components/triagem";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function TriagemPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Estados de seleção
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<"normal" | "priority">("normal");
  const [selectedPriorityType, setSelectedPriorityType] = useState<string | null>(null);

  // Estados de informações do usuário (opcionais)
  const [userName, setUserName] = useState("");
  const [userDocument, setUserDocument] = useState("");

  // Estado de geração
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState({
    number: "",
    service: "",
    priority: "",
  });

  // Configurações
  const [showModalEnabled, setShowModalEnabled] = useState(true); // Exibir modal de senha gerada
  const [autoPrintEnabled, setAutoPrintEnabled] = useState(false); // Impressão automática

  // Contador de senhas (simulação)
  const [ticketCounters, setTicketCounters] = useState({
    normal: 1,
    priority: 1,
  });

  // 🏥 SERVIÇOS DISPONÍVEIS
  const services = [
    {
      id: "1",
      name: "Consulta Geral",
      description: "Atendimento médico geral",
      estimatedTime: "~15 min",
    },
    {
      id: "2",
      name: "Documentação",
      description: "Emissão e renovação de documentos",
      estimatedTime: "~10 min",
    },
    {
      id: "3",
      name: "Consulta Especializada",
      description: "Atendimento com especialista",
      estimatedTime: "~30 min",
    },
    {
      id: "4",
      name: "Informações",
      description: "Informações gerais",
      estimatedTime: "~5 min",
    },
    {
      id: "5",
      name: "Agendamento",
      description: "Agendar consultas e procedimentos",
      estimatedTime: "~10 min",
    },
    {
      id: "6",
      name: "Renovação",
      description: "Renovação de cadastros",
      estimatedTime: "~15 min",
    },
    {
      id: "7",
      name: "Cadastro",
      description: "Novo cadastro no sistema",
      estimatedTime: "~20 min",
    },
    {
      id: "8",
      name: "Exames",
      description: "Entrega e solicitação de exames",
      estimatedTime: "~10 min",
    },
    {
      id: "9",
      name: "Vacinas",
      description: "Cartão de vacinação",
      estimatedTime: "~15 min",
    },
  ];

  // Atualizar relógio
  useEffect(() => {
    setIsMounted(true);
    
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handler para gerar senha
  const handleGenerateTicket = async () => {
    if (!selectedServiceId) return;

    setIsGenerating(true);

    // Simular delay de impressão/geração
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Gerar número da senha
    const prefix = selectedPriority === "priority" ? "P" : "A";
    const counter = selectedPriority === "priority" ? ticketCounters.priority : ticketCounters.normal;
    const ticketNumber = `${prefix}${String(counter).padStart(3, "0")}`;

    // Atualizar contador
    setTicketCounters((prev) => ({
      ...prev,
      [selectedPriority]: counter + 1,
    }));

    // Obter nome do serviço
    const service = services.find((s) => s.id === selectedServiceId);
    const serviceName = service?.name || "Serviço";

    // Obter label da prioridade
    const getPriorityLabel = () => {
      if (selectedPriority === "normal") return "Normal";
      
      const types: Record<string, string> = {
        idoso: "Preferencial - Idoso",
        gestante: "Preferencial - Gestante",
        deficiente: "Preferencial - Deficiente",
        lactante: "Preferencial - Lactante",
        outros: "Preferencial",
      };
      
      return selectedPriorityType ? types[selectedPriorityType] : "Preferencial";
    };

    // Salvar dados da senha gerada
    setGeneratedTicket({
      number: ticketNumber,
      service: serviceName,
      priority: getPriorityLabel(),
    });

    setIsGenerating(false);
    
    // Exibir modal apenas se configuração estiver ativada
    if (showModalEnabled) {
      setShowSuccessModal(true);
    }

    // Tocar som de sucesso
    try {
      const audio = new Audio("/sound/alert/ding-dong.wav");
      audio.volume = 0.5;
      audio.play().catch(err => console.log("Erro ao tocar som:", err));
    } catch (error) {
      console.log("Som não disponível");
    }

    // Toast de sucesso
    toast.success(`Senha ${ticketNumber} gerada com sucesso!`, {
      description: `${serviceName} - ${getPriorityLabel()}`,
      duration: 4000,
    });

    // Imprimir automaticamente se configuração estiver ativada
    if (autoPrintEnabled) {
      setTimeout(() => {
        handlePrint();
      }, 500); // Pequeno delay para garantir que os dados estão prontos
    }

    // Aqui você faria a chamada para a API real:
    // await api.post('/tickets', { serviceId, priority, priorityType })
    console.log("Senha gerada:", {
      ticketNumber,
      serviceId: selectedServiceId,
      serviceName,
      priority: selectedPriority,
      priorityType: selectedPriorityType,
      userName: userName || null,
      userDocument: userDocument || null,
    });
  };

  // Handler para imprimir
  const handlePrint = () => {
    console.log("Imprimindo senha:", generatedTicket);
    
    toast.promise(
      new Promise<string>((resolve, reject) => {
        try {
          // Criar conteúdo para impressão
          const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <title>Senha - ${generatedTicket.number}</title>
              <style>
                body {
                  font-family: 'Courier New', monospace;
                  text-align: center;
                  padding: 20px;
                  margin: 0;
                }
                h1 {
                  font-size: 24px;
                  margin-bottom: 10px;
                }
                .ticket-number {
                  font-size: 72px;
                  font-weight: bold;
                  margin: 30px 0;
                  letter-spacing: 2px;
                }
                .info {
                  font-size: 14px;
                  margin: 10px 0;
                }
                .user-info {
                  font-size: 12px;
                  margin: 15px 0;
                  padding: 10px;
                  border-top: 1px dashed #666;
                  border-bottom: 1px dashed #666;
                }
                .footer {
                  margin-top: 30px;
                  font-size: 10px;
                  color: #666;
                }
                @media print {
                  body { padding: 0; }
                }
              </style>
            </head>
            <body>
              <h1>SENHA DE ATENDIMENTO</h1>
              <div class="ticket-number">${generatedTicket.number}</div>
              <div class="info"><strong>Serviço:</strong> ${generatedTicket.service}</div>
              <div class="info"><strong>Tipo:</strong> ${generatedTicket.priority}</div>
              ${userName || userDocument ? `
                <div class="user-info">
                  ${userName ? `<div><strong>Nome:</strong> ${userName}</div>` : ''}
                  ${userDocument ? `<div><strong>CPF:</strong> ${userDocument}</div>` : ''}
                </div>
              ` : ''}
              <div class="footer">
                <p>${new Date().toLocaleString("pt-BR")}</p>
                <p>Aguarde ser chamado no painel de atendimento</p>
              </div>
            </body>
            </html>
          `;

          // Abrir janela de impressão
          const printWindow = window.open("", "_blank");
          if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.focus();
            
            // Resolver a promise após um pequeno delay para garantir que a janela abriu
            setTimeout(() => {
              printWindow.print();
              resolve("Impressão iniciada com sucesso");
              
              // Fechar janela após impressão
              setTimeout(() => {
                printWindow.close();
              }, 500);
            }, 100);
          } else {
            reject(new Error("Não foi possível abrir a janela de impressão"));
          }
        } catch (error) {
          reject(error);
        }
      }),
      {
        loading: "Imprimindo senha...",
        success: "Senha impressa com sucesso!",
        error: "Erro ao imprimir senha",
      }
    );
  };

  // Handler para nova senha
  const handleNewTicket = () => {
    setShowSuccessModal(false);
    setSelectedServiceId(null);
    setSelectedPriority("normal");
    setSelectedPriorityType(null);
    setUserName("");
    setUserDocument("");
  };

  // Handlers para configurações
  const handleShowModalChange = (enabled: boolean) => {
    setShowModalEnabled(enabled);
    if (enabled) {
      toast.success("Exibição de senha ativada", {
        description: "O modal será exibido após gerar a senha",
      });
    } else {
      toast.info("Exibição de senha desativada", {
        description: "O modal não será exibido após gerar a senha",
      });
    }
  };

  const handleAutoPrintChange = (enabled: boolean) => {
    setAutoPrintEnabled(enabled);
    if (enabled) {
      toast.success("Impressão automática ativada", {
        description: "A senha será impressa automaticamente",
      });
    } else {
      toast.info("Impressão automática desativada", {
        description: "A impressão será feita manualmente",
      });
    }
  };

  // Obter nome do serviço selecionado
  const selectedService = services.find((s) => s.id === selectedServiceId);

  if (!isMounted) {
    return null; // Evitar erro de hidratação
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-4 lg:px-6 lg:py-6">
        <div className="max-w-[1920px] mx-auto space-y-4">
          {/* Cabeçalho */}
          <TriagemHeader
            unitName="Unidade Central de Atendimento"
            attendantName="Maria Silva"
            currentTime={currentTime}
          />

          {/* Layout Principal - Estrutura Otimizada */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Coluna Esquerda - Seletores (mais largo) */}
            <div className="lg:col-span-3 space-y-4">
              {/* Grid interno para Informações do Usuário e Estatísticas lado a lado */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                {/* Informações do Usuário */}
                <div className="xl:col-span-2">
                  <UserInfoForm
                    userName={userName}
                    userDocument={userDocument}
                    onUserNameChange={setUserName}
                    onUserDocumentChange={setUserDocument}
                  />
                </div>

                {/* Estatísticas Compactas */}
                <div className="space-y-2">
                  <div className="bg-white rounded-lg p-3 border-2 border-green-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-green-600">{ticketCounters.normal - 1}</div>
                        <div className="text-xs text-gray-600">Normais</div>
                      </div>
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-xl">👤</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border-2 border-orange-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-orange-600">{ticketCounters.priority - 1}</div>
                        <div className="text-xs text-gray-600">Prioritárias</div>
                      </div>
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-xl">⚡</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border-2 border-blue-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {ticketCounters.normal + ticketCounters.priority - 2}
                        </div>
                        <div className="text-xs text-gray-600">Total</div>
                      </div>
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xl">📊</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seletor de Serviço */}
              <ServiceSelector
                services={services}
                selectedServiceId={selectedServiceId}
                onSelectService={setSelectedServiceId}
              />

              {/* Seletor de Prioridade */}
              <PrioritySelector
                selectedPriority={selectedPriority}
                selectedPriorityType={selectedPriorityType}
                onSelectPriority={setSelectedPriority}
                onSelectPriorityType={setSelectedPriorityType}
              />
            </div>

            {/* Coluna Direita - Gerador e Configurações (mais estreita e fixa) */}
            <div className="lg:col-span-1 space-y-4">
              {/* Gerador de Senha */}
              <TicketGenerator
                selectedService={selectedServiceId}
                selectedPriority={selectedPriority}
                selectedPriorityType={selectedPriorityType}
                serviceName={selectedService?.name}
                onGenerateTicket={handleGenerateTicket}
                isGenerating={isGenerating}
              />

              {/* Configurações */}
              <TriagemSettings
                showSuccessModal={showModalEnabled}
                onShowSuccessModalChange={handleShowModalChange}
                autoPrint={autoPrintEnabled}
                onAutoPrintChange={handleAutoPrintChange}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal de Sucesso */}
      <SuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        ticketNumber={generatedTicket.number}
        serviceName={generatedTicket.service}
        priority={generatedTicket.priority}
        userName={userName}
        userDocument={userDocument}
        onPrint={handlePrint}
        onNewTicket={handleNewTicket}
      />
    </div>
  );
}
