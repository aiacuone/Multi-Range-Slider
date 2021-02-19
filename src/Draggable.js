import React, {useState,useEffect} from 'react'
import './draggable.css'


export default function Draggable() {

    const [pagePosition,setPagePosition]=useState({x:0,y:0})
    const [boxes, setBoxes]=useState({
        1:{drag:true,x:0,y:0},
        2:{drag:true,x:0,y:0},
        3:{drag:true,x:0,y:0},
        4:{drag:true,x:0,y:0},
    })

    function handleMouseOver(e){
        const newPagePosition={...pagePosition}
        newPagePosition.x=e.pageX
        newPagePosition.y=e.pageY
        setPagePosition(newPagePosition)
    }

    function handleDrag(e,box){
        e.preventDefault()
        const newBoxes={...boxes}
        newBoxes[4].drag=true
        setBoxes(newBoxes)
    }

    function handleDragEnd(e,box){
        e.preventDefault()
        const newBoxes={...boxes}
        newBoxes[4].drag=false
        setBoxes(newBoxes)
    }

    useEffect(()=>{
        if(boxes[4].drag){
            const newBoxes={...boxes}
            newBoxes[4].x=pagePosition.x
            newBoxes[4].y=pagePosition.y
            setBoxes(newBoxes)
        }
    })

    return (
        <div class='draggable' onMouseMove={handleMouseOver}>
            {/* <div class='box 1'/>
            <div class='box 2'/>
            <div class='box 3'/> */}
            <div class='box 4' draggable='true' style={{left:boxes[4].x+'px',top:boxes[4].y+'px'}} onDrag={(e)=>handleDrag(e,4)} onDragEnd={(e)=>handleDragEnd(e,4)}/>

        </div>
    )
}
