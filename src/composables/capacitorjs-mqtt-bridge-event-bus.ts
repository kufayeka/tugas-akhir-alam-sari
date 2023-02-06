import { useEventBus } from "@vueuse/core";
import { MqttBridge } from "capacitorjs-mqtt-bridge";

const mqttConnectionEventListener = useEventBus<any>("mqttConn");
const mqttMessageArrivedEventListener = useEventBus<any>("mqttMssg");

MqttBridge.addListener("mqttConnection", (x: any) => {
  mqttConnectionEventListener.emit(x);
});

MqttBridge.addListener("messageArrived", (x: any) => {
  mqttMessageArrivedEventListener.emit(x);
});

export { mqttConnectionEventListener, mqttMessageArrivedEventListener };
