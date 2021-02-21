import React, {useState,useEffect,useRef} from 'react'
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

    if(minDistance<=maxDistance&&trackWidth<101){
      setMin(trackWidth)
      setMinDrag(true)
    }else if(minDistance>=maxDistance&&trackWidth<101){
      setMax(trackWidth)
      setMaxDrag(true)
    }
  }


  function handleMove(e){
    let parentWidthPercentage=parseInt(((e.pageX-(e.target.parentElement.offsetParent.offsetLeft+e.target.parentElement.offsetLeft))/e.target.parentElement.clientWidth)*100)
    let widthPercentage=parseInt(((e.pageX-(e.target.offsetParent.offsetLeft+e.target.offsetLeft))/e.target.clientWidth)*100)

    e.target.className!=='track'&&setTrackWidth(parentWidthPercentage)
    e.target.className==='track'&&setTrackWidth(widthPercentage)
  }

  useEffect(()=>{
    if(minDrag&&trackWidth<101&&trackWidth>-1&&trackWidth<max){
      setMin(trackWidth)
    }
    if(maxDrag&&trackWidth<101&&trackWidth>-1&&trackWidth>min){
      setMax(trackWidth)
    }
    document.body.addEventListener('mouseup',handleMouseUp)
    return()=>{
      document.body.removeEventListener('mouseup',handleMouseUp)
    }

  })

  function handleMouseUp(){
    setMinDrag(false)
    setMaxDrag(false)
  }

  let track = useRef()

    return (
      <div class='multiRange'>
          <h3>{min}-{max}</h3>
          <div ref={track} style={{width:'90%'}}class='track'onMouseMove={handleMove} onMouseDown={handleMouseDown}  >
              <div class='thumb min' style={{left:min+'%'}}/>
              <div class='thumb max' style={{left:max+'%'}}/>
          </div>
          {/* {console.log(track.current.style.width)} */}
      </div>
    )
}
