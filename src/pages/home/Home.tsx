import React, { memo } from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection.tsx";
import ProductGrid from "../../components/product/ProductGrid";
import Testimonial from "../../components/testimonial/Testimonial.tsx";
import Track from "../../components/track/Track";

const Home: React.FC = memo(() => {
  return (
    <Layout>
      <HeroSection />
      <ProductGrid />
      <Track />
      <Testimonial />
    </Layout>
  );
});

Home.displayName = "Home";

export default Home;
