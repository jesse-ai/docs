<template>
  <!--
    Main column with optional top / left / right / bottom rails.
    Each shouldCollapse* flag closes that slot (expand size ↔ collapse size).
  -->
  <div
    :class="[
      'flex flex-col',
      fullHeight ? 'h-full min-h-0' : undefined,
    ]"
  >
    <div
      v-if="$slots.top"
      class="collapsable-layout-stack shrink-0"
      :class="topFullyHidden ? 'pointer-events-none' : 'pointer-events-auto'"
      data-side="top"
      :data-open="topOpen ? 'true' : undefined"
      :data-closing="topClosing ? 'true' : undefined"
      :data-animate="topAnimate ? 'true' : undefined"
      :style="topRailStyle"
      :aria-hidden="topFullyHidden ? 'true' : undefined"
    >
      <div
        ref="topSlotRef"
        class="box-border min-h-0 w-full"
        :style="topSlotStyle"
      >
        <slot name="top" :open="topOpen" />
      </div>
    </div>

    <div
      v-if="$slots.default || $slots.left || $slots.right"
      :class="contentRowClass"
    >
      <aside
        v-if="$slots.left"
        class="collapsable-layout-rail hidden shrink-0 lg:block"
        :class="leftRailClass"
        data-side="left"
        :data-open="leftOpen ? 'true' : undefined"
        :data-closing="leftClosing ? 'true' : undefined"
        :data-animate="leftAnimate ? 'true' : undefined"
        :style="leftRailStyle"
        :aria-hidden="leftFullyHidden ? 'true' : undefined"
      >
        <!--
          Snap slot to the target width immediately; the rail animates and clips.
          Avoids continuous reflow (and scroll jumps) while the width keyframes run.
        -->
        <div class="box-border h-full min-w-0" :style="{ width: leftSlotWidth }">
          <slot name="left" :open="leftOpen" />
        </div>
      </aside>

      <div :class="mainClass">
        <slot />
      </div>

      <aside
        v-if="$slots.right"
        class="collapsable-layout-rail shrink-0"
        :class="[rightRailClass, rightVisibilityClass]"
        data-side="right"
        :data-open="rightOpen ? 'true' : undefined"
        :data-closing="rightClosing ? 'true' : undefined"
        :data-animate="rightAnimate ? 'true' : undefined"
        :style="rightRailStyle"
        :aria-hidden="rightFullyHidden ? 'true' : undefined"
      >
        <div
          class="box-border min-w-0"
          :class="stackRightBelowLg ? 'h-auto max-lg:!w-full lg:h-full' : 'h-full'"
          :style="{ width: rightSlotWidth }"
        >
          <slot name="right" :open="rightOpen" />
        </div>
      </aside>
    </div>

    <div
      v-if="$slots.bottom"
      class="collapsable-layout-stack shrink-0"
      :class="bottomFullyHidden ? 'pointer-events-none' : 'pointer-events-auto'"
      data-side="bottom"
      :data-open="bottomOpen ? 'true' : undefined"
      :data-closing="bottomClosing ? 'true' : undefined"
      :data-animate="bottomAnimate ? 'true' : undefined"
      :style="bottomRailStyle"
      :aria-hidden="bottomFullyHidden ? 'true' : undefined"
    >
      <div
        ref="bottomSlotRef"
        class="box-border min-h-0 w-full"
        :style="bottomSlotStyle"
      >
        <slot name="bottom" :open="bottomOpen" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch, type Ref } from 'vue'

