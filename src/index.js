import compose from "./compose";
import { bypassCacheHOF } from "./hof/bypassCache";
import { onGet5XXErrorRetryHOF } from "./hof/onGet5XXErrorRetry";
import { defaultHeadersHOF } from "./hof/defaultHeaders";

export const composedHOF = compose(
  bypassCacheHOF,
  onGet5XXErrorRetryHOF,
  defaultHeadersHOF
);
export default composedHOF(fetch);
