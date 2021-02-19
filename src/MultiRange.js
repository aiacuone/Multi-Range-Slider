import React, {useState} from 'react'
import './multiRange.css'


export default function MultiRange() {


  let [min,setMin]=useState(30)
  let [max,setMax]=useState(80)
  let [trackWidth,setTrackWidth]=useState(0)


  function handleClick(){
    // console.log(min,trackWidth,max)
    let minDistance= Math.abs(trackWidth-min)
    let maxDistance= Math.abs(trackWidth-max)
    minDistance<=maxDistance?setMin(trackWidth):setMax(trackWidth)
    // console.log(minDistance,maxDistance)
  }

  function handleMove(e){

    e.target.className!=='track'&&setTrackWidth(parseInt(((e.pageX-(e.target.parentElement.offsetParent.offsetLeft+e.target.parentElement.offsetLeft))/e.target.parentElement.clientWidth)*100))

    e.target.className==='track'&&setTrackWidth(parseInt(((e.pageX-(e.target.offsetParent.offsetLeft+e.target.offsetLeft))/e.target.clientWidth)*100))
  }

  function handleDrag(e){
    e.preventDefault()
    // console.log(e)
    // console.log(trackWidth)
    // val=='min'&&setMin(trackWidth)
    // val=='max'&&setMax(trackWidth)
  }

    return (
      <div class='multiRange'>
          <h3>{min}-{max}</h3>
          <div class='track'onMouseMove={handleMove} onClick={handleClick}>
              <div class='thumb min' draggable='true' onDrag={handleDrag} style={{left:min+'%'}}/>
              <div class='thumb max' draggable='true' onDrag={handleDrag} style={{left:max+'%'}}/>
          </div>
                {/* {console.log(trackWidth,'trackwidth')} */}
      </div>
    )
}