const props = withDefaults(defineProps<{
  /** Close the left rail when true. */
  shouldCollapseLeft?: boolean
  /** Close the right rail when true. */
  shouldCollapseRight?: boolean
  /** Close the top rail when true. */
  shouldCollapseTop?: boolean
  /** Close the bottom rail when true. */
  shouldCollapseBottom?: boolean
  /** Sticky offset when a horizontal rail has sticky enabled. */
  stickTop?: string
  /** Space kept under a fitted sticky rail so the page end does not push it. */
  stickBottom?: string
  /** Stretch rails to full parent height (admin shell). */
  fullHeight?: boolean
  /** Make the left rail sticky. */
  leftSticky?: boolean
  /** Make the right rail sticky. */
  rightSticky?: boolean
  /**
   * Keep a sticky right rail at its content height.
   * A viewport-tall rail shifts once to meet `stickTop`, then again at the end of the scroll.
   */
  rightStickyFit?: boolean
  /**
   * Show the right rail above the main column below `lg` instead of hiding it.
   * Width snaps to full container width on that breakpoint.
   */
  stackRightBelowLg?: boolean
  /** Keep the right rail in a row below `lg` instead of hiding it. */
  showRightBelowLg?: boolean
  /** Paint the right rail closed. Avoids the default open-then-collapse flash. */
  rightStartsClosed?: boolean
  leftExpandWidth?: string
  leftCollapseWidth?: string
  rightExpandWidth?: string
  rightCollapseWidth?: string
  /** Explicit expand height, or `auto` to measure slot content. */
  topExpandHeight?: string
  topCollapseHeight?: string
  bottomExpandHeight?: string
  bottomCollapseHeight?: string
  mainClass?: string
}>(), {
  shouldCollapseLeft: false,
  shouldCollapseRight: false,
  shouldCollapseTop: false,
  shouldCollapseBottom: false,
  stickTop: 'var(--admin-hero-stick-bottom, 7.5rem)',
  stickBottom: '',
  fullHeight: false,
  leftSticky: false,
  rightSticky: false,
  rightStickyFit: false,
  stackRightBelowLg: false,
  showRightBelowLg: false,
  rightStartsClosed: false,
  leftExpandWidth: 'calc(18rem + 1.25rem)',
  leftCollapseWidth: '0px',
  rightExpandWidth: 'calc(18rem + 1.25rem)',
  rightCollapseWidth: '0px',
  topExpandHeight: 'auto',
  topCollapseHeight: '0px',
  bottomExpandHeight: 'auto',
  bottomCollapseHeight: '0px',
  mainClass: 'min-w-0 lg:flex-1',
})

const emit = defineEmits<{
  'update:leftOpen': [value: boolean]
  'update:rightOpen': [value: boolean]
  'update:topOpen': [value: boolean]
  'update:bottomOpen': [value: boolean]
}>()

/**
 * `fullHeight` must be a flex container at every breakpoint so the main
 * scrollport (e.g. `.admin-main`) gets a bounded height. `lg:flex` alone
 * leaves a clipped, unscrollable column below `lg` because the canvas is
 * `overflow-hidden`.
 */
const contentRowClass = computed(() => {
  if (props.fullHeight) {
    return 'flex min-h-0 min-w-0 flex-1 flex-col lg:flex-row lg:items-stretch'
  }
  if (props.stackRightBelowLg) {
    return 'flex min-w-0 flex-col lg:flex-row lg:items-start'
  }
  if (props.showRightBelowLg) {
    return 'flex min-w-0 flex-row items-start'
  }
  return 'min-w-0 lg:flex lg:items-start'
})

const rightVisibilityClass = computed(() => {
  if (props.stackRightBelowLg) {
    return 'order-first mb-5 block w-full max-lg:!w-full max-lg:!overflow-visible lg:order-none lg:mb-0'
  }
  if (props.showRightBelowLg) return 'block'
  return 'hidden lg:block'
})

const SIDEBAR_ANIM_MS = 400

const topSlotRef = ref<HTMLElement | null>(null)
const bottomSlotRef = ref<HTMLElement | null>(null)

const topMeasuredOpen = ref('0px')
const bottomMeasuredOpen = ref('0px')

/**
 * Default paint is OPEN (expand size). Immediate watch / later prop updates
 * then animate to the real shouldCollapse* target (e.g. admin navbar starts
 * open, then eases to the localStorage-closed icon rail after mount).
 * Starting closed squeezed expanded slot content into the icon width.
 */
const leftOpen = ref(true)
const leftClosing = ref(false)
const leftAnimate = ref(false)
const leftReady = ref(false)
let leftCloseTimer: ReturnType<typeof setTimeout> | null = null
let leftSyncGeneration = 0

const rightOpen = ref(!props.rightStartsClosed)
const rightClosing = ref(false)
const rightAnimate = ref(false)
const rightReady = ref(false)
let rightCloseTimer: ReturnType<typeof setTimeout> | null = null
let rightSyncGeneration = 0

