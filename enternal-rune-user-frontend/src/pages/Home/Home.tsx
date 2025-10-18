import React from 'react'
import Image from 'next/image'
import HeroSection from './components/HeroSection'
import BrandList from './components/BrandList'
import ProductList from './components/ProductList'
import FeedBack from './components/FeedBack'
import FAQ from './components/FAQ'
import styles from './Home.module.scss'
import HeroSection2 from './components/HeroSection2'

const companiesLogo = [
  { name: "Framer", logo: "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg", },
  { name: "Huawei", logo: "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg", },
  { name: "Instagram", logo: "https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg", },
  { name: "Microsoft", logo: "https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg", },
  { name: "Walmart", logo: "https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg", }
];

const Home = () => {

  return (
    <>
      <HeroSection2 />
      <div className='container mx-auto'>
        <BrandList />
        <ProductList />
        <div className='my-20 px-4'>
          <h3 className="text-base text-center text-slate-400 pb-14 font-medium">
            Được tin tưởng bởi các thương hiệu hàng đầu, bao gồm —
          </h3>
          <div className="overflow-hidden w-full relative max-w-5xl mx-auto select-none">
            <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

            <div className={`flex ${styles.marqueeInner} will-change-transform max-w-5xl mx-auto`} style={{ whiteSpace: 'nowrap' }}>
              {[...companiesLogo, ...companiesLogo].map((company, index) => (
                <Image key={index} className="mx-11" src={company.logo} alt={company.name} width={100} height={50} />
              ))}
            </div>

            <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
          </div>
        </div>
        <FAQ />
        <FeedBack />
      </div>
    </>
  )
}

export default Home