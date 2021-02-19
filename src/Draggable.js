import React, {useState,useEffect} from 'react'
import './draggable.css'


export default function Draggable() {

    const [pagePosition,setPagePosition]=useState({x:0,y:0})
    const [boxes, setBoxes]=useState({
        1:{drag:false,x:0,y:0},
        2:{drag:false,x:0,y:0},
        3:{drag:false,x:0,y:0},
        4:{drag:false,x:0,y:0},
    })

    function handleMouseOver(e){
        const newPagePosition={...pagePosition}
        newPagePosition.x=e.pageX
        newPagePosition.y=e.pageY
        setPagePosition(newPagePosition)
    }

    function handleMouseDown(box){
        const newBoxes={...boxes}
        newBoxes[box].drag=true
        setBoxes(newBoxes)
    }

    function handleMouseUp(box){
        const newBoxes={...boxes}
        newBoxes[box].drag=false
        setBoxes(newBoxes)
    }

    useEffect(()=>{
        let dragging=document.getElementsByClassName('drag')
        dragging.length>0&&console.log(dragging[0].style.left)
    })


    return (
        <div class='draggable' onMouseMove={handleMouseOver}>
            {/* <div class='box 1'/>
            <div class='box 2'/>
            <div class='box 3'/> */}
            <div class={boxes[4].drag?'box 4 drag':'box 4'} style={{left:boxes[4].x+'px',top:boxes[4].y+'px'}} onMouseDown={()=>handleMouseDown(4)} onMouseUp={()=>handleMouseUp(4)}/>
            {/* {console.log(pagePosition)} */}
        </div>
    )
}
