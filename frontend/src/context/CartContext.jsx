import { createContext, useCallback, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);

    const addItem = useCallback((product, flavor) => {
        const key = flavor ? `${product.slug}:${flavor.id}` : product.slug;
        setItems((prev) => {
            const found = prev.find((i) => i.key === key);
            if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
            return [
                ...prev,
                {
                    key,
                    slug: product.slug,
                    name: product.name,
                    flavor: flavor ? flavor.name : null,
                    price: product.price,
                    image: flavor ? flavor.image : product.image,
                    kind: product.kind,
                    qty: 1,
                },
            ];
        });
    }, []);

    const changeQty = useCallback((key, delta) => {
        setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0));
    }, []);

    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    const count = items.reduce((s, i) => s + i.qty, 0);

    const value = useMemo(
        () => ({ items, addItem, changeQty, total, count, open, setOpen }),
        [items, addItem, changeQty, total, count, open],
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
