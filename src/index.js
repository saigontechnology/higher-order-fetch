import compose from "./compose";
import { bypassCacheHOF } from "./hof/bypassCache";
import { onErrorRetryHOF } from "./hof/onErrorRetry";
import { defaultHeadersHOF } from "./hof/defaultHeaders";

export const composedHOF = compose(
  bypassCacheHOF,
  onErrorRetryHOF,
  defaultHeadersHOF
);
export default composedHOF(fetch);
