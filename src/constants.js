export const WBTC_Token =
  "xion135yclma7mfkcv5dvjclrecz2evd4ls8rquvcj7xpkmheprh2kpuqlkydc9";
export const WBTC_Vault =
  "xion132xszwjz2z6xnxvw4zl8ja9ham65q4ugte2edvnljxxl7jcnu0eqmvr8w7";
export const WETH_Token =
  "xion1wz078ggm4ftsuc7wczx2xn5alysud8k7yl33ezyd0ds0g98phapss6mfy6";
export const WETH_Vault =
  "xion1lqzy3peq5yxe48hrfh75v0l9pwtrtywfrykvgjrz9wyd8hzk248s524yrf";
export const parseMantra = (value) => {
  let number = parseFloat(value);
  let scaledNumber = Math.round(number * 1e6);
  return parseInt(scaledNumber);
};
