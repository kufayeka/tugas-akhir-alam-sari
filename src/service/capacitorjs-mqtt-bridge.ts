import { MqttBridge } from "capacitorjs-mqtt-bridge";

const mqttOpt = {
  serverURI: "tcp://broker.hivemq.com",
  port: 1883,
};

function connect() {
  MqttBridge.mqttConnect(mqttOpt);
}

function disconnect() {
  MqttBridge.mqttDisconnect();
}

function publish(
  topic: string,
  payload: string,
  qos: number,
  retained: boolean
) {
  MqttBridge.mqttPublish({
    topic: topic,
    payload: payload,
    qos: qos,
    retained: retained,
  });
}

function subscribe(topic: string, qos: number) {
  MqttBridge.mqttSubscribe({ topic: topic, qos: qos });
}

export { connect, disconnect, publish, subscribe };
