import React, {useState, useEffect, useContext, createContext} from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const [totalQty, setTotalQty] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        // check if product already in the cart
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQty((prevTotalQty) => prevTotalQty + quantity);

        // if product already in cart, then increase the qty of product instead of add the same product in cart
        if(checkProductInCart) {
            // update the actual item in the cart
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        } else {
            // if when dont have the item in the cart
            product.quantity = quantity;
            setCartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to the cart`);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id)
        const AddNewCartItems = cartItems.filter(item => item._id !== product._id);

        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQty(prevTotalQty => prevTotalQty - foundProduct.quantity);
        setCartItems(AddNewCartItems);
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id)
        const AddNewCartItems = cartItems.filter(item => item._id !== id);

        if(value === 'inc') {
            let newCartItems = [...AddNewCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}]
            setCartItems(newCartItems);
            setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price)
            setTotalQty(prevTotalQty => prevTotalQty + 1)
        } else if(value === 'dec') {
            if(foundProduct.quantity > 1) {
                let newCartItems = [...AddNewCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}]
                setCartItems(newCartItems);
                setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price)
                setTotalQty(prevTotalQty => prevTotalQty - 1)
            }
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;
            return prevQty - 1
        });
    }

    return (
        <Context.Provider 
        value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            setTotalPrice,
            totalQty,
            qty,
            incQty,
            decQty,
            onAdd,
            onRemove,
            toggleCartItemQuantity
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);