const topOpen = ref(true)
const topClosing = ref(false)
const topAnimate = ref(false)
const topReady = ref(false)
let topCloseTimer: ReturnType<typeof setTimeout> | null = null
let topSyncGeneration = 0

const bottomOpen = ref(true)
const bottomClosing = ref(false)
const bottomAnimate = ref(false)
const bottomReady = ref(false)
let bottomCloseTimer: ReturnType<typeof setTimeout> | null = null
let bottomSyncGeneration = 0

function isZeroSize(value: string) {
  const normalized = value.trim().toLowerCase()
  return normalized === '0' || normalized === '0px' || normalized === '0rem'
}

function resolveHeight(explicit: string, measured: string) {
  return explicit.trim().toLowerCase() === 'auto' ? measured : explicit
}

const leftFullyHidden = computed(
  () => !leftOpen.value && isZeroSize(props.leftCollapseWidth),
)
const rightFullyHidden = computed(
  () => !rightOpen.value && isZeroSize(props.rightCollapseWidth),
)
const topFullyHidden = computed(
  () => !topOpen.value && isZeroSize(props.topCollapseHeight),
)
const bottomFullyHidden = computed(
  () => !bottomOpen.value && isZeroSize(props.bottomCollapseHeight),
)

const leftSlotWidth = computed(() =>
  leftOpen.value ? props.leftExpandWidth : props.leftCollapseWidth,
)
const rightSlotWidth = computed(() =>
  rightOpen.value ? props.rightExpandWidth : props.rightCollapseWidth,
)

const topExpandResolved = computed(() =>
  resolveHeight(props.topExpandHeight, topMeasuredOpen.value),
)
const bottomExpandResolved = computed(() =>
  resolveHeight(props.bottomExpandHeight, bottomMeasuredOpen.value),
)

/** Fixed height only while animating; fully open uses auto so content never clips. */
function stackSlotStyle(opts: {
  open: boolean
  animating: boolean
  closing: boolean
  expand: string
  collapse: string
}) {
  if (!opts.open && !opts.closing) return { height: opts.collapse }
  if (opts.animating || opts.closing) return { height: opts.expand }
  return { height: 'auto' }
}

const topSlotStyle = computed(() => stackSlotStyle({
  open: topOpen.value,
  animating: topAnimate.value,
  closing: topClosing.value,
  expand: topExpandResolved.value,
  collapse: props.topCollapseHeight,
}))

const bottomSlotStyle = computed(() => stackSlotStyle({
  open: bottomOpen.value,
  animating: bottomAnimate.value,
  closing: bottomClosing.value,
  expand: bottomExpandResolved.value,
  collapse: props.bottomCollapseHeight,
}))

const leftRailClass = computed(() => [
  leftFullyHidden.value ? 'pointer-events-none' : 'pointer-events-auto',
  props.fullHeight ? 'h-full' : undefined,
  props.leftSticky ? 'sticky z-0 self-start' : 'relative z-0',
])

const rightRailClass = computed(() => [
  rightFullyHidden.value ? 'pointer-events-none' : 'pointer-events-auto',
  props.fullHeight ? 'h-full' : props.rightSticky && !props.rightStickyFit ? 'h-dvh' : undefined,
  props.rightSticky
    ? props.showRightBelowLg
      ? 'sticky z-10 self-start'
      : 'lg:sticky lg:z-0 lg:self-start'
    : 'relative z-0',
])

const leftRailStyle = computed(() => ({
  '--collapsable-rail-width-open': props.leftExpandWidth,
  '--collapsable-rail-width-closed': props.leftCollapseWidth,
  ...(props.leftSticky ? { top: props.stickTop } : {}),
}))

const rightRailStyle = computed(() => ({
  '--collapsable-rail-width-open': props.rightExpandWidth,
  '--collapsable-rail-width-closed': props.rightCollapseWidth,
  ...(props.rightSticky ? { top: props.stickTop } : {}),
  ...(props.rightSticky && props.rightStickyFit
    ? { maxHeight: `calc(100dvh - ${props.stickTop} - ${props.stickBottom || props.stickTop})` }
    : {}),
}))

