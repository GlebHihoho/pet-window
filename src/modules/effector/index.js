import { useState, useCallback } from 'react'
import { createStore, createEvent } from 'effector'
import { useStore } from 'effector-react'
import { Button, Row, Col, Typography } from 'antd'
import { useEffect } from 'react'

const effectorCountState = createStore(0)
const handleChangeEffectorCount = createEvent()

effectorCountState.on(handleChangeEffectorCount, (state) => {
  const newState = state + 1
  window.postMessage({ effectorValue: newState, type: 'effector' }, '*')
  return newState
})


export const EffectorModule = () => {
  const [recoilCount, setRecoilCount] = useState(0)
  const effectorCount = useStore(effectorCountState)

  const eventListener = useCallback((event) => {
    if (event?.data?.type === 'recoil') setRecoilCount(event?.data?.recoilValue)
  }, [])

  useEffect(() => {
    window.addEventListener('message', eventListener)

    return () => window.removeEventListener('message', eventListener)
  }, [eventListener])

  return (
    <Row>
      <Col>
        <Typography.Title level={3}>RecoilModule</Typography.Title>
      </Col>
      <Col>
        <Typography.Text>Recoil count = {recoilCount}</Typography.Text>
      </Col>
      <Col>
        <Typography.Text>Effector count = {effectorCount}</Typography.Text>
      </Col>
      <Col>
        <Button onClick={handleChangeEffectorCount}>Add Effector Count</Button>
      </Col>
    </Row>
  )
}
