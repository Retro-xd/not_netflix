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
            {children}
          </div>
      </main>
    );
  }