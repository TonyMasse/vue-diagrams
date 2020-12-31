import { storiesOf } from "@storybook/vue";
import Diagram from "../src/components/Diagram";

// Add more stories here to live develop your components
storiesOf("Diagram", module).add("Events", () => ({
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
    node3.deletable = false;

    diagramModel.addLink(node2OutPort, inPort);
    diagramModel.addLink(node3OutPort, inPort);

    return {
      console,
      model: diagramModel
    };
  },
  methods: {
    drop(evt) {
      console.log("drop"); // eslint-disable-line no-console
      console.log(evt); // eslint-disable-line no-console
    }
  },
  // @drop="console.log('drop');"
  template: `
  <diagram
    :model="model"
    @onRegisterSvgPanZoom="console.log('onRegisterSvgPanZoom')"
    @onBeforeDeletePoint="console.log('onBeforeDeletePoint')"
    @onBeforeDeleteLink="console.log('onBeforeDeleteLink')"
    @selectNode="console.log('selectNode')"
    @drop="drop"
    @dropNode="console.log('dropNode')"
    @configurePort="console.log('configurePort')"
    @clickPort="console.log('clickPort')"
    @openPortOptionsPanel="console.log('openPortOptionsPanel')"
    @closePortOptionsPanel="console.log('closePortOptionsPanel')"
    @switchKillLinksMode="console.log('switchKillLinksMode')"
    @switchKillLinkPointsMode="console.log('switchKillLinkPointsMode')"
  ></diagram>`
}));
