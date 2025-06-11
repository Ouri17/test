import React from 'react';
import { Package, Users, TrendingUp } from 'lucide-react';
import { Order } from '../../types';
import { getCategoryById } from '../../data/categories';
import OrderCard from '../Orders/OrderCard';

interface CategoryViewProps {
  categoryId: string;
  orders: Order[];
  onStatusChange: (orderId: string, status: any) => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({ categoryId, orders, onStatusChange }) => {
  const category = getCategoryById(categoryId);
  
  if (!category) {
    return <div>Catégorie non trouvée</div>;
  }

  // Filtrer les commandes pour ne montrer que celles qui contiennent des produits de cette catégorie
  const categoryOrders = orders.map(order => ({
    ...order,
    products: order.products.filter(product =>
      category.items.some(item => 
        item.toLowerCase() === product.name.toLowerCase()
      )
    )
  })).filter(order => order.products.length > 0);

  // Statistiques pour cette catégorie
  const stats = {
    totalOrders: categoryOrders.length,
    totalProducts: categoryOrders.reduce((sum, order) => 
      sum + order.products.reduce((pSum, p) => pSum + p.quantity, 0), 0),
    totalRevenue: categoryOrders.reduce((sum, order) => 
      sum + order.products.reduce((pSum, p) => pSum + (p.price * p.quantity), 0), 0)
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{category.name}</h1>
        <p className="text-gray-600 mt-2">
          Commandes contenant des produits de la catégorie {category.name}
        </p>
      </div>

      {/* Statistiques de la catégorie */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Commandes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Produits vendus</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Chiffre d'affaires</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue.toFixed(2)} ILS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des commandes */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Commandes ({categoryOrders.length})
        </h2>
        {categoryOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              Aucune commande trouvée pour cette catégorie
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Les commandes contenant des produits {category.name} apparaîtront ici
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {categoryOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={onStatusChange}
              />
            ))}
          </div>
        )}
      </div>

      {/* Détail des produits les plus populaires dans cette catégorie */}
      {categoryOrders.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Produits populaires dans cette catégorie
          </h3>
          <div className="space-y-3">
            {(() => {
              const productCounts = categoryOrders
                .flatMap(order => order.products)
                .reduce((acc, product) => {
                  acc[product.name] = (acc[product.name] || 0) + product.quantity;
                  return acc;
                }, {} as Record<string, number>);

              return Object.entries(productCounts)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([productName, count]) => (
                  <div key={productName} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">{productName}</span>
                    <span className="font-medium text-gray-900">{count} vendus</span>
                  </div>
                ));
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryView;