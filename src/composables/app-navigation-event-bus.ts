import { useEventBus } from "@vueuse/core";

const appNavigationEventBus = useEventBus<any>("appNavigation");

export { appNavigationEventBus };
