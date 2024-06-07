'use client';

import { onSubmit } from '../api/submit';
import { DynamicForm } from '../components/DynamicForm';
import { RestObject } from '../types';
import { useState } from 'react'
import { Card, Typography } from 'antd'

export default function Page() {

  const [isLoading, setLoading] = useState(false)
  const sLoading = (b: boolean) => setLoading(b);

  if (isLoading) return <p>Loading...</p>

  return (
    <Card
      title={<Typography style={{ marginBottom: 0 }}>Add new Object</Typography>}
      bordered={false}
      style={{ width: 400, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
    >
      <DynamicForm initialData={{} as RestObject} onSubmit={onSubmit} setLoading={sLoading} update={false} id={""} />
    </Card>
  )
}