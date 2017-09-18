import React from 'react'
import {observer} from 'mobx-react'
import Button from 'material-ui/Button'
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from 'material-ui/Dialog'

const ErrorPopup = ({error, setError}) => {
  return (
    <Dialog
      open={error!==null}
      onRequestClose={()=>{
        setError(null)
      }}
    >
      <DialogTitle>出错了!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`错误信息: ${error}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color='primary'
          onClick={()=> setError(null)}>
        确定
        </Button>
      </DialogActions>
    </Dialog>
)}

export default observer(ErrorPopup)
