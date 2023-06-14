import { mqttMessageArrivedEventListener } from "@/composables/capacitorjs-mqtt-bridge-event-bus";
import { MqttBridge } from "capacitor-mqtt-native-plugin";

// Generate a random clientID
function generateRandomClientId(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

// Set the MQTT server connection options
const connectOptions = {
  serverURI: "tcp://203.189.122.131",
  port: 1883,
  clientId: "",
  username: "petra_mqtt_broker",
  password: "petraMqttBroker777",
  setCleanSession: true,
  connectionTimeout: 10,
  keepAliveInterval: 60,
  setAutomaticReconnect: true,
};

export const mqttConnect = async () =>
  MqttBridge.connect(connectOptions)
    .then(() => {
      console.log("Connect Success");
      subscribeToTopics();
    })
    .catch((errorMessage: string) => {
      console.log("Connect Failed:", errorMessage);
    });

export const mqttDisconnect = async () =>
  MqttBridge.disconnect()
    .then(() => {
      console.log("Disconnect Success");
    })
    .catch((errorMessage: string) => {
      console.log("Disconnect Failed:", errorMessage);
    });

export const realtimeDataMQTTTopic =
  "petra/alamsari/kumbung_jamur/real_time/climate";
export const dataLoggerMQTTTopic =
  "petra/alamsari/kumbung_jamur/data_logger/climate";
export const parameterSettingMQTTTopic =
  "petra/alamsari/kumbung_jamur/setting/all_parameters";

export function subscribeToTopics() {
  const realtimeDataTopic = {
    topic: realtimeDataMQTTTopic,
    qos: 1,
  };
  MqttBridge.subscribe(realtimeDataTopic);

  const dataLoggerTopic = {
    topic: dataLoggerMQTTTopic,
    qos: 1,
  };
  MqttBridge.subscribe(dataLoggerTopic);

  const parameterSettingTopic = {
    topic: parameterSettingMQTTTopic,
    qos: 1,
  };
  MqttBridge.subscribe(parameterSettingTopic);
}

MqttBridge.addListener("onMessageArrived", (result: any) => {});

MqttBridge.addListener("onConnectComplete", (result: any) => {});

MqttBridge.addListener("onConnectionLost", (result: any) => {});
