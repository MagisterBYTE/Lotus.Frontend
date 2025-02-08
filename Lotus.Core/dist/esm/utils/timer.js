/**
 *
 * @param timeoutInMs
 * @returns
 */
export function sleep(timeoutInMs) {
    return new Promise((resolve) => setTimeout(resolve, timeoutInMs));
}
