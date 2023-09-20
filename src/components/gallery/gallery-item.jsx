/* eslint-disable react/prop-types */
const GalleryItem = ({item}) => {
    const { name, imageUrl } = item;
    return (
        <section className="p-3 shadow-md bg-white hover:scale-110 cursor-pointer transition-all rounded">
            <img src={imageUrl} alt={name} className="w-[250px] h-[300px]" />
            <p className="text-center mt-2"> {name} </p>
        </section>
    );
}
 
export default GalleryItem;