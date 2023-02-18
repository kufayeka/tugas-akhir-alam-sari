import useDelay from "@/composables/use-delay";
import { Spinner } from "capacitorjs-spinner";

const { delay } = useDelay();

async function showSpinner() {
  Spinner.showSpinner();
}

async function hideSpinner() {
  await delay(0.3);
  Spinner.hideSpinner();
}

export { showSpinner, hideSpinner };
