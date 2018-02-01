import { onGet5XXErrorRetryHOF, MAX_RETRY } from "../onGet5XXErrorRetry";
import { TestScheduler } from "rxjs";

const testScheduler = new TestScheduler();
describe("on5XXErrorRetryHOF(fetch)", () => {
  test("NOT retry when HTTP method is NOT GET", async () => {
    const expectErrorResponse = { status: 500 };
    const mockFetch = jest.fn(
      () =>
        new Promise(resolve => {
          resolve(expectErrorResponse);
        })
    );
    const onGet5XXErrorRetryFetch = onGet5XXErrorRetryHOF(mockFetch);

    const actualResponse = await onGet5XXErrorRetryFetch("http://my.url", {
      method: "POST"
    });

    expect(mockFetch.mock.calls.length).toBe(1);
    expect(actualResponse).toEqual(expectErrorResponse);
  });

  test("retry when fetch keeps response 500 error", async () => {
    const expectErrorResponse = { status: 500 };
    const mockFetch = jest.fn(
      () =>
        new Promise(resolve => {
          resolve(expectErrorResponse);
        })
    );

    const onGet5XXErrorRetryFetch = onGet5XXErrorRetryHOF(mockFetch);

    const actualResponse = await onGet5XXErrorRetryFetch("http://my.url");

    expect(mockFetch.mock.calls.length).toBe(3);
    expect(actualResponse).toEqual(expectErrorResponse);
  });

  test("retry and success", async () => {
    const errorResponse = { status: 500 };
    const expectedSuccessResponse = { status: 200 };
    const mockFetch = jest.fn(
      () =>
        new Promise(resolve => {
          if (mockFetch.mock.calls.length === 1) {
            resolve(errorResponse);
          } else if (mockFetch.mock.calls.length === 2) {
            resolve(expectedSuccessResponse);
          }
        })
    );

    const onGet5XXErrorRetryFetch = onGet5XXErrorRetryHOF(mockFetch);

    const actualResponse = await onGet5XXErrorRetryFetch("http://my.url");

    expect(mockFetch.mock.calls.length).toBe(2);
    expect(actualResponse).toEqual(expectedSuccessResponse);
  });

  test("retry and get NONE 5XX error", async () => {
    const errorResponse = { status: 500 };
    const expectedNone5XXResponse = { status: 401 };
    const mockFetch = jest.fn(
      () =>
        new Promise(resolve => {
          if (mockFetch.mock.calls.length === 1) {
            resolve(errorResponse);
          } else if (mockFetch.mock.calls.length === 2) {
            resolve(expectedNone5XXResponse);
          }
        })
    );

    const onGet5XXErrorRetryFetch = onGet5XXErrorRetryHOF(mockFetch);

    const actualResponse = await onGet5XXErrorRetryFetch("http://my.url");

    expect(mockFetch.mock.calls.length).toBe(2);
    expect(actualResponse).toEqual(expectedNone5XXResponse);
  });
});
