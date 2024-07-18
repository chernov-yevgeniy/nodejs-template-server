export function success(data: any = null, message?: string): object {
  return {
    data,
    message,
    error: false
  };
}

export function error(data: any = null, message?: string): object {
  return {
    data,
    message,
    error: true
  };
}
