/* eslint-disable react/prop-types */
import GalleryItem from "./gallery-item";

import { StrictModeDroppable as Droppable } from "../../helpers/strict-mode-droppable";

const Gallery = ({ data }) => {

    return (
        <>
            { data.length > 0 &&
                            <section>
                                <Droppable droppableId="board">
                                    { (provided) => (
                                        <section
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            <section
                                                className={`flex flex-wrap gap-8 mt-10 justify-center`}
                                            >
                                                { data.map((item, index) => (
                                                    <GalleryItem key={item.id} item={item} index={index} />        
                                                ))}
                                            {provided.placeholder}
                                            </section>
                                        </section>
                                    )} 
                                </Droppable>
                            </section>
            }
            { data.length === 0 && <p className="flex justify-center text-2xl"> No result found!!!  </p> }
        </>
    );
}
 
export default Gallery;

// <GalleryItem 
                                            //     item={item}
                                            //     {...provided.droppableProps} 
                                            //     {...provided.dragHandleProps} 
                                            //     ref={provided.innerRef}
                                            // /> 