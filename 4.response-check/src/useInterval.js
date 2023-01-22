import React, { useRef, useEffect } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    if (delay !== null) {
      let id = setInterval(function() {
        savedCallback.current()
      }, delay)
      return () => clearInterval(id)
    }
  }, [delay])

  return savedCallback.current
}

export default useInterval;