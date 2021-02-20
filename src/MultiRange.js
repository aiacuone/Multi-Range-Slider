import React, {useState,useEffect} from 'react'
import './multiRange.css'


export default function MultiRange() {

  let [min,setMin]=useState(30)
  let [max,setMax]=useState(80)
  let [minDrag,setMinDrag]=useState(false)
  let [maxDrag,setMaxDrag]=useState(false)
  let [trackWidth,setTrackWidth]=useState(0)

  function handleMouseDown(){
    let minDistance= Math.abs(trackWidth-min)
    let maxDistance= Math.abs(trackWidth-max)
    if(minDistance<=maxDistance){
      setMin(trackWidth)
      setMinDrag(true)
    }else{
      setMax(trackWidth)
      setMaxDrag(true)
    }
  }

  

  function handleMove(e){
    e.target.className!=='track'&&setTrackWidth(parseInt(((e.pageX-(e.target.parentElement.offsetParent.offsetLeft+e.target.parentElement.offsetLeft))/e.target.parentElement.clientWidth)*100))

    e.target.className==='track'&&setTrackWidth(parseInt(((e.pageX-(e.target.offsetParent.offsetLeft+e.target.offsetLeft))/e.target.clientWidth)*100))
  }


  useEffect(()=>{
    minDrag&&setMin(trackWidth-3)
    maxDrag&&setMax(trackWidth-3)
  })
  
    return (
      <div class='multiRange'>
          <h3>{min+3}-{max+3}</h3>
          <div class='track' onMouseMove={handleMove} onMouseDown={handleMouseDown}>
              <div class='thumb min' onMouseUp={()=>setMinDrag(false)&&setMaxDrag(false)} onMouseDown={()=>setMinDrag(true)} onMouseUp={()=>setMinDrag(false)} style={{left:min+'%'}}/>
              <div class='thumb max' onMouseUp={()=>setMinDrag(false)&&setMaxDrag(false)} onMouseDown={()=>setMaxDrag(true)} onMouseUp={()=>setMaxDrag(false)} style={{left:max+'%'}}/>
          </div>
      </div>
    )
}
