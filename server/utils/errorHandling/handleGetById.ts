async function handleInvalidValueError(error) {
  if (error.message.includes('Cast to ObjectId failed')) {
    return { ERROR: 'One or More of the Parameters Values is Invalid' };
  }
  return { ERROR: error?.message };
}

export default handleInvalidValueError;
