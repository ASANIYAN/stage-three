/* eslint-disable react/prop-types */
import { useState } from "react";
import { Navigate } from "react-router-dom";

import Gallery from "../components/gallery/gallery";
import Navbar from "../components/navbar/navbar";

import SHOP_DATA from "../shop-data";

const Home = ({ user }) => {
    const [data, setData] = useState(SHOP_DATA);  

    if (user) {
        return (
            <>
                <Navbar data={data} setData={setData} />
                <section className="mt-10">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl text-black font-semibold mb-5 text-center"> Welcome {user && user.email} </h1> 
                    <Gallery data={data} />
                </section>
            </>
        )       
    } else {
        return <Navigate to={"/login"} />
    }
}
 
export default Home;