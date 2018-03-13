/* global File */
import bytesToSize from './bytesToSize';

/* Validation */
export default (size, message) => value => ({
  isValid:
    (value instanceof Array || value instanceof Object) &&
    value[0] instanceof File &&
    value[0].size <= size,
  message: message || `حجم فایل باید کمتر از ${bytesToSize(size)} باشد!`,
});
