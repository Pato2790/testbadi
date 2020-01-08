import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { defaultTheme } from './themes/defaultTheme';
import { BookSeatManager } from './components/BookSeatManager/BookSeatManager';
import { Navbar } from './components/Navbar/Navbar';
import { Sidebar } from './components/Sidebar/Sidebar';

const App: React.FC = () => {
  const [sidebarStatus, setSidebarStatus] = useState<boolean>(false);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar setOpenSidebar={() => setSidebarStatus(!sidebarStatus)} />
      <Sidebar
        openSidebar={sidebarStatus}
        setOpenSidebar={setSidebarStatus}
      />
      <BookSeatManager />
    </ThemeProvider>
  );
};

export default App;
