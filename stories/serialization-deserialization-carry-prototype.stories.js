import { storiesOf } from "@storybook/vue";
import Diagram from "../src/components/Diagram";

// Add more stories here to live develop your components
storiesOf("Diagram", module).add(
  "serialization/deserialization - carry prototype",
  () => ({
    data() {
      const diagramModel = new Diagram.Model();

      const node1 = diagramModel.addNode("test2", 300, 200);
      const inPort = node1.addInPort("test");

      const node2 = diagramModel.addNode("test", 10, 300, 144, 80);
      const node2OutPort = node2.addOutPort("testOut");
      node2.addOutPort("testOut2");
      node2.color = "#00cc66";

      const node3 = diagramModel.addNode("test3", 10, 100, 72, 100);
      const node3OutPort = node3.addOutPort("testOut3");
      node3.color = "#cc6600";

      diagramModel.addLink(node2OutPort, inPort);
      diagramModel.addLink(node3OutPort, inPort);

      return {
        console,
        serializedModel: diagramModel.serialize(),
        model: diagramModel
      };
    },
    methods: {
      checkNodesPrototype() {
        if (
          this.model._model &&
          this.model._model.nodes &&
          this.model._model.nodes.length >= 1
        ) {
          this.model._model.nodes.forEach(node => {
            // eslint-disable-next-line no-console
            console.log(
              'Node: "' +
                node.title +
                '" // addOutPort = "' +
                typeof node.addOutPort +
                '"'
            ); // eslint-disable-line no-console
            console.log('Node: "' + node.title + '" // ' + typeof node + '"'); // eslint-disable-line no-console
            console.log(node); // eslint-disable-line no-console
          });
        }
      },
      addPortToNode() {
        if (
          this.model._model &&
          this.model._model.nodes &&
          this.model._model.nodes.length >= 1
        ) {
          this.model._model.nodes[0].addOutPort("Test Story");
        }
      }
    },
    template: `<div>
    <diagram :model="model"></diagram>
    <button @click="console.log(model.serialize())">serialize</button>
    <button @click="model.deserialize(serializedModel)">deserialize</button>
    <button @click="checkNodesPrototype()">check Nodes Prototype</button>
    <button @click="addPortToNode()">Add Out Port to Node[0]</button>
  </div>`
  })
);
