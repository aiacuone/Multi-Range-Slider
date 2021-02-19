import React, {useState,useEffect} from 'react'
import './draggable.css'


export default function Draggable() {

    const [pagePosition,setPagePosition]=useState({x:0,y:0})
    const [boxes, setBoxes]=useState({
        1:{x:0,y:0},
        2:{x:0,y:0},
        3:{x:0,y:0},
        4:{x:0,y:0},
    })

    function handleMouseOver(e){
        const newPagePosition={...pagePosition}
        newPagePosition.x=e.pageX
        newPagePosition.y=e.pageY
        setPagePosition(newPagePosition)
    }
        


    function handleDrag(box){
        const newBoxes={...boxes}
        newBoxes[box].x=pagePosition.x
        newBoxes[box].y=pagePosition.y
        setBoxes(newBoxes)
        // console.log('dragging')
    }

    function handleDragEnd(){
        // console.log('drag end')
    }


    return (
        <div class='draggable' onMouseMove={handleMouseOver}>
            {/* <div class='box 1'/>
            <div class='box 2'/>
            <div class='box 3'/> */}
            <div class='box 4' draggable='true' style={{left:boxes[4].x,top:boxes[4].y}} onMouseDown={()=>handleDrag(4)} onMouseUp={()=>handleDragEnd(4)}/>
            {/* {console.log(pagePosition)} */}
        </div>
    )
}
