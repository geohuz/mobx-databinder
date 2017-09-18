import React from 'react'
import {withHandlers} from 'recompose'

const enhance = withHandlers({
  reload: props=>()=>{
    props.bindData()
  }
})

const ErrorInplace = ({error, setError, reload}) =>
  <div style={{width: '100vw', height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'center'}}>
    <h3 style={{padding: 20, alignSelf: 'center' }} onClick={reload}> {`出错了! 错误信息: ${error}, 点击重试`} </h3>
  </div>


export default enhance(ErrorInplace)
