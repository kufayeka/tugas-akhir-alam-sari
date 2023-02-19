import { useEventBus } from "@vueuse/core";
import { MqttBridge } from "capacitorjs-mqtt-bridge";

// create event buses to listen for mqtt connection and message events
const mqttConnectionEventListener = useEventBus<any>("mqttConn");
const mqttMessageArrivedEventListener = useEventBus<any>("mqttMssg");

// add listeners to the MqttBridge for connection and message events and emit the events to the corresponding event buses
MqttBridge.addListener("mqttConnection", (x: any) => {
  mqttConnectionEventListener.emit(x);
});

MqttBridge.addListener("messageArrived", (x: any) => {
  mqttMessageArrivedEventListener.emit(x);
});

// export the event buses for mqtt connection and message events
export { mqttConnectionEventListener, mqttMessageArrivedEventListener };
