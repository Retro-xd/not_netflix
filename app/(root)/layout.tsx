import Sidebar from "@/components/Sidebar";

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="flex h-screen w-full" style={{fontFamily: 'Ubuntu, sans-serif'}}>
          <Sidebar />
  
          <div className="flex flex-col size-full">
            <div className="root-layout">
              {/* <Image src='/icons/logo.svg' width={30} height={30} alt="menu icon" /> */}
              <div>
                {/* <MobileNav user={loggedIn} /> */}
              </div>
            </div>
            {children}
          </div>
      </main>
    );
  }