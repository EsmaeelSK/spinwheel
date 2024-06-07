import { Modal, Button, Checkbox, Form, Input } from 'antd'
import React, { useContext } from 'react';
import { context } from '../context/context';

function LoginModal() {
    const { openLoginModal, setOpenLoginModal, setText, setIsTyping } = useContext(context);

    const handleOk = () => {
        // setOpen(false);
    };
    const handleCancel = () => {
        // setOpen(false);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        setOpenLoginModal(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setOpenLoginModal(false);
    };

    return <>
        <Modal
            open={openLoginModal}
            title="Title"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={(_, { OkBtn, CancelBtn }) => (
            <>
                {/* <CancelBtn />
                <OkBtn /> */}
            </>
            )}
        >
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="نام"
                    name="fullname"
                    rules={[
                        {
                            required: true,
                            message: 'اسمتو بگو بیشتر بشناسمت!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="شماره همراه"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'شماره نمیدی؟',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
            </Form>
      </Modal>
    </>
}

export default LoginModal;