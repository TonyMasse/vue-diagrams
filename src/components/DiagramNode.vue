<template>
  <svg :x="x" :y="y">
    <!-- Glow ring when Node is selected -->
    <rect v-if="selected"
      fill="none"
      :stroke="(borderColorSelected.length ? borderColorSelected : color)"
      stroke-width="4"
      stroke-opacity=".75"
      x="4" y="14"
      rx="4" ry="4"
      :width="width + 2" :height="computedHeight + 2"
      filter="url(#filter_gaus_100)"
      >
    </rect>
    <!-- Node border - Low level -->
    <rect
      fill="none"
      :stroke="borderColor"
      stroke-width="2"
      x="5" y="15"
      rx="3" ry="3"
      :width="width" :height="computedHeight"
      >
    </rect>
    <!-- Node border - High level (center) -->
    <rect
      fill="none"
      :stroke="color"
      stroke-width="1"
      x="5" y="15"
      rx="3" ry="3"
      :width="width" :height="computedHeight"
      >
    </rect>
    <!-- Title bar -->
    <svg
      x="0" y="0"
      @mousedown="mouseDownTitleBar"
      @mouseenter="mouseEnterTitleBar"
      @mouseleave="mouseLeaveTitleBar"
      style="cursor: move"
      >
      <rect
        :fill="titleBarColor"
        :fill-opacity="titleBarFillOpacity * titleFillOpacityCorrection"
        x="6" y="16"
        rx="2" ry="2"
        :width="width - 2" height="18"
        >
      </rect>
      <!-- Top left icon area -->
      <g v-if="topLeftArea">
        <path
           :fill="(titleBarTopLeftAreaColor.length ? titleBarTopLeftAreaColor : color)"
           :fill-opacity="titleBarTopLeftAreaFillOpacity"
           d="M6,16 m2,0c-1.108,0,-2,0.892,-2,2v7.478v6.522v2h2h14h2l11,-18l-13,0h-8.628z"
        />
        <path
          :fill="(titleBarTopLeftAreaSeparatorColor.length ? titleBarTopLeftAreaSeparatorColor : (titleBarTopLeftAreaColor.length ? titleBarTopLeftAreaColor : color))"
          :fill-opacity="titleBarTopLeftAreaSeparatorFillOpacity"
          d="M6,16 m30,0l-11,18h-1l11,-18z" />
        <svg x="8" y="17" width="16" height="16">
          <!-- <slot name="topLeftAreaContent"></slot> -->

          <path v-if="topLeftAreaContent.length"
             fill="#00000"
             :d="`${topLeftAreaContent}`"
          />

        </svg>
      </g>
      <text :x="12 + (topLeftArea ? 24 : 0)" :y="30" font-size="14" font-weight="bold" font-family="sans-serif" :fill="titleTextColor">{{title}}</text>
      <!-- Configure button -->
      <g
        v-if="configurable && !readOnly"
        @click="configureNode"
        @mouseenter="configureButtonOpacity = 0.75"
        @mouseleave="configureButtonOpacity = 0.25"
        style="cursor: pointer">
        <rect
          :x="width - 12 - (deletable && !readOnly ? 12 + 6 : 0)"
          y="18"
          width="14"
          height="14"
          rx="2" ry="2"
          fill="#ffffff"
          :fill-opacity="configureButtonOpacity"
          />
        <path :fill="configureButtonColor"
        :d="`M${width - 8 - 3 + 4 - (deletable && !readOnly ? 12 : -6) },25.5c0.022222,-0.1666667,0.033333,-0.3388889,0.033333,-0.5222222c0,-0.1777778,-0.011111,-0.3555556,-0.038889,-0.5222222l1.128,-0.878c0.1,-0.077778,0.127778,-0.2277777,0.06667,-0.3388888l-1.067,-1.844c-0.067,-0.122,-0.205,-0.161,-0.328,-0.122l-1.327,0.533c-0.2777778,-0.2111112,-0.5722222,-0.3888889,-0.9,-0.5222223l-0.2,-1.41111103c-0.023,-0.133,-0.134,-0.228,-0.267,-0.228h-2.133c-0.134,0,-0.239,0.095,-0.262,0.228l-0.2,1.41111103
        c-0.3277778,0.1333334,-0.6277778,0.3166667,-0.9,0.5222223l-1.327,-0.533c-0.123,-0.045,-0.261,0,-0.328,0.122l-1.061,1.844c-0.067,0.117,-0.045,0.261,0.066,0.339l1.128,0.878c-0.027778,0.1666666,-0.05,0.35,-0.05,0.5222222c0,0.1722222,0.011111,0.3555555,0.038889,0.5222222l-1.128,0.878c-0.1,0.077778,-0.12777777,0.2277777,-0.06666667,0.3388888l1.067,1.844
        c0.067,0.122,0.206,0.161,0.328,0.122l1.328,-0.533c0.2777778,0.2111111,0.5722222,0.3888889,0.9,0.5222222l0.2,1.4111115c0.027778,0.133333,0.1333333,0.227777,0.2666667,0.227777h2.1333331c0.1333333,0,0.2444444,-0.09444,0.2611111,-0.227777l0.2,-1.4111115c0.3277778,-0.1333333,0.6277777,-0.3111111,0.9,-0.5222222l1.3277777,0.5333334c0.1222222,0.044444,0.2611111,0,0.3277778,-0.1222223l1.066,-1.844
        c0.06667,-0.1222222,0.03889,-0.2611111,-0.06667,-0.3388888zm-3.967,1.478c-1.1,0,-1.9999999,-0.8999999,-1.9999999,-1.9999999c0,-1.1,0.8999999,-2,1.9999999,-2c1.0999998,0,1.9999998,0.9,1.9999998,2c0,1.1,-0.9,1.9999999,-1.9999998,1.9999999z`"/>
      </g>
      <!-- Close button -->
      <g
        v-if="deletable && !readOnly"
        @click="deleteNode"
        @mouseenter="closeButtonOpacity = 0.75"
        @mouseleave="closeButtonOpacity = 0.25"
        style="cursor: pointer">
        <rect
          :x="width - 12"
          y="18"
          width="14"
          height="14"
          rx="2" ry="2"
          fill="#ffffff"
          :fill-opacity="closeButtonOpacity"
          />
        <line
          :x1="width" :y1="20"
          :x2="width - 10" :y2="30"
          style="stroke:rgb(0,0,0);"
          stroke-width="2"
        />
        <line
          :x1="width - 10" :y1="20"
          :x2="width" :y2="30"
          style="stroke:rgb(0,0,0);"
          stroke-width="2"
        />
      </g>
    </svg>
    <rect
      :fill="backgroundColor"
      :fill-opacity="backgroundOpacity"
      x="6" y="34"
      rx="2" ry="2"
      :width="width - 2" :height="computedHeight - 20"
      @drop="onDrop($event)"
      @dragover.prevent
      @dragenter.prevent
      >
      <!-- class="node-light-background" -->
    </rect>
    <slot></slot>
  </svg>
</template>
<script>
import { getTextWidth } from "./../utils/TextWidth";

export default {
  name: "DiagramNode",

  props: {
    title: {
      type: String,
      required: true
    },
    index: Number,
    ports: {
      type: Array,
      default: () => {
        return [];
      }
    },
    x: Number,
    y: Number,
    width: {
      type: Number,
      default: 72
    },
    height: {
      type: Number,
      default: 100
    },
    color: {
      type: String,
      default: "#707070"
    },
    backgroundColor: {
      type: String,
      default: "#000000"
    },
    backgroundOpacity: {
      type: Number,
      default: 0.3
    },
    borderColor: {
      type: String,
      default: "#000000"
    },
    borderColorSelected: {
      type: String,
      default: ""
    },
    titleTextColor: {
      type: String,
      default: "#FFFFFF"
    },
    titleBarColor: {
      type: String,
      default: "#606060"
    },
    titleBarFillOpacity: {
      type: Number,
      default: 0.5
    },
    titleBarTopLeftAreaColor: {
      type: String,
      default: ""
    },
    titleBarTopLeftAreaFillOpacity: {
      type: Number,
      default: 0.8
    },
    titleBarTopLeftAreaSeparatorColor: {
      type: String,
      default: ""
    },
    titleBarTopLeftAreaSeparatorFillOpacity: {
      type: Number,
      default: 0.5
    },
    deletable: {
      type: Boolean,
      default: true
    },
    configurable: {
      type: Boolean,
      default: true
    },
    topLeftArea: {
      type: Boolean,
      default: false
    },
    topLeftAreaContent: {
      type: String,
      default: ""
    },
    configureButtonColor: {
      type: String,
      default: "#000000"
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    selected: Boolean
  },

  data() {
    return {
      nodeStrokeWidth: 0,
      titleFillOpacityCorrection: 1,
      configureButtonOpacity: 0.25,
      closeButtonOpacity: 0.25
    };
  },

  computed: {
    computedHeight() {
      let maxConnectors = Math.max(
        this.ports.filter(p => p.type === "in").length,
        this.ports.filter(p => p.type === "out").length
      );
      let newHeight = maxConnectors * 20 + 40;
      if (this.height > newHeight) {
        return this.height;
      } else {
        return newHeight;
      }
    },
    NodeTitleWidth() {
      const minWidth = 0;
      var width = 0;
      width = getTextWidth(this.title, "14pt bold sans-serif") * 0.9;

      if (width < minWidth) {
        width = minWidth;
      }

      return width;
    }
  },

  methods: {
    deleteNode: function() {
      this.$emit("delete");
    },

    configureNode: function() {
      this.$emit("configure");
    },

    mouseDownTitleBar: function(event) {
      this.$emit(
        "onStartDrag",
        { type: "nodes", index: this.index, nodeObject: this },
        event.x - this.x,
        event.y - this.y
      );
    },

    mouseEnterTitleBar() {
      this.titleFillOpacityCorrection = 1.5;
    },

    mouseLeaveTitleBar() {
      this.titleFillOpacityCorrection = 1;
    },

    onDrop: function(event) {
      this.$emit("drop", event);
    }
  }
};
</script>
