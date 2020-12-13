<template>
  <g v-if="!isASpacer">
    <svg :y="y + 55" v-if="type === 'in'">
      <path opacity="0.8" :fill="connectorNameTagColor" stroke="none" @click="isOptionsPanelVisible = !isOptionsPanelVisible" style="cursor: pointer"
        v-if="name.length"
        filter="url(#filter_gaus_20)"
        :d="`
          M 5 0
          v 19
          h ${portNameWidth + 25}
          a 9.5 9.5 0 0 0 0 -19
          h ${(portNameWidth + 25) * -1}
          z `" />
      <text :x="30" :y="9 + fontSize / 2" :font-size="`${fontSize}pt`" :fill="connectorNameTextColor" @click="isOptionsPanelVisible = !isOptionsPanelVisible" style="cursor: pointer">{{name}}</text>
      <path opacity="1" fill="#000000" stroke="none" style="cursor: pointer"
        v-if="isOptionsPanelVisible && deletable && editable"
        filter="url(#filter_gaus_20)"
        :d="`
          M 5 0
          v 19
          h 40
          a 9.5 9.5 0 0 0 0 -19
          h -40
          z `" />
      <path opacity="1" :fill="tagDeleteFill" stroke="none" @click="deletePort" style="cursor: pointer"
        v-if="isOptionsPanelVisible && deletable && editable"
        filter="url(#filter_gaus_20)"
        :d="`
          M 5 0.5
          v 18
          h 40
          a 9 9 0 0 0 0 -18
          h -40
          z `" />
      <text :x="42" :y="9 + fontSize / 2" v-if="isOptionsPanelVisible && deletable && editable" :font-size="`${fontSize}pt`" :fill="tagDeleteTextColor" @click="deletePort" style="cursor: pointer">x</text>
      <path opacity="1" fill="#000000" stroke="none" style="cursor: pointer"
        v-if="isOptionsPanelVisible && (editable || deletable)"
        filter="url(#filter_gaus_20)"
        :d="`
          M 5 0
          v 19
          h 25
          a 9.5 9.5 0 0 0 0 -19
          h -25
          z `" />
      <path opacity="1" :fill="(editable ? tagEditFill : tagDeleteFill)" stroke="none" @click="(editable ? configurePort() : deletePort())" style="cursor: pointer"
        v-if="isOptionsPanelVisible && (editable || deletable)"
        filter="url(#filter_gaus_20)"
        :d="`
          M 5 0.5
          v 18
          h 25
          a 9 9 0 0 0 0 -18
          h -25
          z `" />
      <text :x="27" :y="9 + fontSize / 2" v-if="isOptionsPanelVisible && !editable && deletable" :font-size="`${fontSize}pt`" :fill="tagDeleteTextColor" @click="deletePort" style="cursor: pointer">x</text>
      <text :x="27" :y="9 + fontSize / 2" v-if="isOptionsPanelVisible && editable" :font-size="`${fontSize}pt`" :fill="tagEditTextColor" @click="configurePort" style="cursor: pointer">e</text>
      <path opacity=".6" stroke="none"
        filter="url(#filter_gaus_20)"
        fill="#00000"
        :d="`
          M 5 0
          v 19
          h 10
          a 9.5 9.5 0 0 0 0 -19
          h -10
          z `" />
      <path opacity="1" stroke="none"
        ref="handle"
         style="cursor: crosshair"
        :fill="fill"
        @mouseenter="enter" @mouseleave="leave" @mousedown="startDragNewLink" @mouseup="mouseup"
        :d="`
          M 5 0.5
          v 18
          h 10
          a 9 -9 0 0 0 0 -18
          h -10
          z `" />
      <text :x="10" :y="9 + fontSize / 2" :font-size="`${fontSize}pt`" :fill="connectorCategoryTextColor" style="cursor: crosshair" @mouseenter="enter" @mouseleave="leave" @mousedown="startDragNewLink" @mouseup="mouseup">{{ connectorCategory }}</text>
    </svg>
    <svg :y="y + 55" v-if="type === 'out'">
      <path opacity="0.8" :fill="connectorNameTagColor" stroke="none" @click="isOptionsPanelVisible = !isOptionsPanelVisible" style="cursor: pointer"
        v-if="name.length"
        filter="url(#filter_gaus_20)"
        :d="`
          M ${nodeWidth - (portNameWidth + 20)} 0
          a 9.5 9.5 0 0 0 0 19
          h ${portNameWidth + 25}
          v -19
          h ${(portNameWidth + 25) * -1}
          z `" />
      <text :x="nodeWidth - portNameWidth - 20" :y="9 + fontSize / 2" :font-size="`${fontSize}pt`" :font-family="fontFamily" :fill="connectorNameTextColor" @click="isOptionsPanelVisible = !isOptionsPanelVisible" style="cursor: pointer">{{name}}</text>

      <path opacity="1" fill="#000000" stroke="none" style="cursor: pointer"
        v-if="isOptionsPanelVisible && deletable && editable"
        filter="url(#filter_gaus_20)"
        :d="`
          M ${nodeWidth - 35} 0
          a 9.5 9.5 0 0 0 0 19
          h 40
          v -19
          h -40
          z `" />
      <path opacity="1" :fill="tagDeleteFill" stroke="none" @click="deletePort" style="cursor: pointer"
        v-if="isOptionsPanelVisible && deletable && editable"
        filter="url(#filter_gaus_20)"
        :d="`
          M ${nodeWidth - 35} 0.5
          a 9 9 0 0 0 0 18
          h 40
          v -18
          h -40
          z `" />
      <text :x="nodeWidth - 20 - 18" :y="9 + fontSize / 2" v-if="isOptionsPanelVisible && deletable && editable" :font-size="`${fontSize}pt`" :fill="tagDeleteTextColor" @click="deletePort" style="cursor: pointer">x</text>
      <path opacity="1" fill="#000000" stroke="none" style="cursor: pointer"
        v-if="isOptionsPanelVisible && (editable || deletable)"
        filter="url(#filter_gaus_20)"
        :d="`
          M ${nodeWidth - 20} 0
          a 9.5 9.5 0 0 0 0 19
          h 25
          v -19
          h -25
          z `" />
      <path opacity="1" :fill="(editable ? tagEditFill : tagDeleteFill)" stroke="none" @click="(editable ? configurePort() : deletePort())" style="cursor: pointer"
        v-if="isOptionsPanelVisible && (editable || deletable)"
        filter="url(#filter_gaus_20)"
        :d="`
          M ${nodeWidth - 20} 0.5
          a 9 9 0 0 0 0 18
          h 25
          v -18
          h -25
          z `" />
      <text :x="nodeWidth - 20 - 3" :y="9 + fontSize / 2" v-if="isOptionsPanelVisible && !editable && deletable" :font-size="`${fontSize}pt`" :fill="tagDeleteTextColor" @click="deletePort" style="cursor: pointer">x</text>
      <text :x="nodeWidth - 20 - 3" :y="9 + fontSize / 2" v-if="isOptionsPanelVisible && editable" :font-size="`${fontSize}pt`" :fill="tagEditTextColor" @click="configurePort" style="cursor: pointer">e</text>



      <path opacity=".6" stroke="none"
        filter="url(#filter_gaus_20)"
        fill="#00000"
        :d="`
          M ${nodeWidth - 5} 0
          a 9.5 9.5 0 0 0 0 19
          h 10
          v -19
          h -10
          z `" />
      <path opacity="1" stroke="none"
        ref="handle"
         style="cursor: crosshair"
        :fill="fill"
        @mouseenter="enter" @mouseleave="leave" @mousedown="startDragNewLink" @mouseup="mouseup"
        :d="`
          M ${nodeWidth - 5} 0.5
          a 9 9 0 0 0 0 18
          h 10
          v -18
          h -10
          z `" />
      <text :x="nodeWidth - 7" :y="9 + fontSize / 2" :font-size="`${fontSize}pt`" :font-family="fontFamily" :fill="connectorCategoryTextColor" style="cursor: crosshair" @mouseenter="enter" @mouseleave="leave" @mousedown="startDragNewLink" @mouseup="mouseup">{{ connectorCategory }}</text>
      <!-- <text :x="nodeWidth - 12" y="9" font-size="8pt" fill="#000000" @click="deletePort" style="cursor: pointer">x</text> -->
    </svg>
  </g>
</template>
<script>
/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text, font) {
  // re-use canvas object for better performance
  var canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}

export default {
  name: "DiagramPort",
  props: {
    id: {},
    y: {
      type: Number,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: ""
    },
    nodeWidth: {
      type: Number,
      default: null
    },
    nodeIndex: {
      type: Number,
      default: null
    },
    connectorCategory: {
      type: String,
      default: null
    },
    connectorCategoryTextColor: {
      type: String,
      default: "#000000"
    },
    connectorCategoryTagColor: {
      type: String,
      default: "#b0b0ff"
    },
    connectorCategoryTagColorHover: {
      type: String,
      default: "#888888"
    },
    fontSize: {
      type: Number,
      default: 8
    },
    fontFamily: {
      type: String,
      default: "sans-serif"
    },
    connectorNameTagColor: {
      type: String,
      default: "#642765"
    },
    connectorNameTextColor: {
      type: String,
      default: "#FFFFFF"
    },
    deletable: {
      type: Boolean,
      default: true
    },
    editable: {
      type: Boolean,
      default: true
    },
    isASpacer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fill: "#b0b0ff",
      isOptionsPanelVisible: false,
      tagEditFill: "#D0FFD0",
      tagDeleteFill: "#FFD0D0",
      tagEditTextColor: "#000000",
      tagDeleteTextColor: "#000000"
    };
  },
  computed: {
    portNameWidth() {
      const minWidth = 30;
      var width = 0;
      if (this.fontSize && this.fontFamily.length) {
        width = getTextWidth(
          this.name,
          this.fontSize + "pt " + this.fontFamily
        );
      } else {
        width = this.name.length * 10;
      }

      if (width < minWidth) {
        width = minWidth;
      }

      return width;
    }
  }, // computed
  methods: {
    mouseup() {
      this.$emit("mouseUpPort", this.id);
    },

    enter() {
      this.fill = this.connectorCategoryTagColorHover;
    },

    leave() {
      this.fill = this.connectorCategoryTagColor;
    },
    startDragNewLink() {
      this.$emit("onStartDragNewLink", this.id);
    },
    deletePort: function() {
      this.isOptionsPanelVisible = false;
      this.$emit("delete");
    },
    configurePort: function() {
      this.isOptionsPanelVisible = false;
      this.$emit("configure");
    }
  },
  mounted() {
    this.fill = this.connectorCategoryTagColor;
  }
};
</script>
