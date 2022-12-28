import React from 'react'
import {client} from '../lib/client'
import { HeroBanner, EventsBanner, Newsletter, FeaturesBanner, Product } from '../components'
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Home = ({products, bannerData}) => {
  return (
    <>
      <HeroBanner />
      <EventsBanner />

      <div className='products-outer-container'>
        <div className='subtitle'>
          <span>PRODUCTS</span>
          <h2>Check What We Have</h2>
        </div>
        <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={0}
            slidesPerView={3}
            navigation
        >
          <div className='products-container'>
            {products?.map(product => (
              <SwiperSlide>
                <Product key={product._id} product={product} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>

      <FeaturesBanner />
      <Newsletter />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home