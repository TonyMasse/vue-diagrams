import DiagramNode from "./DiagramNode";
import { generateId } from "./utils/Identifier";

/**
 * @class DiagramModel
 */
class DiagramModel {
  /**
   */
  constructor() {
    this._model = {
      nodes: [],
      links: []
    };
  }

  /**
   * Adds a node to the diagram
   * @param {String} title  The title of the node
   * @param {Integer} x      X coordinate
   * @param {Integer} y      Y Coordinate
   * @param {Integer} width  Width
   * @param {Integer} height Height
   * @return {Node} The node created
   */
  addNode(object, x, y, width, height) {
    let id = null;
    if (typeof object === "object") {
      if (object.id != undefined) {
        id = object.id;
      }
    }
    if (id === null) {
      id = generateId();
    }
    const newNode = new DiagramNode(id, object, x, y, width, height);
    this._model.nodes.push(newNode);
    return newNode;
  }

  deleteNode(node) {
    const index = this._model.nodes.indexOf(node);
    for (var j = 0; j < this._model.links.length; j++) {
      const currentLink = this._model.links[j];

      for (var i = 0; i < node.ports.length; i++) {
        const currentPort = node.ports[i];

        if (
          currentLink.from === currentPort.id ||
          currentLink.to === currentPort.id
        ) {
          this.deleteLink(currentLink);
          j--;
        }
      }
    }
    this._model.nodes.splice(index, 1);
    // this.$emit('onAfterDeleteNode', { deletedIndex: index}); // FIX ME: no idea how to emit something from here (lame, I know, sorry)
  }

  /**
   * Removes a port.
   */
  removePort(node, port) {
    const index = node.ports.indexOf(port);
    for (var j = 0; j < this._model.links.length; j++) {
      const currentLink = this._model.links[j];
      if (currentLink.from === port.id || currentLink.to === port.id) {
        this.deleteLink(currentLink);
        j--;
      }
    }
    node.ports.splice(index, 1);
    // this.$emit('onAfterDeletePort', { deletedIndex: index}); // FIX ME: no idea how to emit something from here (lame, I know, sorry)
  }

  deleteLink(link) {
    var index = -1;
    // This can be called from different places.
    // In some cases it's the whole link array element, and in some others it's an object looking like this:
    // {type: "points", linkIndex: 4, pointIndex: 0}
    if (
      typeof link.linkIndex !== "undefined" &&
      typeof link.pointIndex !== "undefined"
    ) {
      // The second type of cases
      index = link.linkIndex;
    } else {
      // The array element type of cases
      index = this._model.links.indexOf(link);
    }

    if (index >= 0 && index < this._model.links.length) {
      this._model.links.splice(index, 1);
    }
    // this.$emit('onAfterDeleteLink', { deletedIndex: index}); // FIX ME: no idea how to emit something from here (lame, I know, sorry)
  }

  deletePoint(linkPoint) {
    var linkIndex = -1;
    var pointIndex = -1;
    // linkPoint will look like this:
    // {type: "points", linkIndex: 4, pointIndex: 2}
    if (
      typeof linkPoint.linkIndex !== "undefined" &&
      typeof linkPoint.pointIndex !== "undefined"
    ) {
      linkIndex = linkPoint.linkIndex;
      pointIndex = linkPoint.pointIndex;
    }

    if (
      linkIndex >= 0 &&
      pointIndex >= 0 &&
      linkIndex < this._model.links.length
    ) {
      if (typeof this._model.links[linkIndex].points !== "undefined") {
        if (pointIndex < this._model.links[linkIndex].points.length) {
          this._model.links[linkIndex].points.splice(pointIndex, 1);
        }
      }
    } /* else {
      console.warn(
        "deletePoint() - Link or Point not found or out of boundaries."
      );
    } */
    // this.$emit('onAfterDeleteLinkPoint', { linkIndex: linkIndex, deletedIndex: pointIndex}); // FIX ME: no idea how to emit something from here (lame, I know, sorry)
  }

  /**
   * Adds a link between two ports
   * @param {Integer} from   Port id. Must be an out port
   * @param {Integer} to     Port id. Must be an in port
   * @param {Array}  points  Optional. Array of points to make the link represented as a segmented line
   */
  addLink(from, to, points = []) {
    this._model.links.push({
      id: generateId(),
      from: from,
      to: to,
      positionFrom: { x: 0, y: 0 },
      positionTo: { x: 0, y: 0 },
      points
    });
  }

  /**
   * Serializes the diagram model into a JSON object
   * @return {Object} The diagram model
   */
  serialize() {
    return JSON.stringify(this._model);
  }

  /**
   * Load into the diagram model a serialized diagram
   * @param  {Object} serializedModel
   */
  deserialize(serializedModel) {
    this._model = JSON.parse(serializedModel);
  }
}

export default DiagramModel;
