<template>
  <g>
    <circle
      stroke="none"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
      @mousedown="$emit('mousedown', $event)"
      :cx="x" :cy="y" r="5"
      fill="#00000055"
      filter="url(#filter_gaus_20)"
      />
    <circle
      stroke="none"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
      @mousedown="$emit('mousedown', $event)"
      :cx="x" :cy="y" r="3"
      :fill="fillColor"
      filter="url(#filter_gaus_40)"
      />
      <!-- :fill="rgba(0,0,0,.3)" -->
    <!-- <circle
      style="stroke:rgba(0,0,0,.3);"
      stroke-width="3"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
      @mousedown="$emit('mousedown', $event)"
      :cx="x" :cy="y" r="3"
      :fill="hover ? hoverStrokeStyle : normalStrokeStyle"
      /> -->
  </g>
</template>
<script>
export default {
  name: "DiagramPoint",
  props: ["x", "y"],
  props: {
    x: {},
    y: {},
    killLinkPointsMode: {},
    normalColor: {
      default: "rgba(255, 255, 255, 0.75)"
    },
    hoverColor: {
      default: "rgba(100, 100, 255, 1)"
    },
    hoverKillColor: {
      default: "rgba(255, 0, 0, 0.75)"
    }
  },
  data() {
    return {
      hover: false,
      normalStrokeStyle: "rgba(255,255,255,.75)",
      hoverStrokeStyle: "rgba(255,0,0,.75)"
    };
  },
  methods: {
    mouseEnter() {
      this.hover = true;
    },
    mouseLeave() {
      this.hover = false;
    }
  },
  computed: {
    fillColor() {
      var newColor = this.normalColor;
      if (this.hover) {
        newColor = this.hoverColor;
        if (this.killLinkPointsMode) {
          newColor = this.hoverKillColor;
        }
      }
      return newColor;
    }
  }
};
</script>
