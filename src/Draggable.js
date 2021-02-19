import React, {useState,useEffect} from 'react'
import './draggable.css'


export default function Draggable() {

    const [pagePosition,setPagePosition]=useState({x:0,y:0})
    const [boxes, setBoxes]=useState({
        1:{drag:false,x:0,y:0},
        2:{drag:false,x:100,y:0},
        3:{drag:false,x:200,y:0},
        4:{drag:false,x:300,y:0},
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

    //the code doesnt like the position being changed via the mousedown event, instead, it prefers useEffect
    useEffect(()=>{
        for(let i=1;i<=Object.keys(boxes).length;i++){
            if(boxes[i].drag){
                const newBoxes={...boxes}
                newBoxes[i].x=pagePosition.x-25
                newBoxes[i].y=pagePosition.y-25
                setBoxes(newBoxes)
            }
        }
    })

    return (
        <div class='draggable' onMouseMove={handleMouseOver}>
            <div class='box 1' style={{background:'blue',left:boxes[1].x+'px',top:boxes[1].y+'px'}} onMouseDown={()=>handleMouseDown(1)} onMouseUp={()=>handleMouseUp(1)}/>
            <div class='box 2' style={{background:'orange',left:boxes[2].x+'px',top:boxes[2].y+'px'}} onMouseDown={()=>handleMouseDown(2)} onMouseUp={()=>handleMouseUp(2)}/>
            <div class='box 3' style={{background:'purple',left:boxes[3].x+'px',top:boxes[3].y+'px'}} onMouseDown={()=>handleMouseDown(3)} onMouseUp={()=>handleMouseUp(3)}/>
            <div class='box 4' style={{background:'green',left:boxes[4].x+'px',top:boxes[4].y+'px'}} onMouseDown={()=>handleMouseDown(4)} onMouseUp={()=>handleMouseUp(4)}/>
        </div>
    )
}
