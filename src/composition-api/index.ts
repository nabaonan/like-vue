import { useMemoizedFn, useMount, useReactive, useUnmount } from "ahooks";
import { createRef, MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import { isFunction } from "./utils";
export function reactive<T>(obj: T) {
  return useReactive(obj)
}

interface Ref<T> {
  value: T
}

export function ref<T>(value: T): Ref<T> {

  // const refValue = useRef(value)//useRef不会引起重新渲染，而useState则会引起重新渲染
  const [refValue, setRefValue] = useState<T>(value)
  return {
    get value() {
      return refValue
    },
    set value(value) {
      setRefValue(value)
    }
  }
}

export type ComputedGetter<T> = (...args: any[]) => T
export type ComputedSetter<T> = (v: T) => void
export interface WritableComputedOptions<T> {
  get: ComputedGetter<T>
  set: ComputedSetter<T>
}

export function computed<T>(getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>, deps: any[]) {
  let getter: ComputedGetter<T>
  let setter: ComputedSetter<T>
  const onlyGetter = isFunction(getterOrOptions)
  if (onlyGetter) {
    getter = getterOrOptions
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }

  let result = useMemo(() => {
    if (onlyGetter) {
      return getterOrOptions()
    } else {
      return getterOrOptions.get()
    }

  }, deps)
  return {
    get value() {

      return result
    },
    set value(value) {
      setter(value)
    }
  }


}

export function onMounted(fn: () => void) {
  useMount(fn)
}

export function onUnmounted(fn: () => void) {
  useUnmount(fn)
}
