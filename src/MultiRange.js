import React, { useState, useEffect } from 'react'
import './multiRange.css'

export default function MultiRange() {
	//future props
	let min = 0
	let max = 100
	let multiplier = 1000
	let title = 'Steam Rating'

	let [trackMouseDown, setTrackMouseDown] = useState(false)
	let [minThumb, setMinThumb] = useState(min)
	let [maxThumb, setMaxThumb] = useState(max)

	let arr = []
	for (let i = min; i < max + 1; i++) {
		arr.push(i)
	}

	let sections = arr.map((item) => {
		return (
			<div
				onClick={() =>
					Math.abs(minThumb - item) < Math.abs(maxThumb - item)
						? setMinThumb(item)
						: setMaxThumb(item)
				}
				class={'section ' + item}
				onMouseEnter={() => {
					if (trackMouseDown) {
						if (Math.abs(minThumb - item) < Math.abs(maxThumb - item)) {
							setMinThumb(item)
						} else {
							setMaxThumb(item)
						}
					}
				}}
				style={{
					background:
						item < minThumb || item > maxThumb ? 'rgb(36, 36, 36)' : 'grey',
				}}>
				{minThumb == item && (
					<div class="thumbContainer min">
						<div class="thumb min" />
					</div>
				)}
				{maxThumb == item && (
					<div class="thumbContainer max">
						<div class="thumb max" />
					</div>
				)}
			</div>
		)
	})

	useEffect(() => {
		document.body.addEventListener('mouseup', () => setTrackMouseDown(false))
		document.body.addEventListener('mouseleave', () => setTrackMouseDown(false))
		return () => {
			document.body.removeEventListener('mouseup', () =>
				setTrackMouseDown(false)
			)
			document.body.removeEventListener('mouseleave', () =>
				setTrackMouseDown(false)
			)
		}
	})

	return (
		<div class="multiRange">
			<div class={'headerContainer ' + { title }}>
				<div class="header min"><h2>{minThumb * multiplier}</h2></div>
				<div class="header title"><h1>{title}</h1></div>
				<div class='header max'><h2>{maxThumb * multiplier}</h2></div>
			</div>
			{
				<h3>
					{/* {minThumb * multiplier}-{maxThumb * multiplier} */}
				</h3>
			}
			<div
				class="track"
				onMouseUp={() => setTrackMouseDown(false)}
				onMouseDown={() => setTrackMouseDown(true)}>
				{sections}
			</div>
		</div>
	)
}
