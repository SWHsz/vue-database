 
export default {
  // 成功
  success: data => {
    return {
      errCode: '200',
      errMsg: '0000000（成功）',
      data: data ? data : null
    }
  },
  // 失败
  fail: (errCode, errMsg) => {
    return {
      errCode: errCode ? errCode : '410',
      errMsg: errMsg ? errMsg : '0401001（未知错误）',
      data: null
    }
  },
  // 权限不足
  unauthorized: () => {
    return {
      errCode: '422',
      errMsg: '4300001（无权访问）',
      data: null
    }
  }
}