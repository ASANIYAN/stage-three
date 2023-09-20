/* eslint-disable react/prop-types */
import { DragDropContext, Draggable } from "react-beautiful-dnd";
// import GalleryItem from "./gallery-item";

import { StrictModeDroppable as Droppable } from "../../helpers/strict-mode-droppable";
import { useEffect, useState } from "react";

const Gallery = ({ data }) => {

    const [modData, setModData] = useState(data || []);

    useEffect(() => {
        setModData(data);
    }, [data])

    const handleOnDragEnd = (result) => {
        if (!result) return;

        const tasks = [...modData];
        const [ reorderedItem ] = tasks.splice[result.source.index, 1];
        tasks.splice(result.destination.index, 0 , reorderedItem);
        setModData(tasks);
    }

    return (
        <>
            { data.length > 0 &&
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="items" >
                        {(provided) => (
                            <section 
                                {...provided.droppableProps}  
                                ref={provided.innerRef}
                                className="flex flex-wrap gap-8 mt-10 justify-center"
                            >
                                { data.map((item, index) => (
                                    <Draggable 
                                        key={item.id} 
                                        draggableId={item.id.toString().trim()} 
                                        index={index}
                                    >
                                        {(provided) => (
                                            <section 
                                                {...provided.droppableProps} 
                                                {...provided.dragHandleProps} 
                                                ref={provided.innerRef}    
                                            >
                                                <section 
                                                    className="p-3 shadow-md bg-white hover:scale-110 cursor-pointer transition-all rounded"
                                                    {...provided.droppableProps} 
                                                    {...provided.dragHandleProps} 
                                                    ref={provided.innerRef}    
                                                >
                                                    <img src={item.imageUrl} alt={item.name} className="w-[250px] h-[300px]" />
                                                    <p className="text-center mt-2"> {item.name} </p>
                                                </section>
                                            </section>
                                            // <GalleryItem 
                                            //     item={item}
                                            //     {...provided.droppableProps} 
                                            //     {...provided.dragHandleProps} 
                                            //     ref={provided.innerRef}
                                            // /> 
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </section>
                        )}
                    </Droppable>
                </DragDropContext>
            }
            { modData.length === 0 && <p className="flex justify-center text-2xl"> No result found!!!  </p> }
        </>
    );
}
 
export default Gallery;