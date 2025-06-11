import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import OrderCard from './components/Orders/OrderCard';
import AddOrderForm from './components/Orders/AddOrderForm';
import CategoryView from './components/Categories/CategoryView';
import { useOrders } from './hooks/useOrders';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const { orders, loading, addOrder, updateOrderStatus, deleteOrder } = useOrders();

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    switch (activeView) {
      case 'dashboard':
        return <Dashboard orders={orders} />;
      
      case 'orders':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Toutes les commandes</h1>
              <p className="text-gray-600 mt-2">Gérez toutes vos commandes ici</p>
            </div>
            {orders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500 text-lg">Aucune commande pour le moment</p>
                <p className="text-gray-400 text-sm mt-2">
                  Ajoutez votre première commande pour commencer
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {orders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onStatusChange={updateOrderStatus}
                  />
                ))}
              </div>
            )}
          </div>
        );
      
      case 'add-order':
        return <AddOrderForm onAddOrder={addOrder} />;
      
      case 'stats':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Statistiques</h1>
              <p className="text-gray-600 mt-2">Analyse détaillée de votre activité</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500">Fonctionnalité à venir...</p>
            </div>
          </div>
        );
      
      default:
        // Vérifier si c'est une vue de catégorie
        if (activeView.startsWith('category-')) {
          const categoryId = activeView.replace('category-', '');
          return (
            <CategoryView
              categoryId={categoryId}
              orders={orders}
              onStatusChange={updateOrderStatus}
            />
          );
        }
        return <Dashboard orders={orders} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;