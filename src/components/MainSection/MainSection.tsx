interface IOwnProps {
  children: React.ReactNode;
}

const MainSection: React.FC<IOwnProps> = ({ children }) => {
  return <div className="MainSection_Container">{children}</div>;
};

export default MainSection;
