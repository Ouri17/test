import React from 'react';
import { 
  Home, 
  ShoppingCart, 
  BarChart3, 
  Settings,
  Wheat,
  Cake,
  ChefHat,
  Cookie,
  Package,
  Salad,
  UtensilsCrossed,
  Croissant
} from 'lucide-react';
import { categories } from '../../data/categories';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const iconMap = {
  Wheat,
  Cake,
  ChefHat,
  Cookie,
  Package,
  Salad,
  UtensilsCrossed,
  Croissant
};

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Tableau de bord', icon: Home },
    { id: 'orders', name: 'Commandes', icon: ShoppingCart },
    { id: 'add-order', name: 'Nouvelle commande', icon: ShoppingCart },
    { id: 'stats', name: 'Statistiques', icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Délices de Rivka</h1>
        <p className="text-sm text-gray-600">Gestion des commandes</p>
      </div>

      <nav className="mt-6">
        <div className="px-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Menu Principal
          </h3>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-1 transition-colors ${
                  activeView === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="px-4 mt-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Catégories
          </h3>
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap];
            return (
              <button
                key={category.id}
                onClick={() => onViewChange(`category-${category.id}`)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-1 transition-colors ${
                  activeView === `category-${category.id}`
                    ? 'bg-orange-50 text-orange-700 border-r-2 border-orange-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="mr-3 h-5 w-5" />
                {category.name}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;