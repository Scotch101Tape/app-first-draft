import { useState, useRef } from 'react'

export default function FetchContent({args, fetcher, getCache, updateCache, loading, fail, success}) {
  const [isLoading, setIsLoading] = useState(true)
  const [isFail, setIsFail] = useState(null)
  const [resultState, setResultState] = useState(null)
  const fetching = useRef(null)

  const isNewArgs = Object.keys(args).filter(key => args[key] !== fetching.current?.[key]).length > 0

  if (isNewArgs) {
    fetching.current = args
    setIsLoading(true)
    setIsFail(false)
    setResultState(null)

    new Promise((res, rej) => {
      const cache = getCache(args)
      if (cache) {
        // data from cache
        res([true, cache])
        console.log("from cache")
      } else {
        // fetch data
        res(Promise.all([false, fetcher(args)]))
        console.log("fetching")
      }
    })
    .then(([cacheUsed, result]) => {
      if (!cacheUsed && result) {
        updateCache({args, result})
      }

      if (fetching.current === args) {
        setResultState(result)
        setIsLoading(false)
      }
    })
    .catch(error => {
      console.warn(error)
      if (fetching.current === code) {
        setRetry(true)
        setIsLoading(false)
      }
    })
  }

  if (isLoading) {
    console.log("loading")
    return loading()
  } else if (isFail) {
    console.log("failing")
    return fail()
  } else if (resultState) {
    console.log("success")
    return success(resultState)
  } else {
    throw "WHAT"
  }
}
