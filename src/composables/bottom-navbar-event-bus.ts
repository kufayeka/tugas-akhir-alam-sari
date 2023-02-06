import { useEventBus } from "@vueuse/core";

const bottomNavbarEventBus = useEventBus<any>("bottomNavigation");

export { bottomNavbarEventBus };
