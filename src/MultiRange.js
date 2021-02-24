import React, { useRef, useEffect, useState } from 'react'
import './multiRange.css'

export default function MultiRange() {
	let [totalTrackWidth, setTotalTrackWidth] = useState()
	let [thumbMin, setThumbMin] = useState(300)
	let [thumbMax, setThumbMax] = useState(600)
	let [trackCursorPosition, setTrackCursorPosition] = useState()
	let [dragMax, setDragMax] = useState(false)
	let [dragMin, setDragMin] = useState(false)
	let track = useRef()

	let min = 1990
	let max = 2021
	let pixelRatio = Math.round(totalTrackWidth / (max - min))

	useEffect(() => {
		setTotalTrackWidth(track.current.clientWidth)

		if (dragMin && trackCursorPosition % pixelRatio < 5) {
			console.log(trackCursorPosition / pixelRatio)
			setThumbMin(trackCursorPosition)
		}
		if (dragMax && trackCursorPosition % pixelRatio < 5) {
			setThumbMax(trackCursorPosition)
		}

		document.body.addEventListener('mouseleave', handleMouseUp)
		document.body.addEventListener('mouseup', handleMouseUp)
		window.addEventListener('resize', handleResize)

		return () => {
			document.body.removeEventListener('mouseleave', handleMouseUp)
			window.removeEventListener('resize', handleResize)
			document.body.removeEventListener('mouseup', handleMouseUp)
		}
	})

	function handleResize() {
		setTotalTrackWidth(track.current.clientWidth)
	}

	function handleMouseUp() {
		setDragMax(false)
		setDragMin(false)
	}

	function handleMouseDown() {
		// console.log(Math.abs(trackCursorPosition - thumbMin))
		Math.abs(trackCursorPosition - thumbMin) <
		Math.abs(trackCursorPosition - thumbMax)
			? setDragMin(true)
			: setDragMax(true)
	}
	// function handleMouseDown(callback) {
	// 	callback(true)
	// }

	// console.log(dragMin, dragMax)

	// console.log(pixelRatio)

	return (
		<div class="multiRange">
			<div ref={track} class="track">
				<div class="visualTrack" style={{ width: pixelRatio * (max - min) }} />

				<div
					class="thumb min"
					onMouseMove={(e) => {
						setTrackCursorPosition(e.pageX - e.target.parentElement.offsetLeft)
					}}
					// onMouseDown={() => handleMouseDown(setDragMin)}
					style={{ left: thumbMin }}
				/>
				<div
					class="thumb max"
					onMouseMove={(e) => {
						setTrackCursorPosition(e.pageX - e.target.parentElement.offsetLeft)
					}}
					// onMouseDown={() => handleMouseDown(setDragMax)}
					style={{ left: thumbMax }}
				/>
				<div
					class="tracker"
					onMouseMove={(e) => {
						setTrackCursorPosition(e.pageX - e.target.parentElement.offsetLeft)
					}}
					onMouseDown={handleMouseDown}
				/>
			</div>
		</div>
	)
}
