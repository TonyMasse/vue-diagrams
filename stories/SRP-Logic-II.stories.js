import { storiesOf } from "@storybook/vue";
import Diagram from "../src/components/Diagram";

// Add more stories here to live develop your components
storiesOf("Diagram", module).add("SRP - Logic - II", () => ({
  data() {
    const diagramModel = new Diagram.Model();

    const node1 = diagramModel.addNode(
      {
        title: "Meta SRP",
        color: "#0044e3",
        topLeftArea: true,
        // Setting wheel:
        topLeftAreaContent:
          "M 3,3 m9.1544442,5.8555554c0.022222,-0.1666667,0.033333,-0.3388889,0.033333,-0.5222222c0,-0.1777778,-0.011111,-0.3555556,-0.038889,-0.5222222l1.128,-0.878c0.1,-0.077778,0.127778,-0.2277777,0.06667,-0.3388888l-1.067,-1.844c-0.067,-0.122,-0.205,-0.161,-0.328,-0.122l-1.327,0.533c-0.2777778,-0.2111112,-0.5722222,-0.3888889,-0.9,-0.5222223l-0.2,-1.41111103c-0.023,-0.133,-0.134,-0.228,-0.267,-0.228h-2.133c-0.134,0,-0.239,0.095,-0.262,0.228l-0.2,1.41111103c-0.3277778,0.1333334,-0.6277778,0.3166667,-0.9,0.5222223l-1.327,-0.533c-0.123,-0.045,-0.261,0,-0.328,0.122l-1.061,1.844c-0.067,0.117,-0.045,0.261,0.066,0.339l1.128,0.878c-0.027778,0.1666666,-0.05,0.35,-0.05,0.5222222c0,0.1722222,0.011111,0.3555555,0.038889,0.5222222l-1.128,0.878c-0.1,0.077778,-0.12777777,0.2277777,-0.06666667,0.3388888l1.067,1.844c0.067,0.122,0.206,0.161,0.328,0.122l1.328,-0.533c0.2777778,0.2111111,0.5722222,0.3888889,0.9,0.5222222l0.2,1.4111115c0.027778,0.133333,0.1333333,0.227777,0.2666667,0.227777h2.1333331c0.1333333,0,0.2444444,-0.09444,0.2611111,-0.227777l0.2,-1.4111115c0.3277778,-0.1333333,0.6277777,-0.3111111,0.9,-0.5222222l1.3277777,0.5333334c0.1222222,0.044444,0.2611111,0,0.3277778,-0.1222223l1.066,-1.844c0.06667,-0.1222222,0.03889,-0.2611111,-0.06667,-0.3388888zm-3.967,1.478c-1.1,0,-1.9999999,-0.8999999,-1.9999999,-1.9999999c0,-1.1,0.8999999,-2,1.9999999,-2c1.0999998,0,1.9999998,0.9,1.9999998,2c0,1.1,-0.9,1.9999999,-1.9999998,1.9999999z"
        // Fire
        // topLeftAreaContent: 'M 12.986667,8.2333334 C 11.94,5.5133334 8.2133334,5.3666667 9.1133334,1.4133333 9.18,1.12 8.8666667,0.89333334 8.6133334,1.0466667 c -2.42,1.4266666 -4.16,4.2866667 -2.7,8.0333333 0.12,0.3066667 -0.24,0.5933334 -0.5,0.3933334 C 4.2066667,8.56 4.08,7.2466667 4.1866667,6.3066667 4.2266667,5.96 3.7733334,5.7933334 3.58,6.08 3.1266667,6.7733334 2.6666667,7.8933334 2.6666667,9.58 2.92,13.313333 6.0733334,14.46 7.2066667,14.606667 8.8266667,14.813333 10.58,14.513333 11.84,13.36 13.226667,12.073333 13.733333,10.02 12.986667,8.2333334 Z M 6.8,11.586667 c 0.96,-0.233334 1.4533334,-0.926667 1.5866667,-1.54 0.22,-0.9533336 -0.64,-1.886667 -0.06,-3.3933336 C 8.5466667,7.9 10.506667,8.68 10.506667,10.04 10.56,11.726667 8.7333334,13.173333 6.8,11.586667 Z'
        // full rectangle
        // topLeftAreaContent: 'M 0,0 H 16 V 16 H 0 Z'
      },
      -70,
      100
    );

    const node1out1 = node1.addOutPort({
      title: "First Logic",
      connectorCategory: "L",
      connectorCategoryTagColor: "#BF5000",
      connectorCategoryTagColorHover: "#AB4700",
      connectorCategoryTextColor: "#FFFFFF",
      connectorNameTagColor: "#7A3300",
      connectorNameTextColor: "#FFFFFF"
    });
    node1.addOutPort({ isASpacer: true });
    const node1out2 = node1.addOutPort({
      title: "Alarm Field: ABC",
      connectorCategory: "F"
    });
    const node1out3 = node1.addOutPort({
      title: "Alarm Field: Impacted Host",
      connectorCategory: "F"
    });
    const node1out4 = node1.addOutPort({
      title: "Alarm Field: Severity",
      connectorCategory: "F"
    });

    // ####################

    const node2 = diagramModel.addNode(
      {
        title: "Logic: First Logic",
        color: "#f2f207",
        topLeftArea: true,
        // Setting wheel:
        topLeftAreaContent:
          "M 3,3 m9.1544442,5.8555554c0.022222,-0.1666667,0.033333,-0.3388889,0.033333,-0.5222222c0,-0.1777778,-0.011111,-0.3555556,-0.038889,-0.5222222l1.128,-0.878c0.1,-0.077778,0.127778,-0.2277777,0.06667,-0.3388888l-1.067,-1.844c-0.067,-0.122,-0.205,-0.161,-0.328,-0.122l-1.327,0.533c-0.2777778,-0.2111112,-0.5722222,-0.3888889,-0.9,-0.5222223l-0.2,-1.41111103c-0.023,-0.133,-0.134,-0.228,-0.267,-0.228h-2.133c-0.134,0,-0.239,0.095,-0.262,0.228l-0.2,1.41111103c-0.3277778,0.1333334,-0.6277778,0.3166667,-0.9,0.5222223l-1.327,-0.533c-0.123,-0.045,-0.261,0,-0.328,0.122l-1.061,1.844c-0.067,0.117,-0.045,0.261,0.066,0.339l1.128,0.878c-0.027778,0.1666666,-0.05,0.35,-0.05,0.5222222c0,0.1722222,0.011111,0.3555555,0.038889,0.5222222l-1.128,0.878c-0.1,0.077778,-0.12777777,0.2277777,-0.06666667,0.3388888l1.067,1.844c0.067,0.122,0.206,0.161,0.328,0.122l1.328,-0.533c0.2777778,0.2111111,0.5722222,0.3888889,0.9,0.5222222l0.2,1.4111115c0.027778,0.133333,0.1333333,0.227777,0.2666667,0.227777h2.1333331c0.1333333,0,0.2444444,-0.09444,0.2611111,-0.227777l0.2,-1.4111115c0.3277778,-0.1333333,0.6277777,-0.3111111,0.9,-0.5222222l1.3277777,0.5333334c0.1222222,0.044444,0.2611111,0,0.3277778,-0.1222223l1.066,-1.844c0.06667,-0.1222222,0.03889,-0.2611111,-0.06667,-0.3388888zm-3.967,1.478c-1.1,0,-1.9999999,-0.8999999,-1.9999999,-1.9999999c0,-1.1,0.8999999,-2,1.9999999,-2c1.0999998,0,1.9999998,0.9,1.9999998,2c0,1.1,-0.9,1.9999999,-1.9999998,1.9999999z"
        // Fire
        // topLeftAreaContent: 'M 12.986667,8.2333334 C 11.94,5.5133334 8.2133334,5.3666667 9.1133334,1.4133333 9.18,1.12 8.8666667,0.89333334 8.6133334,1.0466667 c -2.42,1.4266666 -4.16,4.2866667 -2.7,8.0333333 0.12,0.3066667 -0.24,0.5933334 -0.5,0.3933334 C 4.2066667,8.56 4.08,7.2466667 4.1866667,6.3066667 4.2266667,5.96 3.7733334,5.7933334 3.58,6.08 3.1266667,6.7733334 2.6666667,7.8933334 2.6666667,9.58 2.92,13.313333 6.0733334,14.46 7.2066667,14.606667 8.8266667,14.813333 10.58,14.513333 11.84,13.36 13.226667,12.073333 13.733333,10.02 12.986667,8.2333334 Z M 6.8,11.586667 c 0.96,-0.233334 1.4533334,-0.926667 1.5866667,-1.54 0.22,-0.9533336 -0.64,-1.886667 -0.06,-3.3933336 C 8.5466667,7.9 10.506667,8.68 10.506667,10.04 10.56,11.726667 8.7333334,13.173333 6.8,11.586667 Z'
        // full rectangle
        // topLeftAreaContent: 'M 0,0 H 16 V 16 H 0 Z'
      },
      250,
      80
    );

    const node2in1 = node2.addInPort({
      title: "Logic",
      connectorCategory: "L",
      connectorCategoryTagColor: "#BF5000",
      connectorCategoryTagColorHover: "#AB4700",
      connectorCategoryTextColor: "#FFFFFF",
      connectorNameTagColor: "#7A3300",
      connectorNameTextColor: "#FFFFFF"
    });
    node2.addInPort({ isASpacer: true });
    const node2in2 = node2.addInPort({
      title: "Field: Host",
      connectorCategory: "F"
    });
    const node2in3 = node2.addInPort({
      title: "Field: Risk Score",
      connectorCategory: "F"
    });

    const node2out1 = node2.addOutPort({
      title: "Logic A",
      connectorCategory: "L",
      connectorCategoryTagColor: "#BF5000",
      connectorCategoryTagColorHover: "#AB4700",
      connectorCategoryTextColor: "#FFFFFF",
      connectorNameTagColor: "#7A3300",
      connectorNameTextColor: "#FFFFFF"
    });
    const node2out2 = node2.addOutPort({
      title: "Logic B",
      connectorCategory: "L",
      connectorCategoryTagColor: "#BF5000",
      connectorCategoryTagColorHover: "#AB4700",
      connectorCategoryTextColor: "#FFFFFF",
      connectorNameTagColor: "#7A3300",
      connectorNameTextColor: "#FFFFFF"
    });
    node2.addOutPort({ isASpacer: true });
    // node2.addOutPort("Some other output");

    // ####################################

    const node3 = diagramModel.addNode(
      {
        title: "Action: SRP - Sophos AV - Computer Scan",
        // color: '',
        topLeftArea: true,
        titleBarTopLeftAreaColor: "#fc5e03",
        // Fire
        topLeftAreaContent:
          "M 12.986667,8.2333334 C 11.94,5.5133334 8.2133334,5.3666667 9.1133334,1.4133333 9.18,1.12 8.8666667,0.89333334 8.6133334,1.0466667 c -2.42,1.4266666 -4.16,4.2866667 -2.7,8.0333333 0.12,0.3066667 -0.24,0.5933334 -0.5,0.3933334 C 4.2066667,8.56 4.08,7.2466667 4.1866667,6.3066667 4.2266667,5.96 3.7733334,5.7933334 3.58,6.08 3.1266667,6.7733334 2.6666667,7.8933334 2.6666667,9.58 2.92,13.313333 6.0733334,14.46 7.2066667,14.606667 8.8266667,14.813333 10.58,14.513333 11.84,13.36 13.226667,12.073333 13.733333,10.02 12.986667,8.2333334 Z M 6.8,11.586667 c 0.96,-0.233334 1.4533334,-0.926667 1.5866667,-1.54 0.22,-0.9533336 -0.64,-1.886667 -0.06,-3.3933336 C 8.5466667,7.9 10.506667,8.68 10.506667,10.04 10.56,11.726667 8.7333334,13.173333 6.8,11.586667 Z"
      },
      535,
      235
    );

    const node3in1 = node3.addInPort({
      title: "Logic",
      connectorCategory: "L",
      connectorCategoryTagColor: "#BF5000",
      connectorCategoryTagColorHover: "#AB4700",
      connectorCategoryTextColor: "#FFFFFF",
      connectorNameTagColor: "#7A3300",
      connectorNameTextColor: "#FFFFFF"
    });
    node3.addInPort({ isASpacer: true });
    const node3in2 = node3.addInPort({
      title: "Field: Host to Scan",
      connectorCategory: "F"
    });
    const node3in3 = node3.addInPort({
      title: "Field: ABC",
      connectorCategory: "F"
    });

    node3.addOutPort({
      title: "All Output",
      connectorCategory: "A",
      connectorCategoryTagColor: "#b54383",
      connectorCategoryTagColorHover: "#9e3e74",
      connectorCategoryTextColor: "#FFFFFF",
      connectorNameTagColor: "#69063e",
      connectorNameTextColor: "#FFFFFF"
    });
    node3.addOutPort({ isASpacer: true });
    node3.addOutPort({ title: "Field: Computer Name", connectorCategory: "F" });
    node3.addOutPort({
      title: "Field: Malware Hashes",
      connectorCategory: "F"
    });

    // ####################################

    const node4 = diagramModel.addNode(
      {
        title: "Action: SRP - Cisco ISE - Isolate Computer on Hostname",
        // color: '',
        topLeftArea: true,
        titleBarTopLeftAreaColor: "#fc5e03",
        // Fire
        topLeftAreaContent:
          "M 12.986667,8.2333334 C 11.94,5.5133334 8.2133334,5.3666667 9.1133334,1.4133333 9.18,1.12 8.8666667,0.89333334 8.6133334,1.0466667 c -2.42,1.4266666 -4.16,4.2866667 -2.7,8.0333333 0.12,0.3066667 -0.24,0.5933334 -0.5,0.3933334 C 4.2066667,8.56 4.08,7.2466667 4.1866667,6.3066667 4.2266667,5.96 3.7733334,5.7933334 3.58,6.08 3.1266667,6.7733334 2.6666667,7.8933334 2.6666667,9.58 2.92,13.313333 6.0733334,14.46 7.2066667,14.606667 8.8266667,14.813333 10.58,14.513333 11.84,13.36 13.226667,12.073333 13.733333,10.02 12.986667,8.2333334 Z M 6.8,11.586667 c 0.96,-0.233334 1.4533334,-0.926667 1.5866667,-1.54 0.22,-0.9533336 -0.64,-1.886667 -0.06,-3.3933336 C 8.5466667,7.9 10.506667,8.68 10.506667,10.04 10.56,11.726667 8.7333334,13.173333 6.8,11.586667 Z"
      },
      530,
      -50
    );

    const node4in1 = node4.addInPort({
      title: "Logic",
      connectorCategory: "L",
      connectorCategoryTagColor: "#BF5000",
      connectorCategoryTagColorHover: "#AB4700",
      connectorCategoryTextColor: "#FFFFFF",
      connectorNameTagColor: "#7A3300",
      connectorNameTextColor: "#FFFFFF"
    });
    node4.addInPort({ isASpacer: true });
    const node4in2 = node4.addInPort({
      title: "Field: Hostname",
      connectorCategory: "F"
    });

    node4.addOutPort({
      title: "All Output",
      connectorCategory: "A",
      connectorCategoryTagColor: "#b54383",
      connectorCategoryTagColorHover: "#9e3e74",
      connectorCategoryTextColor: "#FFFFFF",
      connectorNameTagColor: "#69063e",
      connectorNameTextColor: "#FFFFFF"
    });
    node4.addOutPort({ isASpacer: true });
    node4.addOutPort({ title: "Field: Computer Name", connectorCategory: "F" });
    node4.addOutPort({
      title: "Field: Malware Hashes",
      connectorCategory: "F"
    });

    diagramModel.addLink(node1out1, node2in1);
    diagramModel.addLink(node1out3, node2in2);
    diagramModel.addLink(node1out4, node2in3);
    diagramModel.addLink(node2out2, node3in1);
    diagramModel.addLink(node1out3, node3in2);
    diagramModel.addLink(node1out2, node3in3);
    diagramModel.addLink(node1out3, node4in2);
    diagramModel.addLink(node2out1, node4in1);

    return {
      console,
      serializedModel: diagramModel.serialize(),
      model: diagramModel,
      killLinks: false,
      killPoints: false,
      newNodeName: "SRP - Open Case",
      newNodeColor: "#f2f207",
      newNodeIconPath:
        "M 12.986667,8.2333334 C 11.94,5.5133334 8.2133334,5.3666667 9.1133334,1.4133333 9.18,1.12 8.8666667,0.89333334 8.6133334,1.0466667 c -2.42,1.4266666 -4.16,4.2866667 -2.7,8.0333333 0.12,0.3066667 -0.24,0.5933334 -0.5,0.3933334 C 4.2066667,8.56 4.08,7.2466667 4.1866667,6.3066667 4.2266667,5.96 3.7733334,5.7933334 3.58,6.08 3.1266667,6.7733334 2.6666667,7.8933334 2.6666667,9.58 2.92,13.313333 6.0733334,14.46 7.2066667,14.606667 8.8266667,14.813333 10.58,14.513333 11.84,13.36 13.226667,12.073333 13.733333,10.02 12.986667,8.2333334 Z M 6.8,11.586667 c 0.96,-0.233334 1.4533334,-0.926667 1.5866667,-1.54 0.22,-0.9533336 -0.64,-1.886667 -0.06,-3.3933336 C 8.5466667,7.9 10.506667,8.68 10.506667,10.04 10.56,11.726667 8.7333334,13.173333 6.8,11.586667 Z",
      newNodeIconColor: "#fc5e03",
      serialisedConf_1:
        '{"nodes":[{"title":"test3 Bla blo bl","x":10,"y":205,"width":134.90464706420897,"height":100,"ports":[{"id":857352,"type":"out","name":"testOut4"}],"color":"#cc6600","deletable":false},{"title":"SRP - Open Case","x":320.5,"y":272,"width":150.75793304443357,"ports":[{"id":601392,"type":"in","name":"Subject"}]}],"links":[]}'
    };
  }, // data
  computed: {
    prettyModel: {
      get() {
        return JSON.stringify(this.model, undefined, 2);
      },
      set(value) {
        this.model.deserialize(value);
      }
    },
    prettySerializedModel: {
      get() {
        return JSON.stringify(JSON.parse(this.serializedModel), undefined, 2);
        // return this.serializedModel;
      },
      set(value) {
        this.serializedModel = value;
      }
    }
  }, // computed
  methods: {
    addNode() {
      const newNode = this.model.addNode(
        {
          title: this.newNodeName,
          color: this.newNodeColor,
          topLeftArea: this.newNodeIconPath.length ? true : false,
          titleBarTopLeftAreaColor: this.newNodeIconColor,
          // topLeftAreaContent: '<path fill="black" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/>'
          topLeftAreaContent: this.newNodeIconPath
          // full rectangle
          // topLeftAreaContent: 'M 0,0 H 16 V 16 H 0 Z'
        },
        350,
        200
      );

      newNode.addInPort({ title: "Case Name", connectorCategory: "S" });
      newNode.addInPort({ title: "Alarm ID", connectorCategory: "N" });
      newNode.addInPort({ isASpacer: true, title: "in - spacer" });
      newNode.addOutPort({ isASpacer: true, title: "out - spacer" });
      newNode.addInPort({
        title: "Deletable - Editable",
        connectorCategory: "D",
        deletable: true,
        editable: true
      });
      newNode.addInPort({
        title: "Not deletable - Editable",
        connectorCategory: "N",
        deletable: false,
        editable: true
      });
      newNode.addInPort({
        title: "Deletable - Non Editable",
        connectorCategory: "D",
        deletable: true,
        editable: false
      });
      newNode.addInPort({
        title: "Not deletable - Non Editable",
        connectorCategory: "N",
        deletable: false,
        editable: false
      });
      newNode.addInPort({
        title: "D+E",
        connectorCategory: "+",
        deletable: true,
        editable: true
      });
      newNode.addInPort({
        title: "D+EE",
        connectorCategory: "+",
        deletable: true,
        editable: true
      });

      newNode.addOutPort({
        title: "Logic A",
        connectorCategory: "L",
        connectorCategoryTagColor: "#BF5000",
        connectorCategoryTagColorHover: "#AB4700",
        connectorCategoryTextColor: "#FFFFFF",
        connectorNameTagColor: "#7A3300",
        connectorNameTextColor: "#FFFFFF"
      });
      newNode.addOutPort({
        title: "Logic B",
        connectorCategory: "L",
        connectorCategoryTagColor: "#BF5000",
        connectorCategoryTagColorHover: "#AB4700",
        connectorCategoryTextColor: "#FFFFFF",
        connectorNameTagColor: "#7A3300",
        connectorNameTextColor: "#FFFFFF"
      });
      newNode.addOutPort({ title: "Case ID", connectorCategory: "N" });
      newNode.addOutPort("Some other output");

      newNode.addOutPort({
        title: "Deletable - Editable",
        connectorCategory: "D",
        deletable: true,
        editable: true
      });
      newNode.addOutPort({
        title: "Not deletable - Editable",
        connectorCategory: "N",
        deletable: false,
        editable: true
      });
      newNode.addOutPort({
        title: "Deletable - Non Editable",
        connectorCategory: "D",
        deletable: true,
        editable: false
      });
      newNode.addOutPort({
        title: "Not deletable - Non Editable",
        connectorCategory: "N",
        deletable: false,
        editable: false
      });
      newNode.addOutPort({
        title: "D+E",
        connectorCategory: "+",
        deletable: true,
        editable: true
      });
      newNode.addOutPort({
        title: "D+EE",
        connectorCategory: "+",
        deletable: true,
        editable: true
      });
    },
    selectNode(node, item) {
      this.console.log("selectNode: " + node.title + " // " + item.index);
    },
    configurePort(node, port) {
      this.console.log(
        "configurePort - Node (" +
          node.title +
          ") - Port: (" +
          port.type +
          ") " +
          port.name
      );
    }
  }, // methods
  template: `<div style="background-color: #423661; background-image: radial-gradient(#413561, #473d58);">
    <div>
      <div>
        <diagram
          :model="model"
          width="1200"
          height="600"
          :killLinksMode="killLinks"
          :killLinkPointsMode="killPoints"
          @selectNode="selectNode"
          @configurePort="configurePort"
        ></diagram>
        <button @click="console.log(model.serialize())">serialize</button>
        <button @click="model.deserialize(serializedModel)">deserialize</button>
        <button @click="model.deserialize(serialisedConf_1)">deserialize Conf 1</button>
        <input v-model="newNodeName" type="text" name="newName"/>
        <input v-model="newNodeColor" type="text" name="newNodeColor"/>
        <input v-model="newNodeIconPath" type="text" name="newNodeIconPath"/>
        <input v-model="newNodeIconColor" type="text" name="newNodeIconColor"/>
        <button @click="addNode">Add Node</button>
        <button @click="killLinks = !killLinks">Set "Link killing" mode to "{{ !killLinks }}"</button>
        <button @click="killPoints = !killPoints">Set "Point killing" mode to "{{ !killPoints }}"</button>
      </div>
      <hr>
      <input v-model="serializedModel" type="text" size="250" style="background-color: rgb(76 67 99);" />
      <div style="font-family: sans-serif; font-size: x-small;">
       {{ serializedModel }}
      </div>
      <hr>
      <div style="font-size: x-small;">
        <pre>
          {{ prettyModel }}
        </pre>
      </div>
      <hr>
      <b>SerializedModel:</b><br>
      <button @click="model.deserialize(serializedModel)">deserialize</button><br>
      <textarea
        name="prettyModelSerializedTextArea"
        cols="80" rows="250"
        style="background-color: rgb(76 90 99);"
      >{{ prettySerializedModel }}</textarea>
      <hr>
      <b>Model:</b><br>
      <textarea
        name="prettyModelTextArea"
        cols="80" rows="250"
        style="background-color: rgb(255 67 99);"
      >{{ prettyModel }}</textarea>
      <hr>
    </div>
  </div>`
}));
