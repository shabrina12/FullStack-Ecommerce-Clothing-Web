import React from 'react'
import {client} from '../lib/client'
import { AllProducts } from '../components'

const female = ({AllFemaleProducts}) => {
    return (
        <div className='Allproducts-container'>
            {AllFemaleProducts?.map(prod => (
                <AllProducts key={prod._id} allproducts={prod} />
            ))}
        </div>
      )
}

export const getServerSideProps = async () => {
    const query = '*[category == "Female"]';
    const AllFemaleProducts = await client.fetch(query);

    return {
      props: { AllFemaleProducts }
    }
}

export default female
