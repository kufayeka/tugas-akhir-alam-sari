import { Screen } from "capacitorjs-screen-plugin";

export async function setLandscape(): Promise<{ result: string }> {
  const { result } = await Screen.setLandscape();
  return { result };
}

export async function setPortrait(): Promise<{ result: string }> {
  const { result } = await Screen.setPortrait();
  return { result };
}
