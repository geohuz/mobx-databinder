const errorLog = (error) => {
  if (error.response) {
    console.error('error', error.response.data.message)
  } else {
    console.error('error', error.message)
  }
}

export default errorLog
