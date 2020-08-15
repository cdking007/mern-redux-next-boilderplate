export default function catchError(error, cb) {
  let errorMessage;
  if (error.response) {
    errorMessage = error.response.data;
  } else if (error.request) {
    errorMessage = error.request;
  } else {
    errorMessage = error.message;
  }
  cb(errorMessage);
}
