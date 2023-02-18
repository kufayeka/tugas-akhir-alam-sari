import { ref, defineComponent } from "vue";
import { kButton } from "konsta/vue";

const x = ref("yeKaa");
const DOMToggle = ref(false);

const BUTTON = kButton;

function renderElement(x: string, y: number) {
  const element = (
    <>
      <div>
        this is {x} string and this is {y} number
      </div>
      <div class={"bg-pink-500 rounded-md p-2"}>
        pink tight, pussy clean, pussy fresh
      </div>
    </>
  );
  return element;
}

const element = (
  <>
    <div>this is string and this is number</div>
    <div class={"bg-pink-500 rounded-md p-2"}>
      pink tight, pussy clean, pussy fresh
    </div>
  </>
);

const data = ref([
  { name: "Yayan", age: 23 },
  { name: "Abdi", age: 25 },
  { name: "Majio", age: 27 },
]);

function addArray() {
  data.value.push({ name: "Amos", age: 24 });
}

const render = defineComponent({
  setup() {
    return () => (
      <>
        <div>
          {!DOMToggle.value ? (
            <h1>Vue TSX is awesome!</h1>
          ) : (
            renderElement("rbrbrbr", 18)
          )}
        </div>
        <div>{x.value}</div>
        <BUTTON onClick={() => (DOMToggle.value = true)} rounded>
          Test Button
        </BUTTON>
        <BUTTON onClick={() => addArray()} rounded>
          Add
        </BUTTON>
        {data.value.map((x, index) => (
          <div key={index}>
            {x.age > 23 ? (
              <div class={"bg-green-600 p-2"}>
                {index}. {x.name} - {x.age}
              </div>
            ) : (
              <div class={"bg-red-600 p-2"}>
                {index}. {x.name} - {x.age}
              </div>
            )}
          </div>
        ))}
      </>
    );
  },
});

export { render, data, addArray };
