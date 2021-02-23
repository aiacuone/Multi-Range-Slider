import React, { useState, useEffect, useRef } from 'react'
import './multiRange.css'

export default function MultiRange() {
	let [min, setMin] = useState(3)
	let [max, setMax] = useState(10)
	let [minDrag, setMinDrag] = useState(false)
	let [maxDrag, setMaxDrag] = useState(false)
	let [trackWidth, setTrackWidth] = useState(0)
	let [trackFill, setTrackFill] = useState(undefined)
	let [maxTrackWidth, setMaxTrackWidth] = useState('')

	let track = useRef()
	let step = 2
	let minValue = 1990
	let maxValue = 2022
	let pixelsPerRatio = Math.ceil(maxTrackWidth / (maxValue - minValue))

	//Finds the Closest Thumb
	function handleMouseDown() {
		let minDistance = Math.abs(trackWidth - min * pixelsPerRatio)
		let maxDistance = Math.abs(trackWidth - max * pixelsPerRatio)
		if (minDistance <= maxDistance && trackWidth < maxTrackWidth) {
			setMin(Math.round(trackWidth / pixelsPerRatio))
			setMinDrag(true)
		} else if (minDistance >= maxDistance && trackWidth < maxTrackWidth) {
			setMax(Math.round(trackWidth / pixelsPerRatio))
			setMaxDrag(true)
		}
	}

	//Gets Width % of Track
	function handleMove(e) {
		let parentPixelWidth =
			e.pageX -
			(e.target.parentElement.offsetParent.offsetLeft +
				e.target.parentElement.offsetLeft)

		let pixelWidth =
			e.pageX - (e.target.offsetParent.offsetLeft + e.target.offsetLeft)

		e.target.className !== 'track' && setTrackWidth(parentPixelWidth)
		e.target.className === 'track' && setTrackWidth(pixelWidth)
	}

	useEffect(() => {
		//Sets the maximum length of track
		setMaxTrackWidth(track.current.clientWidth)

		//Sets Track Fill Width
		setTrackFill(parseInt((max - min) * pixelsPerRatio))

		//Sets the Thumb Position
		if (
			minDrag &&
			trackWidth % pixelsPerRatio < 13 &&
			trackWidth < maxTrackWidth &&
			trackWidth < max * pixelsPerRatio
		) {
			setMin(Math.round(trackWidth / pixelsPerRatio))
		}
		if (
			maxDrag &&
			trackWidth % pixelsPerRatio < 13 &&
			trackWidth < maxTrackWidth &&
			trackWidth > min * pixelsPerRatio
		) {
			setMax(Math.round(trackWidth / pixelsPerRatio))
		}

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
					{minValue + min}-{minValue + max}
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
					style={{
						left: min * pixelsPerRatio + 'px',
						right: max * pixelsPerRatio + 'px',
						width: trackFill,
					}}
				/>
				<div
					class="thumb min"
					onMouseDown={(e) => e.preventDefault()}
					style={{
						left: min * pixelsPerRatio + 'px',
						width: pixelsPerRatio + 'px',
					}}
				/>
				<div
					class="thumb max"
					onMouseDown={(e) => e.preventDefault()}
					style={{
						left: max * pixelsPerRatio + 'px',
						width: pixelsPerRatio + 'px',
					}}
				/>
			</div>
		</div>
	)
}
