<template>
  <g v-if="!isASpacer">
    <svg :y="y + 55" v-if="type === 'in'">
      <path opacity="0.8" :fill="connectorNameTagColor" stroke="none" @click="onConnectorNameTagClick" style="cursor: pointer"
        v-if="name.length"
        filter="url(#filter_gaus_20)"
        :d="`
          M 5 0
          v 19
          h ${portNameWidth + 25}
          a 9.5 9.5 0 0 0 0 -19
          h ${(portNameWidth + 25) * -1}
          z `" />
      <text :x="30" :y="9 + fontSize / 2" :font-size="`${fontSize}pt`" :fill="connectorNameTextColor" @click="onConnectorNameTagClick" style="cursor: pointer">{{name}}</text>
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
      <!-- <text :x="42" :y="9 + fontSize / 2" v-if="isOptionsPanelVisible && deletable && editable" :font-size="`${fontSize}pt`" :fill="tagDeleteTextColor" @click="deletePort" style="cursor: pointer">x</text> -->
      <path v-if="isOptionsPanelVisible && deletable && editable" :fill="tagDeleteTextColor" @click="deletePort" style="cursor: pointer"
      d="M42,13c0,0.6518512,0.53333333,1.1851852,1.18518503,1.1851852h4.7407406c0.6518519,0,1.1851852,-0.533334,1.1851852,-1.1851852v-7.111h-7.111zm1.458,-4.219l0.835,-0.836l1.263,1.256l1.256,-1.256l0.835,0.836l-1.256,1.256l1.256,1.256l-0.835,0.836l-1.256,-1.256l-1.257,1.256l-0.835,-0.836l1.256,-1.256zm4.172,-4.67l-0.593,-0.592h-2.963l-0.592,0.592h-2.074v1.186h8.296v-1.186z"/>
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
      <!-- <text :x="27" :y="9 + fontSize / 2" v-if="isOptionsPanelVisible && !editable && deletable" :font-size="`${fontSize}pt`" :fill="tagDeleteTextColor" @click="deletePort" style="cursor: pointer">x</text>
      <text :x="27" :y="9 + fontSize / 2" v-if="isOptionsPanelVisible && editable" :font-size="`${fontSize}pt`" :fill="tagEditTextColor" @click="configurePort" style="cursor: pointer">e</text> -->
      <path v-if="isOptionsPanelVisible && !editable && deletable" :fill="tagDeleteTextColor" @click="deletePort" style="cursor: pointer"
      d="M27,13c0,0.6518512,0.53333333,1.1851852,1.18518503,1.1851852h4.7407406c0.6518519,0,1.1851852,-0.533334,1.1851852,-1.1851852v-7.111h-7.111zm1.458,-4.219l0.835,-0.836l1.263,1.256l1.256,-1.256l0.835,0.836l-1.256,1.256l1.256,1.256l-0.835,0.836l-1.256,-1.256l-1.257,1.256l-0.835,-0.836l1.256,-1.256zm4.172,-4.67l-0.593,-0.592h-2.963l-0.592,0.592h-2.074v1.186h8.296v-1.186z"/>
      <path v-if="isOptionsPanelVisible && editable" :fill="tagEditTextColor" @click="configurePort" style="cursor: pointer"
      d="M35,9.5c0.022222,-0.1666667,0.033333,-0.3388889,0.033333,-0.5222222c0,-0.1777778,-0.011111,-0.3555556,-0.038889,-0.5222222l1.128,-0.878c0.1,-0.077778,0.127778,-0.2277777,0.06667,-0.3388888l-1.067,-1.844c-0.067,-0.122,-0.205,-0.161,-0.328,-0.122l-1.327,0.533c-0.2777778,-0.2111112,-0.5722222,-0.3888889,-0.9,-0.5222223l-0.2,-1.41111103c-0.023,-0.133,-0.134,-0.228,-0.267,-0.228h-2.133c-0.134,0,-0.239,0.095,-0.262,0.228l-0.2,1.41111103
      c-0.3277778,0.1333334,-0.6277778,0.3166667,-0.9,0.5222223l-1.327,-0.533c-0.123,-0.045,-0.261,0,-0.328,0.122l-1.061,1.844c-0.067,0.117,-0.045,0.261,0.066,0.339l1.128,0.878c-0.027778,0.1666666,-0.05,0.35,-0.05,0.5222222c0,0.1722222,0.011111,0.3555555,0.038889,0.5222222l-1.128,0.878c-0.1,0.077778,-0.12777777,0.2277777,-0.06666667,0.3388888l1.067,1.844
      c0.067,0.122,0.206,0.161,0.328,0.122l1.328,-0.533c0.2777778,0.2111111,0.5722222,0.3888889,0.9,0.5222222l0.2,1.4111115c0.027778,0.133333,0.1333333,0.227777,0.2666667,0.227777h2.1333331c0.1333333,0,0.2444444,-0.09444,0.2611111,-0.227777l0.2,-1.4111115c0.3277778,-0.1333333,0.6277777,-0.3111111,0.9,-0.5222222l1.3277777,0.5333334c0.1222222,0.044444,0.2611111,0,0.3277778,-0.1222223l1.066,-1.844
      c0.06667,-0.1222222,0.03889,-0.2611111,-0.06667,-0.3388888zm-3.967,1.478c-1.1,0,-1.9999999,-0.8999999,-1.9999999,-1.9999999c0,-1.1,0.8999999,-2,1.9999999,-2c1.0999998,0,1.9999998,0.9,1.9999998,2c0,1.1,-0.9,1.9999999,-1.9999998,1.9999999z"/>
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
      <path opacity="0.8" :fill="connectorNameTagColor" stroke="none" @click="onConnectorNameTagClick" style="cursor: pointer"
        v-if="name.length"
        filter="url(#filter_gaus_20)"
        :d="`
          M ${nodeWidth - (portNameWidth + 20)} 0
          a 9.5 9.5 0 0 0 0 19
          h ${portNameWidth + 25}
          v -19
          h ${(portNameWidth + 25) * -1}
          z `" />
      <text :x="nodeWidth - portNameWidth - 20" :y="9 + fontSize / 2" :font-size="`${fontSize}pt`" :font-family="fontFamily" :fill="connectorNameTextColor" @click="onConnectorNameTagClick" style="cursor: pointer">{{name}}</text>
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
      <!-- <text :x="nodeWidth - 20 - 18" :y="9 + fontSize / 2" v-if="isOptionsPanelVisible && deletable && editable" :font-size="`${fontSize}pt`" :fill="tagDeleteTextColor" @click="deletePort" style="cursor: pointer">x</text> -->
      <path v-if="isOptionsPanelVisible && deletable && editable" :fill="tagDeleteTextColor" @click="deletePort" style="cursor: pointer"
      :d="`M${nodeWidth - 20 - 18 - 1},13c0,0.6518512,0.53333333,1.1851852,1.18518503,1.1851852h4.7407406c0.6518519,0,1.1851852,-0.533334,1.1851852,-1.1851852v-7.111h-7.111zm1.458,-4.219l0.835,-0.836l1.263,1.256l1.256,-1.256l0.835,0.836l-1.256,1.256l1.256,1.256l-0.835,0.836l-1.256,-1.256l-1.257,1.256l-0.835,-0.836l1.256,-1.256zm4.172,-4.67l-0.593,-0.592h-2.963l-0.592,0.592h-2.074v1.186h8.296v-1.186z`"/>
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
      <!-- <text :x="nodeWidth - 20 - 3" :y="9 + fontSize / 2" v-if="isOptionsPanelVisible && !editable && deletable" :font-size="`${fontSize}pt`" :fill="tagDeleteTextColor" @click="deletePort" style="cursor: pointer">x</text>
      <text :x="nodeWidth - 20 - 3" :y="9 + fontSize / 2" v-if="isOptionsPanelVisible && editable" :font-size="`${fontSize}pt`" :fill="tagEditTextColor" @click="configurePort" style="cursor: pointer">e</text> -->
      <path v-if="isOptionsPanelVisible && !editable && deletable" :fill="tagDeleteTextColor" @click="deletePort" style="cursor: pointer"
      :d="`M${nodeWidth - 20 - 3 - 1 },13c0,0.6518512,0.53333333,1.1851852,1.18518503,1.1851852h4.7407406c0.6518519,0,1.1851852,-0.533334,1.1851852,-1.1851852v-7.111h-7.111zm1.458,-4.219l0.835,-0.836l1.263,1.256l1.256,-1.256l0.835,0.836l-1.256,1.256l1.256,1.256l-0.835,0.836l-1.256,-1.256l-1.257,1.256l-0.835,-0.836l1.256,-1.256zm4.172,-4.67l-0.593,-0.592h-2.963l-0.592,0.592h-2.074v1.186h8.296v-1.186z`"/>
      <path v-if="isOptionsPanelVisible && editable" :fill="tagEditTextColor" @click="configurePort" style="cursor: pointer"
      :d="`M${nodeWidth - 20 - 3 + 6},9.5c0.022222,-0.1666667,0.033333,-0.3388889,0.033333,-0.5222222c0,-0.1777778,-0.011111,-0.3555556,-0.038889,-0.5222222l1.128,-0.878c0.1,-0.077778,0.127778,-0.2277777,0.06667,-0.3388888l-1.067,-1.844c-0.067,-0.122,-0.205,-0.161,-0.328,-0.122l-1.327,0.533c-0.2777778,-0.2111112,-0.5722222,-0.3888889,-0.9,-0.5222223l-0.2,-1.41111103c-0.023,-0.133,-0.134,-0.228,-0.267,-0.228h-2.133c-0.134,0,-0.239,0.095,-0.262,0.228l-0.2,1.41111103
      c-0.3277778,0.1333334,-0.6277778,0.3166667,-0.9,0.5222223l-1.327,-0.533c-0.123,-0.045,-0.261,0,-0.328,0.122l-1.061,1.844c-0.067,0.117,-0.045,0.261,0.066,0.339l1.128,0.878c-0.027778,0.1666666,-0.05,0.35,-0.05,0.5222222c0,0.1722222,0.011111,0.3555555,0.038889,0.5222222l-1.128,0.878c-0.1,0.077778,-0.12777777,0.2277777,-0.06666667,0.3388888l1.067,1.844
      c0.067,0.122,0.206,0.161,0.328,0.122l1.328,-0.533c0.2777778,0.2111111,0.5722222,0.3888889,0.9,0.5222222l0.2,1.4111115c0.027778,0.133333,0.1333333,0.227777,0.2666667,0.227777h2.1333331c0.1333333,0,0.2444444,-0.09444,0.2611111,-0.227777l0.2,-1.4111115c0.3277778,-0.1333333,0.6277777,-0.3111111,0.9,-0.5222222l1.3277777,0.5333334c0.1222222,0.044444,0.2611111,0,0.3277778,-0.1222223l1.066,-1.844
      c0.06667,-0.1222222,0.03889,-0.2611111,-0.06667,-0.3388888zm-3.967,1.478c-1.1,0,-1.9999999,-0.8999999,-1.9999999,-1.9999999c0,-1.1,0.8999999,-2,1.9999999,-2c1.0999998,0,1.9999998,0.9,1.9999998,2c0,1.1,-0.9,1.9999999,-1.9999998,1.9999999z`"/>
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
import { getTextWidth } from "./../utils/TextWidth";

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
    tagEditFill: {
      type: String,
      default: "#80A0FF"
    },
    tagDeleteFill: {
      type: String,
      default: "#FF80A0"
    },
    tagEditTextColor: {
      type: String,
      default: "#000000"
    },
    tagDeleteTextColor: {
      type: String,
      default: "#000000"
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
      isOptionsPanelVisible: false
    };
  },
  computed: {
    portNameWidth() {
      const minWidth = 30;
      var width = 0;
      width = getTextWidth(
        this.name,
        (this.fontSize ? this.fontSize : 8) +
          "pt " +
          (this.fontFamily ? this.fontFamily : "sans-serif")
      );

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
    onConnectorNameTagClick() {
      if (!this.isOptionsPanelVisible) {
        this.$emit("openOptionsPanel");
      } else if (this.isOptionsPanelVisible) {
        this.$emit("closeOptionsPanel");
      }
      this.isOptionsPanelVisible = !this.isOptionsPanelVisible;
      this.$emit("click");
    },
    deletePort: function() {
      this.isOptionsPanelVisible = false;
      this.$emit("closeOptionsPanel");
      this.$emit("delete");
    },
    configurePort: function() {
      this.isOptionsPanelVisible = false;
      this.$emit("closeOptionsPanel");
      this.$emit("configure");
    }
  },
  mounted() {
    this.fill = this.connectorCategoryTagColor;
  }
};
</script>
