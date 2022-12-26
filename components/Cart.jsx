import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';

const Cart = () => {
  const cartRef = useRef();
  const {setShowCart, cartItems, totalPrice, totalQty} = useStateContext();
  
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <h2>Shopping Cart</h2>
      <div className='cart-container'>
        <div className='cart-items'>

        </div>
        <div className='order-summary'>
          <h3>Order Summary</h3>
          <div>
            <p>Quantity</p>
            <span>{totalQty} Product</span>
          </div>
          <div>
            <p>Sub Total</p>
            <span>${totalPrice}</span>
          </div>
          <div>
            <p>Total</p>
            <span>${totalPrice}</span>
          </div>          
        </div>
      </div>
    </div>
  )
}

export default Cart