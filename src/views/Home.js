import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';
import Architecture from "../components/sections/Architecture";

const Home = () => {
    return (
        <>
            <Hero className="illustration-section-01" />
            <FeaturesTiles></FeaturesTiles>
            <FeaturesSplit
                invertMobile
                topDivider
                imageFill
                className="illustration-section-02"
            />
            <Testimonial topDivider />
            <Architecture topDivider/>
        </>
    );
};

export default Home;
