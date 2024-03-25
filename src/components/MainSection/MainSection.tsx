import "./mainSection.scss";

interface IOwnProps {
  children: React.ReactNode;
}

const MainSection: React.FC<IOwnProps> = ({ children }) => {
  return (
    <div className="MainSection">
      <div className="MainSection_Container">{children}</div>
    </div>
  );
};

export default MainSection;
