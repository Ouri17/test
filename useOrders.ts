import { useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types';

// Simulation d'une base de données locale
const ORDERS_STORAGE_KEY = 'delices-rivka-orders';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    try {
      const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveOrders = (newOrders: Order[]) => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(newOrders));
      setOrders(newOrders);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des commandes:', error);
    }
  };

  const addOrder = (order: Order) => {
    const newOrders = [...orders, order];
    saveOrders(newOrders);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    );
    saveOrders(updatedOrders);
  };

  const deleteOrder = (orderId: string) => {
    const filteredOrders = orders.filter(order => order.id !== orderId);
    saveOrders(filteredOrders);
  };

  const getOrdersByCategory = (categoryItems: string[]) => {
    return orders.map(order => ({
      ...order,
      products: order.products.filter(product =>
        categoryItems.some(item => 
          item.toLowerCase() === product.name.toLowerCase()
        )
      )
    })).filter(order => order.products.length > 0);
  };

  return {
    orders,
    loading,
    addOrder,
    updateOrderStatus,
    deleteOrder,
    getOrdersByCategory,
    refreshOrders: loadOrders
  };
};