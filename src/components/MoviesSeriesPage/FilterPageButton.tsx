import { PageBtnEnum } from "../../pages/TvSeriesPage";

interface IOwnProps{
	selectedBtn: string
	onClickPageBtn: (filter: string) => void
	PageBtnEnum: typeof PageBtnEnum
}

const FilterPageButton: React.FC<IOwnProps> = ({onClickPageBtn, selectedBtn, PageBtnEnum}) => {
  return (
    <div className="FilterPageButton">
      <div
        className={`PageButton ${selectedBtn === PageBtnEnum[0] ? "active" : ""}`}
        onClick={() => onClickPageBtn(PageBtnEnum[0])}
      >
        popular
      </div>
      <div
        className={`PageButton ${selectedBtn === PageBtnEnum[1] ? "active" : ""}`}
        onClick={() => onClickPageBtn(PageBtnEnum[1])}
      >
        top rated
      </div>
    </div>
  );
};

export default FilterPageButton;
