/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Gallery from "../components/gallery/gallery";
import Navbar from "../components/navbar/navbar";

const Home = ({ user }) => {

    if (user) {
        return (
            <>
                <Navbar />
                <section className="mt-10">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl text-black font-semibold mb-5 text-center"> Welcome {user && user.email} </h1> 
                    <Gallery />
                </section>
            </>
        )       
    } else {
        return <Navigate to={"/login"} />
    }
}
 
export default Home;