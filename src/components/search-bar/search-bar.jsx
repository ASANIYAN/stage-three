/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import search_icon from "../../assets/search.svg";
import SHOP_DATA from "../../shop-data";


const SearchBar = ({ data, setData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        if (searchTerm.trim() !== "" || searchTerm.trim().length > 0) {
            const filteredData = data.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setData(filteredData);
        } else {
            setData(SHOP_DATA)
        }
    }, [searchTerm]);

    return (
        <section className="flex relative items-center rounded-md border-2 h-10 border-white p-1 xxs:p-2 w-[400px]">
            <input 
                type="text" 
                placeholder="search by tag"
                value={searchTerm}
                onChange={handleInputChange}
                className="border-transparent bg-transparent text-white placeholder:text-white w-[95%] xxs:flex-1 focus:outline-none h-full p-2"
            />
            <img src={search_icon} alt="search" />
        </section>
    );
}
 
export default SearchBar;