const topRailStyle = computed(() => ({
  '--collapsable-rail-height-open': topExpandResolved.value,
  '--collapsable-rail-height-closed': props.topCollapseHeight,
}))

const bottomRailStyle = computed(() => ({
  '--collapsable-rail-height-open': bottomExpandResolved.value,
  '--collapsable-rail-height-closed': props.bottomCollapseHeight,
}))

function clearTimer(timer: ReturnType<typeof setTimeout> | null): null {
  if (timer != null) clearTimeout(timer)
  return null
}

async function measureSlot(el: HTMLElement | null, target: Ref<string>) {
  if (!el) return
  const prev = el.style.height
  el.style.height = 'auto'
  target.value = `${Math.ceil(el.scrollHeight)}px`
  el.style.height = prev
}

async function syncRail(opts: {
  shouldOpen: boolean
  open: Ref<boolean>
  closing: Ref<boolean>
  animate: Ref<boolean>
  ready: Ref<boolean>
  isCurrent: () => boolean
  stillWantsOpen: () => boolean
  beforeOpen?: () => Promise<void>
  beforeClose?: () => Promise<void>
  getTimer: () => ReturnType<typeof setTimeout> | null
  setTimer: (t: ReturnType<typeof setTimeout> | null) => void
  emitOpen: (value: boolean) => void
}) {
  opts.setTimer(clearTimer(opts.getTimer()))

  if (opts.shouldOpen) {
    opts.closing.value = false
    if (opts.beforeOpen) await opts.beforeOpen()
    else await nextTick()
    if (!opts.isCurrent() || !opts.stillWantsOpen()) return
    if (opts.open.value) {
      // Already at the default open paint — mark ready so a later close
      // (e.g. admin localStorage) can animate from open → closed.
      opts.ready.value = true
      opts.animate.value = false
      opts.emitOpen(true)
      return
    }

    const shouldAnimate = opts.ready.value
    opts.animate.value = shouldAnimate
    opts.open.value = true
    opts.ready.value = true
    opts.emitOpen(true)
    if (shouldAnimate) {
      opts.setTimer(setTimeout(() => {
        opts.setTimer(null)
        if (!opts.isCurrent()) return
        opts.animate.value = false
      }, SIDEBAR_ANIM_MS))
    }
    return
  }

  if (!opts.isCurrent()) return

  if (!opts.open.value) {
    opts.closing.value = false
    opts.ready.value = true
    return
  }

  if (opts.beforeClose) await opts.beforeClose()
  if (!opts.isCurrent() || opts.stillWantsOpen()) return

  // Closing always uses the collapse keyframes so the open → target transition
  // (including the first localStorage restore) is visible.
  opts.animate.value = false
  opts.open.value = false
  opts.emitOpen(false)
  opts.closing.value = true
  opts.ready.value = true
  opts.setTimer(setTimeout(() => {
    opts.setTimer(null)
    if (!opts.isCurrent()) return
    opts.closing.value = false
  }, SIDEBAR_ANIM_MS))
}

watch(() => props.shouldCollapseLeft, (collapsed) => {
  const generation = ++leftSyncGeneration
  void syncRail({
    shouldOpen: !collapsed,
    open: leftOpen,
    closing: leftClosing,
    animate: leftAnimate,
    ready: leftReady,
    isCurrent: () => generation === leftSyncGeneration,
    stillWantsOpen: () => !props.shouldCollapseLeft,
    getTimer: () => leftCloseTimer,
    setTimer: (t) => { leftCloseTimer = t },
    emitOpen: (v) => emit('update:leftOpen', v),
  })
}, { immediate: true })

watch(() => props.shouldCollapseRight, (collapsed) => {
  const generation = ++rightSyncGeneration
  void syncRail({
    shouldOpen: !collapsed,
    open: rightOpen,
    closing: rightClosing,
    animate: rightAnimate,
    ready: rightReady,
    isCurrent: () => generation === rightSyncGeneration,
    stillWantsOpen: () => !props.shouldCollapseRight,
    getTimer: () => rightCloseTimer,
    setTimer: (t) => { rightCloseTimer = t },
    emitOpen: (v) => emit('update:rightOpen', v),
  })
}, { immediate: true })

