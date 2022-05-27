import React from "react";
import { client } from "../lib/client";
import { ProductItem, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, banner }) => {
  return (
    <>
      <HeroBanner banner={banner.length && banner[0]} />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>
          Speakers, Headphones, Phones, Laptops, Tablets, Cameras, and more!
        </p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <ProductItem product={product} key={product._id} />
        ))}
      </div>
      <FooterBanner footerBanner={banner && banner[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const products = await client.fetch(`*[_type == "product"]`);
  const banner = await client.fetch(`*[_type == "banner"]`);
  return {
    props: {
      products,
      banner,
    },
  };
};

export default Home;
