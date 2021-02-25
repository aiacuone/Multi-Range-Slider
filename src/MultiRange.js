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
				class={'section-multi-range ' + item}
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
					<div class="thumbContainer-multi-range min">
						<div class="thumb-multi-range min" />
					</div>
				)}
				{maxThumb == item && (
					<div class="thumbContainer-multi-range max">
						<div class="thumb-multi-range max" />
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
		<div class="multi-range">
			<div class={'header-container-multi-range ' + { title }}>
				<div class="header-multi-range min">
					<h2>{minThumb * multiplier}</h2>
				</div>
				<div class="header-multi-range title">
					<h1>{title}</h1>
				</div>
				<div class="header-multi-range max">
					<h2>{maxThumb * multiplier}</h2>
				</div>
			</div>
			<div
				class="track-multi-range"
				onMouseUp={() => setTrackMouseDown(false)}
				onMouseDown={() => setTrackMouseDown(true)}>
				{sections}
			</div>
		</div>
	)
}
