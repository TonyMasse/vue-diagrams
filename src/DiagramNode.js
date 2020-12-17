import { generateId } from "./utils/Identifier";

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

/**
 * @class DiagramNode
 */
class DiagramNode {
  /**
   *  This should not be called directly. Use the "addNode" method from the DiagramModel class
   * @param  {String} title  [description]
   * @param  {Integer} x      [description]
   * @param  {Integer} y      [description]
   * @param  {Integer} width  [description]
   * @param  {Integer} height [description]
   * @param  {String} id [description]
   */
  constructor(id, object, x, y, width, height) {
    this.id = id;
    this.x = x;
    this.y = y;

    this.width = width ? width : 10;
    this.height = height ? height : 10;
    this.ports = [];

    if (typeof object === "object") {
      if (
        typeof object.id !== "undefined" &&
        (this.id === null || typeof this.id === "undefined")
      ) {
        this.id = object.id;
      }
      const propertiesToMoveIn = [
        "title",
        "color",
        "backgroundColor",
        "backgroundOpacity",
        "borderColor",
        "borderColorSelected",
        "titleTextColor",
        "titleBarColor",
        "titleBarFillOpacity",
        "titleBarTopLeftAreaColor",
        "titleBarTopLeftAreaFillOpacity",
        "titleBarTopLeftAreaSeparatorColor",
        "titleBarTopLeftAreaSeparatorFillOpacity",
        "deletable",
        "configurable",
        "topLeftArea",
        "configureButtonColor",
        "readOnly",
        "topLeftAreaContent"
      ];

      this.object = {};

      for (var objectItem in object) {
        if (propertiesToMoveIn.indexOf(objectItem) >= 0) {
          // objectItem IS in propertiesToMoveIn
          this[objectItem] = object[objectItem];
        } else {
          // objectItem IS NOT in propertiesToMoveIn
          this.object[objectItem] = object[objectItem];
        }
      }

      // this.title = object.title;
      // this.color = object.color;
      // this.backgroundOpacity = object.backgroundOpacity;
      // this.borderColor = object.borderColor;
      // this.borderColorSelected = object.borderColorSelected;
      // this.titleTextColor = object.titleTextColor;
      // this.titleBarColor = object.titleBarColor;
      // this.titleBarFillOpacity = object.titleBarFillOpacity;
      // this.titleBarTopLeftAreaColor = object.titleBarTopLeftAreaColor;
      // this.titleBarTopLeftAreaFillOpacity =
      //   object.titleBarTopLeftAreaFillOpacity;
      // this.titleBarTopLeftAreaSeparatorColor =
      //   object.titleBarTopLeftAreaSeparatorColor;
      // this.titleBarTopLeftAreaSeparatorFillOpacity =
      //   object.titleBarTopLeftAreaSeparatorFillOpacity;
      // this.deletable = object.deletable;
      // this.configurable = object.configurable;
      // this.topLeftArea = object.topLeftArea;
      // this.topLeftAreaContent = object.topLeftAreaContent;
      // this.configureButtonColor = object.configureButtonColor;
      // this.readOnly = object.readOnly;
    } else {
      this.title = object;
    }

    if (this.id === null || typeof this.id === "undefined") {
      this.id = generateId();
    }

    this.recalculateNodeWidth();
  }

  /**
   * Adds a new "in" port into the node.
   * @param {String} name
   * @return {Integer} The port id
   */
  addInPort(object) {
    return this.addPort(object, "in");
  }

  /**
   * Adds a new "out" port into the node.
   * @param {String} name
   * @return {Integer} The port id
   */
  addOutPort(object) {
    return this.addPort(object, "out");
  }

