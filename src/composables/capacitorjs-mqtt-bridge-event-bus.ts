import { useEventBus } from "@vueuse/core";
import { MqttBridge } from "capacitor-mqtt-native-plugin";

// create event buses to listen for mqtt connection and message events
const mqttConnectCompleteListener = useEventBus<any>("onConnectComplete");
const mqttConnectFailedEventListener = useEventBus<any>("onConnectFailed");
const mqttConnectinLostEventListener = useEventBus<any>("onConnectionLost");
const mqttMessageArrivedEventListener = useEventBus<any>("onMessageArrived");

// add listeners to the MqttBridge for connection and message events and emit the events to the corresponding event buses
MqttBridge.addListener("onConnectComplete", (x: any) => {
  mqttConnectCompleteListener.emit(x);
});

MqttBridge.addListener("onConnectionLost", (x: any) => {
  mqttConnectinLostEventListener.emit(x);
});

MqttBridge.addListener("onMessageArrived", (x: any) => {
  mqttMessageArrivedEventListener.emit(x);
});

// export the event buses for mqtt connection and message events
export {
  mqttConnectCompleteListener,
  mqttConnectFailedEventListener,
  mqttConnectinLostEventListener,
  mqttMessageArrivedEventListener,
};
