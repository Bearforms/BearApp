'use client';

import { cn } from '@/lib/utils';
import {
  FileText,
  GalleryVerticalEnd,
  Trash2,
  Settings,
  HelpCircle,
  ChevronDown,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarStore } from '@/stores/sidebar-store';
import { WorkspaceDropdown } from '../workspaces/workspace-dropdown';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mainNavigation = [
  {
    name: 'Forms',
    icon: FileText,
    href: '/',
  },
  {
    name: 'Templates',
    icon: GalleryVerticalEnd,
    href: '/templates',
  },
  {
    name: 'Trash',
    icon: Trash2,
    href: '/deleted',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggleSidebar } = useSidebarStore();

  return (
    <div
      className={cn(
        'flex flex-col bg-white overflow-hidden transition-[width] duration-300 ease-in-out border-r border-neutral-200',
        isOpen ? 'w-64' : 'w-14'
      )}
    >
      <div
        className={cn(
          'py-1.5 transition-[padding] duration-300 ease-in-out',
          isOpen ? 'px-2' : 'px-0'
        )}
      >
        <Link href="/" className="rounded-md">
          <div
            className={cn(
              'px-2 h-10 flex items-center',
              !isOpen && 'justify-center'
            )}
          >
            <div className={cn(isOpen && 'mr-2')}>
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="26" height="26" rx="13" fill="black" />
                <path
                  d="M10.9252 17.0331C10.9252 17.0331 11.6168 18.1308 13 18.1308C14.3832 18.1308 15.0747 17.0331 15.0747 17.0331M19.616 14.8227C19.616 14.5915 19.6039 14.363 19.5801 14.1379C20.6447 13.5067 21.3571 12.3553 21.3571 11.0397C21.3571 9.04531 19.7202 7.42856 17.7009 7.42856C16.6362 7.42856 15.6778 7.87799 15.0096 8.59525C14.3758 8.39592 13.7006 8.28835 13 8.28835C12.2993 8.28835 11.6241 8.39592 10.9903 8.59525C10.3221 7.87799 9.36373 7.42856 8.29907 7.42856C6.27978 7.42856 4.64282 9.04531 4.64282 11.0397C4.64282 12.3553 5.35521 13.5067 6.41979 14.1379C6.39606 14.363 6.38389 14.5915 6.38389 14.8227C6.38389 16.6151 7.11457 18.2389 8.29778 19.4195C9.49689 20.6159 11.1608 21.3571 13 21.3571C14.8391 21.3571 16.503 20.6159 17.7022 19.4195C18.8854 18.2389 19.616 16.6151 19.616 14.8227Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              className={cn(
                'transition-all duration-300 ease-in-out font-medium text-base',
                isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
              )}
            >
              Bearforms
            </span>
          </div>
        </Link>
      </div>

      <div className="px-2 mt-3">
        <WorkspaceDropdown />
      </div>

      <nav className="flex-1 px-2 mt-5">
        <div className="flex flex-col space-y-1">
          {mainNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex justify-center items-center rounded-md w-full text-sm font-normal h-10 transition-all duration-300 ease-in-out',
                isOpen ? 'justify-start px-3' : 'w-10 p-0',
                pathname === item.href
                  ? 'bg-neutral-100'
                  : 'hover:bg-neutral-50'
              )}
            >
              <item.icon
                className={cn(
                  'h-5 w-5 text-neutral-500 transition-all duration-300 ease-in-out',
                  isOpen && 'mr-2'
                )}
                strokeWidth={2}
              />
              <span
                className={cn(
                  'transition-all duration-300 ease-in-out',
                  isOpen
                    ? 'opacity-100 w-auto'
                    : 'opacity-0 w-0 overflow-hidden'
                )}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="px-2 mb-2">
        <div className="flex flex-col space-y-1">
          <Link
            href="/settings"
            className={cn(
              'flex justify-center items-center rounded-md w-full text-sm font-normal h-10 transition-all duration-300 ease-in-out',
              isOpen ? 'justify-start px-3' : 'w-10 p-0',
              pathname === '/settings'
                ? 'bg-neutral-100'
                : 'hover:bg-neutral-50'
            )}
          >
            <Settings
              className={cn(
                'h-5 w-5 text-neutral-500 transition-all duration-300 ease-in-out',
                isOpen && 'mr-2'
              )}
              strokeWidth={2}
            />
            <span
              className={cn(
                'transition-all duration-300 ease-in-out',
                isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
              )}
            >
              Settings
            </span>
          </Link>
          <Link
            href="/feedback"
            className={cn(
              'flex justify-center items-center rounded-md w-full text-sm font-normal h-10 transition-all duration-300 ease-in-out',
              isOpen ? 'justify-start px-3' : 'w-10 p-0',
              pathname === '/feedback'
                ? 'bg-neutral-100'
                : 'hover:bg-neutral-50'
            )}
          >
            <HelpCircle
              className={cn(
                'h-5 w-5 text-neutral-500 transition-all duration-300 ease-in-out',
                isOpen && 'mr-2'
              )}
              strokeWidth={2}
            />
            <span
              className={cn(
                'transition-all duration-300 ease-in-out',
                isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
              )}
            >
              Feedback
            </span>
          </Link>
        </div>
      </div>

      <div className="px-2 py-2 pb-4 border-t border-neutral-100">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'hover:bg-neutral-100 transition-all duration-300 ease-in-out h-10',
                isOpen ? 'w-full justify-start px-3' : 'w-10 p-0'
              )}
            >
              <Avatar
                className={cn(
                  'h-5 w-5 transition-all duration-300 ease-in-out',
                  !isOpen && 'mr-0',
                  isOpen && 'mr-2'
                )}
              >
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {isOpen && (
                <>
                  <span className="text-sm font-normal">John Doe</span>
                  <ChevronDown
                    className="ml-auto h-4 w-4 text-neutral-500"
                    strokeWidth={2}
                  />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut
                className="mr-2 h-4 w-4 text-neutral-500"
                strokeWidth={2}
              />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
