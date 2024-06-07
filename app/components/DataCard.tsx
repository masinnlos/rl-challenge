import { Card, Popconfirm, Descriptions, Typography, message } from 'antd';
import { useRouter } from 'next/navigation'
import { onDelete } from '../api/delete';
import { TypoLink } from './TypoLink';
import { useState } from 'react';

export function DataCard({ data }: Record<string, any>) {
  console.log("Display data:", data)
  const router = useRouter()
  const [isLoading, setLoading] = useState<boolean>(true)

  const handleDelete = async (id: string) => {
    setLoading(true);
    const response = await onDelete(id);
    if (response.error) {
      message.error(`Failed to delete item ${JSON.stringify(response)}`, 3);
    }
    else {
      message.success("Succefully deleted object", 3);

    }
    router.push("../")
  };


  //also dynamically render data fields here
  return (
    <Card
      title={<Typography style={{ marginBottom: 0 }}>{data.name}</Typography>}
      bordered={false}
      style={{ width: 400, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
    >
      <Descriptions title="Object Details" column={1} layout="vertical" bordered>
        <Descriptions.Item label="ID">{data.id}</Descriptions.Item>
        {Object.keys(data.data).map((key) => (
          <Descriptions.Item key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
            {data.data[key]}
          </Descriptions.Item>
        ))}
        <div>
          <TypoLink content={"Edit"} onClickfun={() => router.push(`../edit/${data.id}`)} />
        </div>
        <div>
          <Popconfirm title="Sure to delete?" onConfirm={() =>
            handleDelete(data.id)
          }>
            <a>Delete</a>
          </Popconfirm>
        </div>
      </Descriptions>
    </Card>
  );
}