import { mqttMessageArrivedEventListener } from "@/composables/capacitorjs-mqtt-bridge-event-bus";
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
  const sub1 = { topic: "yekaa/testing/get_db_command", qos: 0 };
  MqttBridge.subscribe(sub1);

  const sub2 = { topic: "yekaa/testing/get_db_result", qos: 0 };
  MqttBridge.subscribe(sub2);
}

export function requestDatabaseRecords(x: {
  grafik_kumbung: number;
  limit: number;
}) {
  const topic = "yekaa/testing/get_db_command";
  const payload = JSON.stringify(x);
  const qos = 0;
  const retained = false;

  MqttBridge.publish({ topic, payload, qos, retained });
}

mqttMessageArrivedEventListener.on((x: any) => {
  var y = {
    status: "Received a new message",
    topic: x.topic,
    message: JSON.parse(x.message),
  };

  if (y.topic == "yekaa/testing/get_db_command") {
    const opt = y.message;
    getDataFromDB({ grafik_kumbung: opt.grafik_kumbung, limit: opt.limit });
  }
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

interface DataEntry {
  temp: number;
  hum: number;
  ts: string;
}

interface Message {
  message: string;
  dataCounts: number;
  data: DataEntry[];
}

const generateData = (limit: number): DataEntry[] => {
  const data: DataEntry[] = [];
  for (let i = 0; i < limit; i++) {
    const temp = Math.floor(Math.random() * 20000) + 20;
    const hum = Math.floor(Math.random() * 20000) + 20;
    const date = new Date(2022, 1, i + 1);
    const ts = date.toISOString().substring(0, 10);
    data.push({ temp, hum, ts });
  }
  return data;
};

let data: DataEntry[] = generateData(20000); // generate the data when the app is launched

export function getDataFromDB(x: { grafik_kumbung: number; limit: number }) {
  // limit the number of data points to be sent to MQTT
  const limitedData = data.slice(0, x.limit);

  const message: Message = {
    message: `this is data from kumbung: ${x.grafik_kumbung}`,
    dataCounts: limitedData.length,
    data: limitedData,
  };

  const topic = "yekaa/testing/get_db_result";
  const payload = JSON.stringify(message);
  const qos = 2;
  const retained = false;

  MqttBridge.publish({ topic, payload, qos, retained });
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
MqttBridge.addListener("onMessageArrived", (result: any) => {});

MqttBridge.addListener("onConnectComplete", (result: any) => {});

MqttBridge.addListener("onConnectionLost", (result: any) => {});
