'use client';

import { useState, useEffect } from 'react'
import { RestObject } from '../../types';
import { DynamicForm } from '../../components/DynamicForm';
import { onSubmit } from '../../api/submit';
import { Card, Typography } from 'antd';

export default function Page({ params }: Record<string, Record<string, string>>) {

  const [isLoading, setLoading] = useState<boolean>(true)
  const [rObject, setRObject] = useState<RestObject | null>(null)

  useEffect(() => {
    fetch(`https://api.restful-api.dev/objects/${params.slug}`)
      .then(response => response.json())
      .then(data => {
        setRObject(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>

  let sLoading = (b: boolean) => setLoading(b);

  return (
      <Card
        title={<Typography style={{ marginBottom: 0 }}>Edit {rObject!.name}</Typography>}
        bordered={false}
        style={{ width: 400, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <DynamicForm initialData={rObject!} onSubmit={onSubmit} setLoading={sLoading} update={true} id={params.slug} />
      </Card>
  );
}