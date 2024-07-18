export function getDate(): string {
    const tzoffset = new Date().getTimezoneOffset() * 60000;
  
    return new Date(Date.now() - tzoffset)
      .toISOString()
      .replace(/T/, ' ')
      .replace('Z', '')
  }
  
  export function getCurrentTimeInMilliseconds() {
    return Math.floor(Date.now())
  }
  