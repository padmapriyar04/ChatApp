"use client"
import { CalculateAge } from '@/lib/utils'
import { Card, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { Member } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

type Props = {
    member : Member
}

export default function MemberCard({member} : Props) {
  return (
    <div>
      <Card fullWidth isPressable as={Link} href={`/members/${member.userId}`} >
        <Image isZoomed alt={member.name} width={400} src={member.image || '/images/user.png'} className='aspect-square object-cover'/>
        <CardFooter className='flex justify-start text-white bg-black overflow-hidden absolute bottom-0 z-10 bg-dark-gradient'>
            <div className='flex flex-col'>
                <span className='font-semibold'>{member.name},{' '}{CalculateAge(member.dateofBirth)}</span>
                <span className='font-semibold'>{member.city}</span>
            </div>
        </CardFooter>
      </Card>
    </div>
  )
}
