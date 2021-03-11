import { Row, Col } from 'antd'

import { RecoilModule } from './modules/recoil'
import { EffectorModule } from './modules/effector'

const App = () => {
  return (
    <Row justify="space-between" align="middle">
      <Col>
        <RecoilModule />
      </Col>
      <Col>
        <EffectorModule />
      </Col>
    </Row>
  );
}

export default App;
