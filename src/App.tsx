import './App.css'

import Text from '@shared/Text'
import Button from '@shared/Button'
import Input from '@shared/Input'
import TextField from './components/shared/TextField'
import Alert from './components/shared/Alert'

import { useAlertContext } from './contexts/AlertContext'

function App() {
  const { open } = useAlertContext()

  return (
    <div>
      <Text typography="t1" display="block" color="red" bold>
        t1
      </Text>
      <Text typography="t2">t2</Text>
      <Text typography="t3">t3</Text>
      <Text typography="t4">t4</Text>
      <Text>t5</Text>
      <Text typography="t6">t6</Text>

      <hr />
      <br />
      <br />

      <Button>클릭 해주세용</Button>
      <Button color="error">클릭 해주세용</Button>
      <Button color="success">클릭 해주세용</Button>
      <Button color="success" size="large" weak full disabled>
        클릭 해주세용
      </Button>

      <hr />
      <br />
      <br />

      <Input />
      <Input aria-invalid={true} />

      <hr />
      <br />
      <br />

      <hr />
      <br />
      <br />
      <TextField label="아이디" hasError />
      <TextField label="비밀번호" />

      {/* <Alert title="alert Text" description="히힣" onButtonClick={() => {}} /> */}
      <Button
        onClick={() =>
          open({ title: '하이', description: 'test', onButtonClick: () => {} })
        }
      >
        얼러트 오픈!
      </Button>
    </div>
  )
}

export default App
