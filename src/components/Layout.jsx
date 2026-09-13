import ThemeToggle from './ThemeToggle';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="absolute">
        <ThemeToggle />
      </div>
      <div className="min-h-screen flex items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
