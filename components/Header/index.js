import React from 'react'
import AuthUser from '../../hooks/authUser'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Navigation from './navigation'

import { SignOut } from '../../hooks/authUser'
import Link from 'next/link'

export default function Header() {
  return (
    <Disclosure as="nav" className="border-b py-5">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {Navigation.length != 0 &&
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset ">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                }
              </div>
              <div className="flex-1 flex items-center sm:items-stretch sm:justify-start justify-center">
                <div className="flex-shrink-0 flex items-center font-semibold text-xl">
                  <a href="/">Infinite Calculus</a>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {Navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={'px-3 rounded-md font-medium'}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/** notifications */}

                {AuthUser() ?
                  <span className="cursor-pointer" onClick={() => SignOut()}>Sign out</span> :
                  <span><Link href="/auth">Sign in</Link></span>
                }
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {Navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={'block px-3 rounded-md text-base font-medium'}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )
      }
    </Disclosure >
  )
}
