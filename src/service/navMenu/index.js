import axios from '../config'

export const getMessage = params => axios('/msg/listMsgByParam', {params})

export const updateMessageStatus = params => axios('/msg/updateMsg', {params})