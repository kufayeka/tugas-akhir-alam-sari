import { MqttBridge } from "capacitor-mqtt-native-plugin";

// Set the MQTT server connection options
const connectOptions = {
  serverURI: "tcp://broker.hivemq.com",
  port: 1883,
  clientId: "",
  username: "",
  password: "",
  setCleanSession: true,
  connectionTimeout: 10,
  keepAliveInterval: 60,
  setAutomaticReconnect: true,
};

export const mqttConnect = async () =>
  MqttBridge.connect(connectOptions)
    .then(() => {
      console.log("Connect Success");
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

export function subscribe() {
  const topic = "your_mqtt_topic";
  const qos = 0;

  MqttBridge.subscribe({ topic, qos })
    .then((result: any) => {
      console.log("Successfully subscribed to topic:");
      console.log("Topic:", result.topic);
      console.log("QoS:", result.qos);
    })
    .catch((errorMessage: any) => {
      console.log("Failed to subscribe to topic. Error:", errorMessage);
    });
}

export function publish() {
  const topic = "your_mqtt_topic";
  const payload = "test";
  const qos = 0;
  const retained = true;

  MqttBridge.publish({ topic, payload, qos, retained })
    .then((result: any) => {
      console.log("Successfully published message:");
      console.log("Topic:", result.topic);
      console.log("QoS:", result.qos);
      console.log("Payload:", result.payload);
      console.log("Retained:", result.retained);
      console.log("Message ID:", result.messageId);
    })
    .catch((errorMessage: any) => {
      console.log("Failed to publish message. Error:", errorMessage);
    });
}

MqttBridge.addListener("onMessageArrived", (result: any) => {
  console.log("Received a new message:");
  console.log("Topic:", result.topic);
  console.log("Message:", result.message);
});

MqttBridge.addListener("onConnectComplete", (result: any) => {
  console.log("Successfully connected to MQTT broker:");
  console.log("Reconnected:", result.reconnected);
  console.log("Server URI:", result.serverURI);
});

MqttBridge.addListener("onConnectionLost", (result: any) => {
  console.log("Connection lost:");
  console.log("Connection status:", result.connectionStatus);
  console.log("Reason code:", result.reasonCode);
  console.log("Message:", result.message);
});
