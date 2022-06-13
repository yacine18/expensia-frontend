export const handleErrors = (err: any) => {
  err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message;
};
