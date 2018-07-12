let BaseErrCode = 1500

module.exports = {
  SequencePayCode: 'payCode',
  SequenceRefundCode: 'refundCode',

  Err: {
    FA_CREATE_PAYCODE: {
      err: BaseErrCode + 1,
      msg: 'Create Pay Code Fail'
    },
    FA_CREATE_REFUNDCODE: {
      err: BaseErrCode + 1,
      msg: 'Create Refund Code Fail'
    }
  }
}
