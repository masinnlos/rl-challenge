'use client';


import { useState, useEffect } from 'react'
import { DataCard } from '../../components/DataCard';
import { RestObject } from '../../types';

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

  return (
    <DataCard data={rObject}></DataCard>
  );
}