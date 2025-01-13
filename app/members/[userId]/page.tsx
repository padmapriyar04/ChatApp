import { getMemberById } from '@/actions/memberActions'
import { notFound } from 'next/navigation';
import React from 'react'

export default async function MemberPage({params} : {params : {userId : string}}) {

    const {userId} = await params;
    const memberdetails = await getMemberById(userId);
    if(!memberdetails){
        return notFound();
    }

  return (
    <div>
      {memberdetails.name}
    </div>
  )
}
