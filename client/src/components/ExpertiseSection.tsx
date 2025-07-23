
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Brain, Heart, Users, Star, Shield, Target, Zap, Sun, Moon, Sparkles, Flower, Leaf, MessageCircle, Handshake, HelpCircle } from 'lucide-react';

// Mapeamento de ícones
const iconMap: Record<string, React.ComponentType<any>> = {
  Brain,
  Heart,
  Users,
  Star,
  Shield,
  Target,
  Zap,
  Sun,
  Moon,
  Sparkles,
  Flower,
  Leaf,
  MessageCircle,
  Handshake,
  HelpCircle,
};

function ExpertiseCardsSection() {
  const { data: expertiseCards = [] } = useQuery({
    queryKey: ["/api/expertise-cards"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/expertise-cards");
      return response.json();
    },
  });

  // Cards padrão caso não haja no banco
  const defaultCards = [
    {
      id: 1,
      title: "Ansiedade",
      description: "Técnicas para controlar preocupações excessivas e desenvolver tranquilidade mental",
      icon: "Brain",
      backgroundColor: "#ffffff",
      iconColor: "#8b5cf6"
    },
    {
      id: 2,
      title: "Depressão", 
      description: "Apoio especializado para redescobrir alegria, motivação e propósito na vida",
      icon: "Heart",
      backgroundColor: "#ffffff",
      iconColor: "#ec4899"
    },
    {
      id: 3,
      title: "Relacionamentos",
      description: "Melhorando vínculos afetivos e habilidades de comunicação interpessoal", 
      icon: "Users",
      backgroundColor: "#ffffff",
      iconColor: "#6366f1"
    },
    {
      id: 4,
      title: "Autoestima",
      description: "Desenvolvendo confiança, amor próprio e uma relação saudável consigo mesmo",
      icon: "Star", 
      backgroundColor: "#ffffff",
      iconColor: "#10b981"
    }
  ];

  const cardsToShow = expertiseCards.length > 0 ? expertiseCards : defaultCards;

  if (cardsToShow.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Minhas Especialidades</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cardsToShow.map((card: any) => {
          const IconComponent = iconMap[card.icon] || Brain;
          
          return (
            <div 
              key={card.id}
              className="p-4 rounded-lg border border-gray-100 bg-white hover:shadow-sm transition-shadow duration-200"
            >
              <div className="flex items-start gap-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-50"
                  style={{ color: card.iconColorDb || card.icon_color }}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    {card.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExpertiseCardsSection;
