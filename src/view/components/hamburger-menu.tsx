import * as React from 'react'
import { Menu, Save, Upload, Settings, HelpCircle, Trash2 } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/view/components/shadcn/dropdown-menu'

export function HamburgerMenuComponent() {
  const handleClearCompleted = () => {
    // TODO: Implement clear completed action
    console.log('Clear completed action triggered')
  }

  const handleSettings = () => {
    console.log('Settings action triggered')
    // TODO: Implement settings dialog
  }

  const handleHelp = () => {
    console.log('Help action triggered')
    // TODO: Implement help dialog
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <Menu className="h-4 w-4" />
        <span className="sr-only">Open menu</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={handleClearCompleted} className="text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Clear Completed</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-200" />
        <DropdownMenuItem onClick={handleSettings} className="text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleHelp} className="text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}