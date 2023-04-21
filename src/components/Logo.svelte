<div>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xml:lang="en"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 500 500"
	>
		<!-- <title>The Gratitude Machine</title> -->
		<defs>
			<path
				id="textcircle"
				d="M250,400
                   a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
				transform="rotate(12,250,250)"
			/>
			<linearGradient
				id="paint0_linear_314_2"
				x1="135"
				y1="34"
				x2="394"
				y2="455"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#FFE500" />
				<stop offset="1" stop-color="#FFB800" stop-opacity="0" />
			</linearGradient>
		</defs>

		<path
			d="M250,400
                   a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
			fill="url(#paint0_linear_314_2)"
		/>
		<g class="textcircle">
			<text textLength="940">
				<textPath xlink:href="#textcircle" aria-label="The Gratitude Machine" textLength="940">
					<!-- The Gratitude Machine | The Gratitude Machine |&#160; -->
					The Gratitude Machine.&#160;
				</textPath>
			</text>
		</g>
	</svg>
</div>

<style>
	div {
		display: grid;
		place-items: center;
		width: 7em;
	}

	text {
		animation: rotate 60s linear infinite;
		transform-origin: 250px 250px;
		font-size: 2em;
		font-family: var(--font-headings);
	}

	svg {
		max-width: 80vmin;
	}

	@keyframes rotate {
		to {
			transform: rotate(360deg);
		}
	}

	.textcircle {
		transition: transform 1s cubic-bezier(0.65, 0, 0.35, 1);
		transform-origin: 250px 250px;
	}

	svg:hover .textcircle {
		transform: scale(1.2) rotate(90deg);
	}
</style>
