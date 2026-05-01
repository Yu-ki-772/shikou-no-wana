type Props = {
  children: React.ReactNode;
  className?: string;
};

const ScreenLayout = ({ children, className = "py-12" }: Props) => (
  <div className={`flex flex-col min-h-screen ${className} px-8`}>
    {children}
  </div>
);

export default ScreenLayout;