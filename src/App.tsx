import { useRef, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { computed, reactive, ref } from './composition-api'

function App() {
  const state = reactive({
    count: 0
  })

  const ref1 = ref(0)
  const ref2 = ref(2)

  // const aaa = computed(() => refValue.value + 1, [refValue])
  const compd = computed({
    get() {
      return state.count + ref2.value
    },
    set(value) {
      console.log('触发')
      state.count++
      ref2.value++
    }
  }, [state.count])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          ref1 【语法ref】 = {ref1.value}<br />
          <button type="button" onClick={() => {
            ref1.value++
          }}>

            测试ref1  +1
          </button>

        </p>
        <p>

          state.count[语法reactive] : {state.count}<br />
          <button type="button" onClick={() => {
            state.count++
          }}>
            测试reactive  +1
          </button>
        </p>

        <p>
          compd【语法computed】 = state+ref2<br />
          compd 的setter方法触发state ref2变化<br />
          计算属性compd: {compd.value}<br />
          state:{state.count}<br />
          ref1: {ref1.value}<br />
          ref2: {ref2.value}<br />

          <button type="button" onClick={() => {
            compd.value = 2
          }}>
            测试computed +1   给计算属性赋值触发setter方法
          </button>
        </p>


      </header>
    </div>
  )
}

export default App
