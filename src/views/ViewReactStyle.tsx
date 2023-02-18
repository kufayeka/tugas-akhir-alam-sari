import { defineComponent, ref } from "vue";
import { Button } from "konsta/vue";

interface ServerResponse {
  name: string;
  age: number;
  gender: string;
}

const serverResponse = ref<ServerResponse[]>([]);

export const sharedMethods = {
  getDataFromServer() {
    serverResponse.value.push({ name: "Abdi", age: 25, gender: "Male" });
  },
};

export const ViewReactStyleComponent = defineComponent({
  setup() {
    return () => (
      <>
        <div>this is component AAAAA</div>
        <Button onClick={sharedMethods.getDataFromServer}>Get Data</Button>
        {serverResponse.value.map((x, index) => (
          <div key={index}>{x.name}</div>
        ))}
      </>
    );
  },
});
