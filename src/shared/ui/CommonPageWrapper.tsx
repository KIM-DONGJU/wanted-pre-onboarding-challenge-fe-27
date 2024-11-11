interface CommonPageWrapperProps {
  children: React.ReactNode;
}

export function CommonPageWrapper({ children }: CommonPageWrapperProps) {
  return (
    <div className="w-screen flex justify-center mt-10">
      <div className="flex flex-col w-full max-w-md">
        {children}
      </div>
    </div>
  )
}