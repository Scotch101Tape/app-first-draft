export async function testingFetcher(results) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (Math.random() < 1) {
        res(results)
      } else {
        rej("Simulated error in testing fetcher")
      }
    }, 1000)
  })
}