watch(() => props.shouldCollapseTop, (collapsed) => {
  const generation = ++topSyncGeneration
  void syncRail({
    shouldOpen: !collapsed,
    open: topOpen,
    closing: topClosing,
    animate: topAnimate,
    ready: topReady,
    isCurrent: () => generation === topSyncGeneration,
    stillWantsOpen: () => !props.shouldCollapseTop,
    beforeOpen: () => measureSlot(topSlotRef.value, topMeasuredOpen),
    beforeClose: () => measureSlot(topSlotRef.value, topMeasuredOpen),
    getTimer: () => topCloseTimer,
    setTimer: (t) => { topCloseTimer = t },
    emitOpen: (v) => emit('update:topOpen', v),
  })
}, { immediate: true })

watch(() => props.shouldCollapseBottom, (collapsed) => {
  const generation = ++bottomSyncGeneration
  void syncRail({
    shouldOpen: !collapsed,
    open: bottomOpen,
    closing: bottomClosing,
    animate: bottomAnimate,
    ready: bottomReady,
    isCurrent: () => generation === bottomSyncGeneration,
    stillWantsOpen: () => !props.shouldCollapseBottom,
    beforeOpen: () => measureSlot(bottomSlotRef.value, bottomMeasuredOpen),
    beforeClose: () => measureSlot(bottomSlotRef.value, bottomMeasuredOpen),
    getTimer: () => bottomCloseTimer,
    setTimer: (t) => { bottomCloseTimer = t },
    emitOpen: (v) => emit('update:bottomOpen', v),
  })
}, { immediate: true })

onBeforeUnmount(() => {
  leftSyncGeneration += 1
  rightSyncGeneration += 1
  topSyncGeneration += 1
  bottomSyncGeneration += 1
  leftCloseTimer = clearTimer(leftCloseTimer)
  rightCloseTimer = clearTimer(rightCloseTimer)
  topCloseTimer = clearTimer(topCloseTimer)
  bottomCloseTimer = clearTimer(bottomCloseTimer)
})
</script>

<style>
@keyframes collapsable-layout-expand {
  from { width: var(--collapsable-rail-width-closed, 0px); }
  to { width: var(--collapsable-rail-width-open, calc(18rem + 1.25rem)); }
}

@keyframes collapsable-layout-collapse {
  from { width: var(--collapsable-rail-width-open, calc(18rem + 1.25rem)); }
  to { width: var(--collapsable-rail-width-closed, 0px); }
}

.collapsable-layout-rail {
  overflow: hidden;
  width: var(--collapsable-rail-width-closed, 0px);
}

.collapsable-layout-rail[data-open='true'] {
  width: var(--collapsable-rail-width-open, calc(18rem + 1.25rem));
}

.collapsable-layout-rail[data-open='true'][data-animate='true'] {
  animation: collapsable-layout-expand 400ms ease-out;
}

.collapsable-layout-rail[data-closing='true'] {
  width: var(--collapsable-rail-width-closed, 0px);
  animation: collapsable-layout-collapse 400ms ease-out forwards;
}

@keyframes collapsable-layout-stack-expand {
  from { height: var(--collapsable-rail-height-closed, 0px); }
  to { height: var(--collapsable-rail-height-open, 0px); }
}

@keyframes collapsable-layout-stack-collapse {
  from { height: var(--collapsable-rail-height-open, 0px); }
  to { height: var(--collapsable-rail-height-closed, 0px); }
}

.collapsable-layout-stack {
  overflow: hidden;
  height: var(--collapsable-rail-height-closed, 0px);
}

.collapsable-layout-stack[data-open='true'] {
  height: auto;
  overflow: visible;
}

.collapsable-layout-stack[data-open='true'][data-animate='true'] {
  height: var(--collapsable-rail-height-open, 0px);
  overflow: hidden;
  animation: collapsable-layout-stack-expand 400ms ease-out;
}

.collapsable-layout-stack[data-closing='true'] {
  height: var(--collapsable-rail-height-closed, 0px);
  overflow: hidden;
  animation: collapsable-layout-stack-collapse 400ms ease-out forwards;
}
</style>
