import React, { createContext, useState, useContext, useEffect} from 'react';

import { serverUrl } from '../../consts';
import { get } from "../helpers/httpHelper";
import { ProductType } from '../types/enums';
import { useAuth } from './Auth.context';

const initial = {
  products: [],
}

export const ProductContext = createContext<ProductContextType>(initial);

export const ProductProvider = ({ children }: ProductProviderProps) => {
    const {user} = useAuth();
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = () => {
        console.log('fetching products');
        get(`${serverUrl}/products`).then(
            ({products}) => {
                console.log('fetched products');
                setProducts(products);
            }
        );
    }

    useEffect(() => {
        if (user) {
            fetchProducts();
        }
    }, [user]);

    return (
        <ProductContext.Provider
            value={{
                products
            }}
            >
            {children}
        </ProductContext.Provider>
        );
    };

export const useProducts = () => useContext(ProductContext);

type ProductProviderProps = {
  children: React.ReactNode,
};

type ProductContextType = {
  products: Product[],
}

type Product = {
    id: string,
    name: string,
    type: ProductType,
}

  