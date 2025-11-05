<script lang="ts">
</script>

<div class="toggle">
	<input type="checkbox" id="btn" />
	<label for="btn" class="btn">
		<span class="thumb"></span>
	</label>
</div>

<style>
	:root {
		--sz: 10vmin;
		--tr: all 0.5s ease 0;
	}
	* {
		transition: var(--tr);
		box-sizing: border-box;
	}
	.toggle {
		position: relative;
		width: calc(var(--sz) * 4);
		height: calc(var(--sz) * 4);
		display: flex;
		align-items: center;
		justify-content: center;
		filter: drop-shadow(-2px 2px 4px hsla(160, 23%, 97%, 0.5));
	}
	.toggle::before {
		content: '';
		position: absolute;
		top: 4vmin;
		left: -1.9vmin;
		width: 2vmin;
		height: calc(100% - 4vmin);
		background-color: #fff;
		clip-path: polygon(0% 0%, 18% 8, 2% 39%, 21% 80%, 2% 90%, 15% 105%, 100% 100%, 100% 0%);
	}
	.toggle::after {
		content: '';
		position: absolute;
		top: 4vmin;
		left: -1.9vmin;
		width: 0.2vmin;
		height: calc(100% - 4vmin);
		background: repeating-linear-gradient(
			180deg,
			#ccc6,
			#fff calc(1px + 0.8vmin) calc(0.8vmin + 2px)
		);
	}
	input {
		display: none;
	}
	label[for='btn'] {
		position: absolute;
		top: 0;
		left: 0;
		width: calc(var(--sz) * 4);
		height: calc(var(--sz) * 2);
		background: linear-gradient(180deg, #fff 30%, #ccc 30%);
		background-size: 100% 200%;
		background-repeat: no-repeat;
		background-position: 0 4vmin;
		transition: background-size 0.5s ease 0s;
	}
	#btn:checked + label[for='btn'] {
		background-size: 260% calc(100% - 4vmin);
	}
	label[for='btn']::before,
	label[for='btn']::after {
		content: 'ON';
		position: absolute;
		width: 50%;
		color: #9acd32;
		text-align: center;
		height: 100%;
		line-height: 23.5vmin;
		font-size: 8vmin;
		font-family: Arial, Helvetica, sans-serif;
		transform: scaleY(1.1);
		padding: 0 2vmin;
		text-shadow:
			0 1px 2px #0008,
			0 -2px 1px #eee;
	}
	label[for='btn']::after {
		content: 'OFF';
		right: 0.5vmin;
		padding: 0;
		text-align: right;
		color: #ffc;
		text-shadow:
			0 -2px 2px #ffffff87,
			0 1px 2px #222;
	}
	.thumb {
		position: absolute;
		width: calc(calc(var(--sz) * 2 - calc(var(--sz) / 3)));
		height: calc(calc(var(--sz) * 2 - calc(var(--sz) / 30)));
		top: calc(calc(var(--sz) / 10 + calc(var(--sz) / -15)));
		left: calc(calc(var(--sz) / 10 - calc(var(--sz) * 0.35)));
		background:
			repeating-conic-gradient(from -90deg at 0.15vmin 90%, #d3d5de80 0 25%, #ffff 0 100%),
			repeating-conic-gradient(from -90deg at 0.15vmin 90%, #d3d5de80 0 25%, #ffff 0 100%),
			repeating-conic-gradient(from -90deg at 0.15vmin 90%, #d3d5de80 0 25%, #ffff 0 100%);
		border-radius: 50% 50% 50% 50% / 15% 15% 15% 15%;
		box-shadow: calc(var(--sz) * -0.35) calc(var(--sz) * 0.35) calc(var(--sz) * 30) 0 #ffff;
		cursor: pointer;
		display: flex;
		z-index: 1;
		overflow: hidden;
		background-repeat: repeat-x, repeat-y, repeat-y, no-repeat;
		background-position:
			-90% 0,
			5% 0,
			185% 0,
			0 0;
		background-size:
			50% 1vmin,
			50% 1vmin,
			50% 1vmin,
			100% 100%;
	}
	#btn:checked + label .thumb {
		transition: var(--tr);
		left: calc(calc(100% - calc(var(--sz) * 2) - calc(var(--sz) / 3)) - var(--sz) / 10) +
			calc(var(--sz) * 0.075);
		background-position:
			150% 0,
			150% 0,
			285% 0,
			0 0;
	}
	.thumb::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 25%;
		background:
			raddial-gradient(ellipse at 50% 50%, #fff 2.75vmin, #fff calc(2.75vmin + 2px) 100%), #d3d5de80;
		border-radius: 100%;
	}
</style>
