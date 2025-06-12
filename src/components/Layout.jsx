import React from 'react'
import ThemeToggle from './ThemeToggle';

const Layout = ({children}) => {
  return (
	<div className="bg-gray-200 dark:bg-black coffee:bg-orange-950 text-black dark:text-white coffee:text-orange-200">
		<div className="flex absolute">
	    	<ThemeToggle />
		</div>
		<div className="min-h-screen items-center justify-center">
		{children}
		</div>
	</div>
  )
}

export default Layout
