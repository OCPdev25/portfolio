<!-- 234005e7-cd37-47ab-9c0c-1142b5937859 033d871e-b5a1-4a68-a28b-1f789693a693 -->
# Paper Roll Banner Animation Implementation

## Overview

Transform the collaboration banner into a paper roll effect that unrolls horizontally to the right of the green dot. Implement incrementally with a control panel for testing different animation variations.

## Phase 1: Control Panel Setup & Basic Structure

**Files to modify:** `src/lib/components/AnimationControlPanel.svelte`, `src/lib/components/ProfilePicture.svelte`

- Repurpose `AnimationControlPanel.svelte` to control banner animation
- Add controls for:
- Text reveal method (opacity fade, clip-path reveal, delayed visibility)
- Animation timing (single continuous vs multi-stage)
- Unroll duration
- Text reveal delay
- Add state variables in `ProfilePicture.svelte` to receive control panel values
- Keep existing banner visible but prepare for roll animation structure

## Phase 2: Cylindrical Roll Animation Structure

**Files to modify:** `src/app.css`, `src/lib/components/ProfilePicture.svelte`

- Create wrapper element for banner with positioning relative to green dot
- Use `::before` pseudo-element to create the cylindrical roll (circular/curved edge)
- Use `::after` pseudo-element for roll shadow/depth effect
- Implement `clip-path: polygon()` to simulate paper unrolling
- Set initial state: banner clipped to tiny circle at dot position
- Use `transform-origin` set to left center (near green dot)
- Add CSS variables for roll dimensions and positioning

## Phase 3: Unroll Animation Keyframes

**Files to modify:** `src/app.css`

- Create `@keyframes bannerUnroll` animation:
- Start: `clip-path: polygon()` showing only a small circle (rolled state)
- End: `clip-path: polygon()` revealing full banner width (unrolled state)
- Use `transform: scaleX()` combined with clip-path for smooth unroll effect
- Create `@keyframes bannerRollBack` for reverse animation
- Implement `calc()` for dynamic positioning relative to green dot
- Use `transform` with `rotate()` and `scaleX()` for cylindrical effect
- Add transition timing based on control panel values

## Phase 4: Text Reveal Methods

**Files to modify:** `src/app.css`, `src/lib/components/ProfilePicture.svelte`

- Implement three text reveal options controlled by panel:
- **Opacity method:** Text starts `opacity: 0`, fades in after unroll completes
- **Clip-path method:** Text uses `clip-path` that reveals as banner unrolls
- **Delayed visibility:** Text uses `visibility: hidden` until ~80% unroll progress
- Add CSS classes for each reveal method
- Connect control panel selection to apply appropriate class
- Ensure text is hidden during roll-back animation

## Phase 5: Animation Timing Options

**Files to modify:** `src/app.css`, `src/lib/components/ProfilePicture.svelte`

- Implement single continuous animation (roll + text reveal in one smooth sequence)
- Implement multi-stage animation (roll → pause → text reveal)
- Add animation state management in Svelte component
- Use control panel to toggle between timing modes
- Ensure smooth roll-back works for both timing options

## Phase 6: Polish & Refinements

**Files to modify:** `src/app.css`, `src/lib/components/ProfilePicture.svelte`

- Fine-tune easing functions for realistic paper roll motion
- Add subtle shadows and depth to cylindrical roll effect
- Ensure proper z-index layering (dot, banner, roll effect)
- Test roll-back animation on mouse leave
- Add `prefers-reduced-motion` support
- Optimize performance with `will-change` properties
- Clean up any temporary debug styles

## Technical Details

### Key CSS Techniques

- `clip-path: polygon()` for unroll reveal effect
- `::before` and `::after` pseudo-elements for cylindrical roll visual
- `transform: scaleX()` and `rotate()` for 3D roll effect
- `calc()` for dynamic positioning relative to green dot
- CSS custom properties for animation control

### Component Structure

- Banner wrapper with `position: absolute` relative to green dot
- Roll effect created via pseudo-elements
- Text content separate from roll animation
- State management for hover, animation stage, and control panel values

### Control Panel Integration

- Export animation settings from `AnimationControlPanel.svelte`
- Import and use in `ProfilePicture.svelte` via props or context
- Real-time preview of animation variations