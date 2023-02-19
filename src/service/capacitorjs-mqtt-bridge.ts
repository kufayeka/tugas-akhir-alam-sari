import { MqttBridge } from "capacitorjs-mqtt-bridge";

// Set the MQTT server connection options
const mqttOptions = {
  serverURI: "tcp://broker.hivemq.com",
  port: 1883,
};

// Connect to the MQTT server with the given options
export const connect = () => MqttBridge.mqttConnect(mqttOptions);

// Disconnect from the MQTT server
export const disconnect = () => MqttBridge.mqttDisconnect();

// Publish a message to the given topic with the given payload, QoS, and retained flag
export const publish = (
  topic: string,
  payload: string,
  qos: number,
  retained: boolean
) => MqttBridge.mqttPublish({ topic, payload, qos, retained });

// Subscribe to messages on the given topic with the given QoS level
export const subscribe = (topic: string, qos: number) =>
  MqttBridge.mqttSubscribe({ topic, qos });
