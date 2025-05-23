'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { DataTable } from '@/components/sections/table'
import { columns } from '@/components/sections/columns'

export interface FormResponse {
  name: string;
  email: string;
  age: number;
  phone: string;
  chapter: string;
  role: string;
  university_cycle: string;
  career: string;
  availability: string;
  linkedin_url: string;
  resume_url: string;
}

export default function DataTableWrapper() {
  const [data, setData] = useState<FormResponse[]>([])

  const fetchData = async () => {
    const { data, error } = await supabase.from('form_responses').select('*')
    if (!error) setData(data)
  }
  useEffect(() => {
    fetchData()
    const subscription = supabase
      .channel('realtime:form_responses')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'form_responses',
        },
        () => {
          fetchData()
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])
  return <DataTable columns={columns} data={data} />
}