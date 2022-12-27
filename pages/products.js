import React from 'react'
import {client} from '../lib/client'
import { AllProducts } from '../components'

const products = ({Allproducts}) => {
    return (
        <div className='Allproducts-container'>
            {Allproducts?.map(prod => (
                <AllProducts key={prod._id} allproducts={prod} />
            ))}
        </div>
      )
}

export const getServerSideProps = async () => {
    const query = '*[_type == "product"]';
    const Allproducts = await client.fetch(query);
  
    return {
      props: { Allproducts }
    }
}

export default products
