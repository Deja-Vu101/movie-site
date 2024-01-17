import "./style.scss";

interface IOwnProps {
  errorText: string;
}

const InlineError: React.FC<IOwnProps> = ({ errorText }) =>
  errorText && <p className="Error_text">{errorText}</p>;

export default InlineError;
