import React, { createContext, useState } from 'react';

export const StoreContext = createContext();

export const StoreProvider = (props) => {

    const [basket, setBasket] = useState(null);

    const removeItems = (productId, quantity) => {
        debugger;
        if (!basket) return "Basket not found!"

        const items = [...basket.items];
        const index = items.findIndex(i => i.productId === productId);
        if (index >= 0) {
            items[index].quantity -= quantity
            if (items[index].quantity < 1) items.splice(index, 1)
            return setBasket(prevState => { return { ...prevState, items } })
        }
    }

    return (
        <StoreContext.Provider value={{ basket, setBasket, removeItems }}>
            {props.children}
        </StoreContext.Provider>
    )
}