  /**
   * Adds a new port into the node.
   * @param {String} name
   * @param {String} type
   * @return {Integer} The port id
   */
  addPort(object, type) {
    let newPort = {
      id: generateId(),
      type: type,
      deletable: undefined,
      editable: undefined,
      isASpacer: undefined,
      // fontSize: 8,
      // fontFamily: "sans-serif",
      fontSize: undefined,
      fontFamily: undefined,
      connectorCategory: "",
      connectorCategoryTextColor: undefined,
      connectorCategoryTagColor: undefined,
      connectorCategoryTagColorHover: undefined,
      connectorNameTagColor: undefined,
      connectorNameTextColor: undefined
    };

    if (typeof object === "object") {
      if (typeof object.id !== "undefined" && object.id !== null) {
        newPort.id = object.id;
      }

      const propertiesToMoveIn = [
        "title",
        "deletable",
        "editable",
        "isASpacer",
        "fontSize",
        "fontFamily",
        "connectorCategory",
        "connectorCategoryTextColor",
        "connectorCategoryTagColor",
        "connectorCategoryTagColorHover",
        "connectorNameTagColor",
        "connectorNameTextColor"
      ];

      this.object = {};
      for (var objectItem in object) {
        if (propertiesToMoveIn.indexOf(objectItem) >= 0) {
          // objectItem IS in propertiesToMoveIn
          newPort[objectItem] = object[objectItem];
        } else {
          // objectItem IS NOT in propertiesToMoveIn
          this.object[objectItem] = object[objectItem];
        }
      }
      newPort.name = newPort.title;

      // newPort.object = object;
      // newPort.name = object.title;
      // newPort.deletable = object.deletable;
      // newPort.editable = object.editable;
      // newPort.isASpacer = object.isASpacer;
      // newPort.fontSize = object.fontSize;
      // newPort.fontFamily = object.fontFamily;
      // newPort.connectorCategory = object.connectorCategory;
      // newPort.connectorCategoryTextColor = object.connectorCategoryTextColor;
      // newPort.connectorCategoryTagColor = object.connectorCategoryTagColor;
      // newPort.connectorCategoryTagColorHover =
      //   object.connectorCategoryTagColorHover;
      // newPort.connectorNameTagColor = object.connectorNameTagColor;
      // newPort.connectorNameTextColor = object.connectorNameTextColor;
    } else {
      newPort.name = object;
    }

    this.ports.push(newPort);

    this.recalculateNodeWidth();

    return newPort.id;
  }

  /**
   * Recalculate the width of the node based on its ports sizes and titles.
   */
  recalculateNodeWidth() {
    let maxWidthIn = 0;
    let maxWidthOut = 0;
    let portWidth = 0;
    const minPortWidth = 65;
    const portMargin = 30;
    // const widthMargin = 70 + 5;
    const topLeftAreaMargin = this.topLeftArea ? 24 : 0;
    const topRightAreaMargin =
      (this.deletable === false ? 0 : 14) +
      (this.configurable === false ? 0 : 14);
    const widthMargin = 20;
    const minWidth = 70 + 5;

    // Check the width required for the Title
    let newWidth =
      getTextWidth(this.title, "14pt bold sans-serif") * 0.9 +
      20 /* for the thickness and spaces around */ +
      topLeftAreaMargin /* for the top left area where some icon might be */ +
      topRightAreaMargin; /* for the Config/Edit and Delete/Close buttons */
    if (this.width < newWidth) {
      this.width = newWidth;
    }

    // Check the width required for the longest In and Out ports
    this.ports.forEach(p => {
      if (p.isASpacer !== true) {
        portWidth =
          portMargin +
          getTextWidth(
            p.name,
            (p.fontSize ? p.fontSize : 8) +
              "pt " +
              (p.fontFamily ? p.fontFamily : "sans-serif")
          );

        // To reserve the space for the option panel, which opens within the space of the port tag
        if (portWidth < minPortWidth) {
          portWidth = minPortWidth;
        }
        if (p.type === "in" && portWidth > maxWidthIn) {
          maxWidthIn = portWidth;
        }
        if (p.type === "out" && portWidth > maxWidthOut) {
          maxWidthOut = portWidth;
        }
      }
    });

    if (this.width < maxWidthIn + maxWidthOut + widthMargin) {
      this.width = maxWidthIn + maxWidthOut + widthMargin;
    }

    if (this.width < minWidth) {
      this.width = minWidth;
    }
  }
}

export default DiagramNode;
