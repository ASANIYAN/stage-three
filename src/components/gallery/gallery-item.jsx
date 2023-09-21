import { Draggable } from "react-beautiful-dnd";

/* eslint-disable react/prop-types */
const GalleryItem = ({item, index}) => {
    const { name, imageUrl, id } = item;
    return (
        <Draggable draggableId={`${id}`} key={id} index={index}>
            {(provided) => (
                <section 
                    className="p-3 shadow-md bg-white hover:scale-110 cursor-pointer transition-all rounded"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <img src={imageUrl} alt={name} className="w-[250px] h-[300px]" />
                    <p className="text-center mt-2"> {name} </p>
                    {/* {provided.placeholder} */}
                </section>
            )}
        </Draggable>
    );
}
 
export default GalleryItem;