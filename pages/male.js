import React from 'react'
import {client} from '../lib/client'
import { AllProducts } from '../components'

const male = ({AllMaleProducts}) => {
    return (
        <div className='Allproducts-container'>
            {AllMaleProducts?.map(prod => (
                <AllProducts key={prod._id} allproducts={prod} />
            ))}
        </div>
      )
}

export const getServerSideProps = async () => {
    const query = '*[category == "Male"]';
    const AllMaleProducts = await client.fetch(query);

    return {
      props: { AllMaleProducts }
    }
}

export default male
