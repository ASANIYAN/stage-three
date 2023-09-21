/* eslint-disable react/prop-types */
import { useState } from "react";
import { Navigate } from "react-router-dom";

import Gallery from "../components/gallery/gallery";
import Navbar from "../components/navbar/navbar";

import SHOP_DATA from "../shop-data";
import { DragDropContext } from "react-beautiful-dnd";
import { SuccessToast } from "../components/toast/toasts";

const Home = ({ user }) => {
    const [data, setData] = useState(SHOP_DATA);  

    const handleOnDragEnd = (result) => {
        if (!result || !result.destination) return;
      
        const items = [...data];
        const [draggedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, draggedItem);
      
        // Update the state with the new order of items
        setData(items);
        SuccessToast("Item set successful")
      };
      



    if (user) {
        return (
            <>
                <Navbar data={data} setData={setData} />
                <section className="mt-10">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl text-black font-semibold mb-5 text-center"> Welcome {user && user.email} </h1> 
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Gallery data={data} />
                    </DragDropContext>
                </section>
            </>
        )       
    } else {
        return <Navigate to={"/login"} />
    }
}
 
export default Home;