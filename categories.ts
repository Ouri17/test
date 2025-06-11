import { CategoryInfo } from '../types';

export const categories: CategoryInfo[] = [
  {
    id: 'pains',
    name: '🍞 Pains',
    icon: 'Wheat',
    items: ['Halot']
  },
  {
    id: 'gateaux-individuels',
    name: '🎂 Gâteaux Individuels',
    icon: 'Cake',
    items: [
      'Flan', 'Antillais', 'Tarte fruits rouges', 'Tarte abricot', 'Rocher', 'Opera', 
      'Tarte amandine poire', 'Tarte snickers', 'Concorde', 'Forêt noire', 'Merveilleux', 
      'Pralin', 'Succes', 'Paris-Brest', 'Castel', 'Eclair cafe', 'Eclair vanille', 
      'Éclair pistache', 'Éclair lotus', 'Baba au rhum', 'Religieuse chocolat', 
      'Religieuse café', 'Tropezienne', 'Saint honoré', 'Creme brûlée', 'Trianon', 
      'Mont blanc', 'Fraisier', 'Tarte aux citron', 'Tarte aux fraises', 'Tarte aux pommes', 
      'Macaron café', 'Macaron framboise', 'Macaron chocolat', 'Macaron chocolat pralin', 
      'Macaron pistache', 'Éclair chocolat', 'Tarte tatin', 'Tarte dubai', 'Millefeuille', 'Lotus'
    ]
  },
  {
    id: 'grands-gateaux',
    name: '🍰 Grands Gâteaux',
    icon: 'ChefHat',
    items: [
      'Grande Tarte amandine poire', 'Coffret 12 mini macarons', 'Grand Concorde', 
      'Grand Macaron chocolat', 'Grand Macaron framboise', 'Grand Macaron chocolat pralin', 
      'Grand Pralin', 'Grande Tarte snickers', 'Grands Tarte tatin', 'Grande Tarte à l\'abricot', 
      'Grande Tarte aux fruits rouge', 'Nougat glacé et coulis', 'Frangipane', 'Grand Rocher', 
      'Grand Millefeuille', 'Grande Tarte aux fraises', 'Grande Tarte au citron', 
      'Grande Tarte aux pommes', 'Grand Fraisier', 'Grande tarte dubai', 'Grand Trianon', 
      'Grande Tropezienne', 'Entremet mousse mangue passion', 'Entremet mousse fraise framboise', 
      'Grand antillais', 'Grand Castel', 'Grand Macaron pistache', 'Grand macaron café', 
      'Grand flan', 'Grand opéra'
    ]
  },
  {
    id: 'gateaux-secs',
    name: '🍪 Gâteaux Secs',
    icon: 'Cookie',
    items: ['Croquants amandes', 'Boulou', 'Brioche', 'Cookies', 'Kaq', 'Marbré']
  },
  {
    id: 'plateaux',
    name: '🧁 Plateaux',
    icon: 'Package',
    items: ['Plateau salé 30 pcs', 'Plateau mignardises 35pcs', 'Plateau spécial']
  },
  {
    id: 'salades-chabbat',
    name: '🥗 Salades Chabbat',
    icon: 'Salad',
    items: [
      'Fèves', 'Pois chiches', 'Champignons', 'Salade cuite', 'Aubergines cuisinées', 
      'Artichauts', 'Betteraves', 'Piments grillés', 'Carottes cuisinés', 'Taboulé', 
      'Pommes de terre harissa', 'Pommes de terre oignons chili', 'Pommes de terre aux thon', 
      'Pommes de terre surimi', 'Carottes râpées', 'Tapenade aux olives', 'Batatas rôties', 
      'Slata mechouia', 'Colorabi', 'Oeuf mayo', 'Courgettes basilic'
    ]
  },
  {
    id: 'sale',
    name: '🧂 Salé',
    icon: 'UtensilsCrossed',
    items: ['Pizza', 'Sandwich lunch thon', 'Grande quiche', 'Sandwich lunch saumon']
  },
  {
    id: 'viennoiseries',
    name: '🥐 Viennoiseries',
    icon: 'Croissant',
    items: [
      'Croissant aux amandes', 'Oranais', 'Chausson aux pommes', 'Pain aux raisins', 
      'Croissant', 'Pain aux chocolat', 'Pain suisse'
    ]
  }
];

export const getCategoryByItem = (itemName: string): CategoryInfo | undefined => {
  return categories.find(category =>
    category.items.some(item => 
      item.toLowerCase() === itemName.toLowerCase()
    )
  );
};

export const getCategoryById = (categoryId: string): CategoryInfo | undefined => {
  return categories.find(category => category.id === categoryId);
};