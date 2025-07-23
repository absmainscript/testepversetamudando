/**
 * Footer.tsx
 * 
 * Rodapé do site com informações finais
 * Contém links de redes sociais, informações profissionais e créditos
 * Layout em grid responsivo com gradiente de fundo elegante
 * Avatar da psicóloga com estrela de destaque profissional
 */

import { FaWhatsapp, FaInstagram, FaLinkedin } from "react-icons/fa"; // Redes sociais
import { Star } from "lucide-react"; // Ícones decorativos
import { Avatar } from "./Avatar"; // Avatar da psicóloga
import { useQuery } from "@tanstack/react-query"; // Para buscar configurações do site

export default function Footer() {
  // Buscar configurações do site incluindo a imagem do hero
  const { data: configs } = useQuery({
    queryKey: ["/api/admin/config"],
    queryFn: async () => {
      const response = await fetch("/api/admin/config");
      return response.json();
    },
  });

  // Extrair a imagem personalizada do hero se disponível
  const heroImage = configs?.find((c: any) => c.key === 'hero_image');
  const customImage = heroImage?.value?.path || null;
  
  // Extrair CRP das configurações
  const generalInfo = configs?.find((c: any) => c.key === 'general_info')?.value as any || {};
  const currentCrp = generalInfo.crp || "08/123456";
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
      
      <div className="relative py-8 sm:py-16 px-4 sm:px-6">
        <div className="max-w-full mx-auto">
          {/* Main footer content - lateralizado */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Brand section - esquerda */}
            <div className="lg:col-span-1">
              <div className="flex items-start space-x-3 mb-6">
                {customImage ? (
                  <div className="relative">
                    <img 
                      src={customImage} 
                      alt="Dra. Adrielle Benhossi" 
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-lg"
                    />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full flex items-center justify-center">
                      <Star className="w-1.5 h-1.5 text-white" fill="currentColor" />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shadow-lg flex items-center justify-center bg-gradient-to-br from-purple-100/30 to-pink-100/30">
                    {/* Silhueta aesthetic de perfil para footer */}
                    <svg viewBox="0 0 48 48" className="w-10 h-10">
                      <path d="M 24 10 Q 30 10 34 15 Q 36 18 36 24 Q 36 28 34 31 Q 30 34 26 34 Q 24 36 22 34 Q 18 31 18 24 Q 18 18 22 15 Q 24 10 24 10 Z" 
                            fill="white" opacity="0.7"/>
                      <path d="M 14 34 Q 18 32 24 32 Q 30 32 34 34 Q 36 36 36 42 L 12 42 Q 12 36 14 34 Z" 
                            fill="white" opacity="0.7"/>
                    </svg>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full flex items-center justify-center">
                      <Star className="w-1.5 h-1.5 text-white" fill="currentColor" />
                    </div>
                  </div>
                )}
                <div>
                  <span className="font-display font-semibold text-xl text-white mb-1 block">
                    {generalInfo.name || "Dra. Adrielle Benhossi"}
                  </span>
                  <p className="text-xs text-gray-400">CRP: {currentCrp}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                Cuidando da sua{" "}
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-medium">
                  saúde mental
                </span>{" "}
                com carinho e dedicação
              </p>
            </div>

            {/* Contact info */}
            <div>
              <h5 className="font-semibold text-white text-sm mb-4">Atendimento</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Presencial e Online</p>
                <p>Campo Mourão - PR</p>
                <p>Segunda à Sábado</p>
                <p className="text-xs text-gray-400 mt-3">
                  Atendimento particular<br />
                  Horários flexíveis
                </p>
              </div>
            </div>

            {/* Social media & Contact */}
            <div>
              <h5 className="font-semibold text-white text-sm mb-4">Contato</h5>
              <div className="space-y-3 mb-4">
                <a
                  href="https://wa.me/5544998362704"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                    <FaWhatsapp className="text-white text-sm" />
                  </div>
                  <span className="text-sm">WhatsApp</span>
                </a>
                <a
                  href="https://instagram.com/adriellebenhossi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                    <FaInstagram className="text-white text-sm" />
                  </div>
                  <span className="text-sm">Instagram</span>
                </a>
                <a
                  href="https://linkedin.com/in/adrielle-benhossi-75510034a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <FaLinkedin className="text-white text-sm" />
                  </div>
                  <span className="text-sm">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Trust seals & Info */}
            <div>
              <h5 className="font-semibold text-white text-sm mb-4">Certificações</h5>
              <div className="flex space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">CFP</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">🔒</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">⚖️</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Registrada no Conselho<br />
                Federal de Psicologia<br />
                Sigilo e ética profissional
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-left">
                <p className="text-sm text-gray-300 mb-1">
                  © 2024{" "}
                  <span className="font-medium bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Dra. Adrielle Benhossi
                  </span>{" "}
                  • Todos os direitos reservados
                </p>
                <p className="text-xs text-gray-400">
                  CNPJ: 12.345.678/0001-90
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-xs text-gray-400">
                  made with{" "}
                  <span className="text-yellow-400">♥</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
