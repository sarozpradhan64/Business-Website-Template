import AdminLayout from '@/Layouts/AdminLayout'
import React from 'react'

export default function Index() {
  return (
    <AdminLayout title={'Dashboard'} activeTitle={'dashboard'}>
    <div className='text-3xl'>Admin Page</div>
    </AdminLayout>
  )
}
