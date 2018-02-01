import Rx from "rxjs";

export const MAX_RETRY = 3;
const RETRY_DELAY = 500;
export const onGet5XXErrorRetryHOF = fetch => (input, init = {}) => {
  if (!init.method || init.method.toUpperCase() === "GET") {
    return retryObservable(
      Rx.Observable,
      fetch,
      input,
      init,
      MAX_RETRY,
      RETRY_DELAY
    )
      .toPromise()
      .then(
        resp => resp,
        resp => {
          if (resp.status === 500) return resp;
          throw resp;
        }
      );
  }
  return fetch(input, init);
};

function retryObservable(Observable, fetch, input, init, maxRetry, retryDelay) {
  let count = 0;
  return Observable.defer(() => {
    return Rx.Observable.fromPromise(
      fetch(input, init).then(resp => {
        if ((resp.status + "").startsWith("5")) throw resp;
        return resp;
      })
    );
  }).retryWhen(errors => {
    return errors.mergeMap(error => {
      if (++count >= maxRetry) {
        return Rx.Observable.throw(error);
      } else {
        return Rx.Observable.of(error).delay(retryDelay);
      }
    });
  });
}
