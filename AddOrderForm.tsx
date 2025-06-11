import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { Order, OrderProduct } from '../../types';
import { getCategoryByItem } from '../../data/categories';

interface AddOrderFormProps {
  onAddOrder: (order: Order) => void;
}

const AddOrderForm: React.FC<AddOrderFormProps> = ({ onAddOrder }) => {
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    friendlyName: ''
  });

  const [products, setProducts] = useState<OrderProduct[]>([
    {
      id: Date.now().toString(),
      name: '',
      price: 0,
      currency: 'ILS',
      quantity: 1,
      category: 'gateaux-individuels'
    }
  ]);

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: Date.now().toString(),
        name: '',
        price: 0,
        currency: 'ILS',
        quantity: 1,
        category: 'gateaux-individuels'
      }
    ]);
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, field: keyof OrderProduct, value: any) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    
    // Auto-detect category when name changes
    if (field === 'name') {
      const category = getCategoryByItem(value);
      if (category) {
        updatedProducts[index].category = category.id;
      }
    }
    
    setProducts(updatedProducts);
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.firstName || !customerInfo.phoneNumber || products.length === 0) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const order: Order = {
      id: `ORDER-${Date.now()}`,
      uuid: `MSG${Date.now()}`,
      sessionKey: `WW-${Date.now()}`,
      messageText: 'Délices de rivka',
      subtotal: calculateTotal(),
      total: calculateTotal(),
      currency: 'ILS',
      createdAt: new Date().toISOString(),
      products: products.filter(p => p.name.trim() !== ''),
      customerInfo,
      status: 'pending'
    };

    onAddOrder(order);
    
    // Reset form
    setCustomerInfo({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      friendlyName: ''
    });
    setProducts([{
      id: Date.now().toString(),
      name: '',
      price: 0,
      currency: 'ILS',
      quantity: 1,
      category: 'gateaux-individuels'
    }]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Nouvelle Commande</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations client */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Informations Client</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                value={customerInfo.firstName}
                onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de famille
              </label>
              <input
                type="text"
                value={customerInfo.lastName}
                onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de téléphone *
              </label>
              <input
                type="tel"
                value={customerInfo.phoneNumber}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phoneNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom d'affichage
              </label>
              <input
                type="text"
                value={customerInfo.friendlyName}
                onChange={(e) => setCustomerInfo({ ...customerInfo, friendlyName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Produits */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Produits</h3>
            <button
              type="button"
              onClick={addProduct}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Ajouter
            </button>
          </div>

          <div className="space-y-4">
            {products.map((product, index) => (
              <div key={product.id} className="bg-white p-4 rounded-lg border">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du produit
                    </label>
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => updateProduct(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: Tarte aux fraises"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix (ILS)
                    </label>
                    <input
                      type="number"
                      value={product.price}
                      onChange={(e) => updateProduct(index, 'price', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantité
                      </label>
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) => updateProduct(index, 'quantity', parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                      />
                    </div>
                    {products.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Sous-total: {(product.price * product.quantity).toFixed(2)} ILS
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">Total de la commande:</span>
            <span className="text-2xl font-bold text-blue-600">
              {calculateTotal().toFixed(2)} ILS
            </span>
          </div>
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
        >
          <Save className="w-5 h-5 mr-2" />
          Enregistrer la commande
        </button>
      </form>
    </div>
  );
};

export default AddOrderForm;