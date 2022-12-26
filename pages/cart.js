import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import {HiOutlineTrash} from 'react-icons/hi'
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';

const Cart = () => {
  const cartRef = useRef();
  const {setShowCart, cartItems, totalPrice, totalQty, onRemove, toggleCartItemQuantity} = useStateContext();

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <h2>Shopping Cart</h2>
      <div className='cart-container'>
        {cartItems.length < 1 && (
            <div className='empty-cart'>
                <AiOutlineShopping size={150} />
                <h1>Your shopping bag is empty</h1>
                <Link href='/'>
                    <button type='button' onClick={() => setShowCart(false)}>
                        Continue Shopping
                    </button>
                </Link>
            </div>
        )}

        <div className='cart-items'>
            {cartItems.length >= 1 && cartItems.map((item) => (
                <div key={item._id} className='item-card'>
                    <div className='item-image'>
                        <img src={urlFor(item?.image[0])} alt='img' />
                    </div>
                    <div className='item-details'>
                        <div className='name-and-remove'>
                            <h3>{item.name}</h3>  
                            <button type='buttin' onClick={() => onRemove(item)} className='remove-item'>
                              <HiOutlineTrash size={28} />  
                            </button>
                        </div>
                        <p className='item-tag'>Dress</p>
                        <p className='delivery-est'>Delivery Estimation</p>
                        <p className='delivery-days'>5 Working Days</p>
                        <div className='price-and-qty'>
                            <span className='price'>${item.price * item.quantity}</span>  
                            <div>
                                <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus /></span>
                                <span className='num' onClick=''>{item.quantity}</span>
                                <span className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus /></span>
                            </div>   
                        </div>
                    </div>
                </div>
            ))}    
        </div>

        {cartItems.length >= 1 && (
        <div className='order-summary'>
          <h3>Order Summary</h3>
          <div className='qty'>
            <p>Quantity</p>
            <span>{totalQty} Product</span>
          </div>
          <div className='subtotal'>
            <p>Sub Total</p>
            <span>${totalPrice}</span>
          </div>
          <div className='total'>
            <p>Total</p>
            <span>${totalPrice}</span>
          </div> 
          <div>
            <button type='button' onClick=''>Process to Checkout</button>
          </div>         
        </div>
        )}  

      </div>
    </div>
  )
}

export default Cart