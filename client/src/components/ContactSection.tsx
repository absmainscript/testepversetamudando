/**
 * ContactSection.tsx
 * 
 * Seção de contato e agendamento do site
 * Contém botões para WhatsApp, Instagram e informações de localização
 * Links diretos para agendamento e redes sociais profissionais
 * Animações de hover e efeitos glassmorphism nos cartões
 */

import { motion } from "framer-motion"; // Animações dos elementos de contato
import { FaWhatsapp, FaInstagram } from "react-icons/fa"; // Ícones das redes sociais
import { Mail, MapPin, Clock } from "lucide-react"; // Ícones de contato
import { useEffect, useRef, useState } from "react"; // Controle de visibilidade

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="section-spacing gradient-bg" ref={ref}>
      <div className="container mx-auto mobile-container max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-4">
            <span className="text-sm font-medium text-indigo-600 bg-indigo-100 px-4 py-2 rounded-full">
              AGENDAMENTO
            </span>
          </div>
          <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-6 tracking-tight">
            Vamos{" "}
            <span className="text-gradient font-medium">
              conversar?
            </span>
          </h2>
          <p className="text-gray-600 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Juntas, vamos caminhar em direção ao seu bem-estar e crescimento pessoal, em um espaço de acolhimento e cuidado
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex"
          >
            <div className="card-aesthetic p-6 sm:p-8 rounded-2xl flex flex-col transition-all duration-300 w-full h-full">
              <h3 className="font-display font-semibold text-xl sm:text-2xl text-gray-800 mb-6 text-center sm:text-left">
                Entre em contato
              </h3>

              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  <a
                    href="https://wa.me/5544998362704"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 glass rounded-2xl hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <FaWhatsapp className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">WhatsApp</h4>
                      <p className="text-gray-600">(44) 998-362-704</p>
                    </div>
                  </a>

                  <a
                    href="https://instagram.com/adriellebenhossi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 glass rounded-2xl hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <FaInstagram className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Instagram</h4>
                      <p className="text-gray-600">@adriellebenhossi</p>
                    </div>
                  </a>

                  <a
                    href="mailto:escutapsi@adrielle.com.br"
                    className="flex items-center space-x-4 p-4 glass rounded-2xl hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Mail className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">E-mail</h4>
                      <p className="text-gray-600">escutapsi@adrielle.com.br</p>
                    </div>
                  </a>
                </div>
                
                <div className="pt-6 text-center">
                  <p className="text-sm text-gray-600">Conecte-se comigo</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex"
          >
            <div className="card-aesthetic p-6 sm:p-8 rounded-2xl flex flex-col transition-all duration-300 w-full h-full">
              <h3 className="font-display font-semibold text-xl sm:text-2xl text-gray-800 mb-6 text-center sm:text-left">
                Horários de atendimento
              </h3>

              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 glass rounded-xl">
                    <span className="font-medium text-gray-700">Segunda - Sexta</span>
                    <span className="text-gray-600">08h às 18h</span>
                  </div>
                  <div className="flex justify-between items-center p-4 glass rounded-xl">
                    <span className="font-medium text-gray-700">Sábado</span>
                    <span className="text-gray-600">08h às 12h</span>
                  </div>
                  <div className="flex justify-between items-center p-4 glass rounded-xl">
                    <span className="font-medium text-gray-700">Domingo</span>
                    <span className="text-gray-600">Fechado</span>
                  </div>
                </div>
                
                <div className="pt-6 text-center">
                  <p className="text-sm text-gray-600 mb-4">Atendimento presencial e online</p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=consultório+psicologia+campo+mourão+paraná"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 text-coral hover:text-purple-600 transition-colors duration-300"
                  >
                    <MapPin size={16} />
                    <span className="text-sm">Campo Mourão - PR</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
          title="Conversar no WhatsApp"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.050 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.890 3.495"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
