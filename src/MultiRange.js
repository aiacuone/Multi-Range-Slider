import React, { useState, useEffect } from 'react'
import './multiRange.css'

export default function MultiRange() {
	let min = 1990
	let max = 2021
	let arr = []

	let [trackMouseDown, setTrackMouseDown] = useState(false)
	let [minThumb, setMinThumb] = useState(1990)
	let [maxThumb, setMaxThumb] = useState(2021)

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
			{
				<h3>
					{minThumb}-{maxThumb}
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
