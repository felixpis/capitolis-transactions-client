import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Modal } from 'antd'
import * as transactionsApi from '../api/transactions';

const NewTransaction = ({visible, onClose}) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const handleOk = () => {
    form.submit();
  }
  const handleCancel = () => {
    onClose();
    form.resetFields();
  }
  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      const addedTransaction = await transactionsApi.addTransaction(values);
      onClose(addedTransaction);
      form.resetFields();
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal title="Add transaction" visible={visible} onCancel={handleCancel} onOk={handleOk} confirmLoading={saving}>
      <Form form={form} onFinish={handleSubmit} requiredMark="optional" labelCol={{span: 6}} >
        <Form.Item label="Trading party" name="tradingParty" initialValue="me" rules={[{required: true, message: "Trading party is mandatory"}]}>
          <Input readOnly />
        </Form.Item>
        <Form.Item label="Counter party" name="counterParty" rules={[{required: true, message: "Counter party is mandatory"}]}>
          <Input />
        </Form.Item>
        <Form.Item label="Amount" name="amount" rules={[{required: true, message: "Amount is mandatory"}, {pattern: new RegExp('[^0]\\d*$'), message: 'Amount should not be 0'}]}>
          <InputNumber 
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

NewTransaction.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func
}

export default NewTransaction
