import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Customer } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  customer: Customer;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CUSTOMER'; payload: Customer };

const initialState: CartState = {
  items: [],
  isOpen: false,
  customer: { name: '', phone: '', address: '' }
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => 
        item.productId === action.payload.productId && 
        item.size === action.payload.size &&
        JSON.stringify(item.flavors) === JSON.stringify(action.payload.flavors)
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, id: Date.now().toString() }]
      };
      
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };
      
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
      
    case 'CLEAR_CART':
      return { ...state, items: [] };
      
    case 'SET_CUSTOMER':
      return { ...state, customer: action.payload };
      
    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  getTotal: () => number;
  getItemCount: () => number;
} | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  const getTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const getItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };
  
  return (
    <CartContext.Provider value={{ state, dispatch, getTotal, getItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};