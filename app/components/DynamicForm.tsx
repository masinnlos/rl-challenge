import React from 'react';
import { Form, Input, Button, Space, message } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { RestObject, FormValues } from '../types';
import { useRouter } from 'next/navigation'

type onSubmitType = (data: RestObject, update: boolean, id: string) => Promise<any>;
interface DynamicFormProps {
    initialData: RestObject;
    onSubmit: onSubmitType;
    setLoading: (b: boolean) => void;
    update: boolean
    id: string
}

export function DynamicForm({ initialData, onSubmit, setLoading, update, id }: DynamicFormProps) {
    const router = useRouter()
    const initialFields = initialData.data
        ? Object.entries(initialData.data).map(([key, value]) => ({ key, value }))
        : [];


    // here I handle submitting the form, first I process data fields then I send a put or post request
    //then I print a message if something went wrong or in case my submission was correct
    const handleFinish = (values: FormValues) => {
        const formDataData: Record<string, string> = {}
        //process form list...
        if (values.fields)
            for (let i = 0; i < values.fields.length; i++)
                formDataData[values.fields[i]["key"]] = values.fields[i]["value"]
        //create the wished object
        let submitData = { name: values.name, data: formDataData }
        console.log(submitData);
        console.log("submit data..", submitData)
        let submitAndRedirect = async () => {
            setLoading(true)
            let res = await onSubmit(submitData, update, id)
            console.log(res)
            if (!res.id) {
                message.error(`Error: ${JSON.stringify(res)}`, 5);
                setLoading(false)
            }
            else {
                if(update)
                    message.success("Succefully updated object "+id, 5);
                else 
                    message.success("Succesfully added new object", 5)
                router.push(`/details/${res.id}`);
            }

        }
        submitAndRedirect()
        

    };

    //here I create a form with name field and dynamically rendered data fields since they are different
    return (
        <div>
            <Form
                initialValues={{ name: initialData.name, fields: initialFields }}
                variant="filled" onFinish={handleFinish}
                style={{ maxWidth: 600 }}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input the name!' }]}
                >
                    <Input />
                </Form.Item>
                <h2>Data</h2>
                <Form.List name="fields">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'key']}
                                        rules={[{ required: true, message: 'Missing field name' }]}
                                    >
                                        <Input placeholder="Field Name" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'value']}
                                        rules={[{ required: true, message: 'Missing field value' }]}
                                    >
                                        <Input placeholder="Field Value" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                    Add Field
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};