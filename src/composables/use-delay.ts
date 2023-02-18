function useDelay() {
  const delay = (seconds: number) =>
    new Promise<void>((resolve) => setTimeout(() => resolve(), seconds * 1000));

  return { delay };
}

export default useDelay;
