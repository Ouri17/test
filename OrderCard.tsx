import React from 'react';
import { Calendar, Phone, User, Package } from 'lucide-react';
import { Order, OrderStatus } from '../../types';

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  preparing: 'bg-blue-100 text-blue-800',
  ready: 'bg-green-100 text-green-800',
  delivered: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800'
};

const statusLabels = {
  pending: 'En attente',
  preparing: 'En préparation',
  ready: 'Prêt',
  delivered: 'Livré',
  cancelled: 'Annulé'
};

const OrderCard: React.FC<OrderCardProps> = ({ order, onStatusChange }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Commande #{order.id.slice(-8)}
          </h3>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(order.createdAt)}
          </div>
        </div>
        <select
          value={order.status}
          onChange={(e) => onStatusChange(order.id, e.target.value as OrderStatus)}
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
        >
          {Object.entries(statusLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center mb-4">
        <User className="w-4 h-4 mr-2 text-gray-500" />
        <span className="text-sm text-gray-700">
          {order.customerInfo.firstName} {order.customerInfo.lastName}
        </span>
        <Phone className="w-4 h-4 ml-4 mr-2 text-gray-500" />
        <span className="text-sm text-gray-700">
          {order.customerInfo.phoneNumber}
        </span>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center mb-2">
          <Package className="w-4 h-4 mr-2 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            {order.products.length} article(s)
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          {order.products.map((product, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-gray-700">
                {product.name} x{product.quantity}
              </span>
              <span className="font-medium text-gray-800">
                {product.price * product.quantity} {product.currency}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2 border-t">
          <span className="font-semibold text-gray-800">Total:</span>
          <span className="font-bold text-lg text-blue-600">
            {order.total} {order.currency}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;