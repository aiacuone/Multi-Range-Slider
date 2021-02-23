import React, { useState, useEffect, useRef } from 'react'
import './multiRange.css'

export default function MultiRange() {
	let track = useRef()

  let step = 10
  let minValue = 1991
  let maxValue = 2021

	let [min, setMin] = useState(30)
	let [max, setMax] = useState(70)
	let [minDrag, setMinDrag] = useState(false)
	let [maxDrag, setMaxDrag] = useState(false)
	let [trackWidth, setTrackWidth] = useState(0)
	let [trackFill, setTrackFill] = useState(undefined)

	//Finds the Closest Thumb
	function handleMouseDown() {
		let minDistance = Math.abs(trackWidth - min)
		let maxDistance = Math.abs(trackWidth - max)

		if (minDistance <= maxDistance && trackWidth < 101) {
			setMin(trackWidth)
			setMinDrag(true)
		} else if (minDistance >= maxDistance && trackWidth < 101) {
			setMax(trackWidth)
			setMaxDrag(true)
		}
	}

	//Gets Width % of Track
	function handleMove(e) {
		let parentWidthPercentage = parseInt(
			((e.pageX -
				(e.target.parentElement.offsetParent.offsetLeft +
					e.target.parentElement.offsetLeft)) /
				e.target.parentElement.clientWidth) *
				100
		)
		let widthPercentage = parseInt(
			((e.pageX - (e.target.offsetParent.offsetLeft + e.target.offsetLeft)) /
				e.target.clientWidth) *
				100
		)
		e.target.className !== 'track' && setTrackWidth(parentWidthPercentage)
		e.target.className === 'track' && setTrackWidth(widthPercentage)
	}


	useEffect(() => {
		//Sets the Thumb Position
		if (
			minDrag &&
			trackWidth < 101 &&
			trackWidth > -1 &&
			trackWidth < max &&
			trackWidth % step === 0
		) {
			setMin(trackWidth)
		}
		if (
			maxDrag &&
			trackWidth < 101 &&
			trackWidth > -1 &&
			trackWidth > min &&
			trackWidth % step === 0
		) {
			setMax(trackWidth)
		}

		//Sets Track Fill Width
		setTrackFill(
			parseInt(
				track.current.clientWidth * (max / 100) -
					track.current.clientWidth * (min / 100)
			) + 1
		)
		//Event listeners to stop bug when mouse leaves page or component, that thumb locks into moving
		document.body.addEventListener('mouseup', handleMouseUp)
		document.body.addEventListener('mouseleave', handleMouseUp)
		return () => {
			document.body.removeEventListener('mouseup', handleMouseUp)
			document.body.removeEventListener('mouseleave', handleMouseUp)
		}
	})

	function handleMouseUp() {
		setMinDrag(false)
		setMaxDrag(false)
	}

	return (
		<div class="multiRange">
			<div>
				<h3>
					{min}-{max}
				</h3>
			</div>
			<div
				class="track"
				ref={track}
				onMouseMove={handleMove}
				onMouseDown={handleMouseDown}>
				<div
					class="rangeFill"
					onMouseDown={(e) => e.preventDefault()}
					style={{ left: min + '%', right: max + '%', width: trackFill }}
				/>
				<div class="thumb min" style={{ left: min + '%' }} />
				<div class="thumb max" style={{ left: max + '%' }} />
      </div>
      {/* {console.log(trackWidth)} */}
		</div>
	)
}
