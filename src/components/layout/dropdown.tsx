import React, { HTMLAttributes, ReactNode } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'

interface DropdownProps {
    icon: ReactNode,
    children?: ReactNode,
    props?: HTMLAttributes<HTMLDivElement>
}

export const CustomDropdown = ({icon, children, ...props}: DropdownProps) => {
  return (  
    <> 
    <DropdownMenu>
        <DropdownMenuTrigger className='outline-none'>{icon}</DropdownMenuTrigger>
        <DropdownMenuContent>
            {children}
        </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}
