function useDebounce(cb, delay = 3000) {
  let timerId;
  return (...argus) => {
    console.log(...argus);
    clearInterval(timerId);
    timerId = setInterval(() => {
      cb(...argus);
    }, delay);
  };
}

export default useDebounce;
