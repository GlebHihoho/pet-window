import { useState, useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { Button, Row, Col, Typography } from 'antd'
import { useEffect } from 'react'

const counterRecoil = atom({
  key: 'counterRecoil',
  default: 0,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet(newValue => {
        window.postMessage({ recoilValue: newValue, type: 'recoil' }, '*')
      })
    },
  ]
})

export const RecoilModule = () => {
  const [count, setCount] = useRecoilState(counterRecoil)
  const [effectorCount, setEffectorCount] = useState(0)

  const eventListener = useCallback((event) => {
    if (event?.data?.type === 'effector') setEffectorCount(event?.data?.effectorValue)
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
        <Typography.Text>Recoil count = {count}</Typography.Text>
      </Col>
      <Col>
        <Typography.Text>Effector count = {effectorCount}</Typography.Text>
      </Col>
      <Col>
        <Button onClick={() => setCount(count + 1)}>Add Recoil Count</Button>
      </Col>
    </Row>
  )
}
