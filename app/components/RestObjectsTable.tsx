import { useEffect, useContext } from 'react'
import { Button, Card, Popconfirm, Table, message } from 'antd'
import { useRouter } from 'next/navigation'
import { TypoLink } from './TypoLink'
import { fetchAllObjects } from '../api/fetch'
import { onDelete } from '../api/delete'
import { RestObject } from '../types'
import { LoadingContext } from '../context'

export function RestObjectsTable() {

  const router = useRouter()
  const { data, setData, isLoading, setLoading } = useContext(LoadingContext);



  useEffect(() => {
    if (!data)
      fetchAllObjects(setData, setLoading)
  }, [])

  const handleDelete = async (id: string) => {
    setLoading(true);
    const response = await onDelete(id);
    if (response.error)
      //here it's just a simulation since it's not possible to delete any data provided
      message.error(`Failed to delete item ${JSON.stringify(response)}`, 5);
    setLoading(false)
  };


  //specifications of the table for the fetched data...
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Edit',
      dataIndex: 'operation',
      render: (_: any, record: RestObject) => {
        return (
          <TypoLink content={"Edit"} onClickfun={() => router.push(`edit/${record.id}`)}></TypoLink>
        );
      },
    },
    {
      title: 'Delete',
      dataIndex: 'operation',
      render: (_: any, record: RestObject) =>
        data!.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() =>
            handleDelete(record.id!)
          }>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
    {
      title: 'Detials',
      dataIndex: 'operation',
      render: (_: any, record: RestObject) => {
        return (
          <TypoLink content={"Details"} onClickfun={() => router.push(`details/${record.id}`)}></TypoLink>
        );
      }
    }
  ];

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>


  const handleAdd = () => {
    router.push('/add_object');
  };

  return (
    <Card>
      <Button style={{ display: 'block', justifyContent: 'center',  marginBottom: 16 }} onClick={handleAdd} type="primary">
        Add an Object
      </Button>
      <Table dataSource={data} columns={columns} />
    </Card>
  )
}