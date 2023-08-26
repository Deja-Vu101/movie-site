import { MdExpandMore } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface IOwnProps {
  name: string;
  content: string;
  created_at: string;
  idUser: string;
  idReview: string;
}

const ReviewItem: React.FC<IOwnProps> = ({
  content,
  created_at,
  name,
  idReview,
  idUser,
}) => {
  const { id } = useTypedSelector((state) => state.user);
  return (
    <>
      <div className="Reviews_Wrapper">
        <div className="Reviews_AuthorImg">
          {name?.toLowerCase()?.slice(0, 1)}
        </div>
        <div className="Reviews_Body">
          <div className="Reviews_Name">{name}</div>
          <div className="Reviews_Date">{created_at}</div>
          <div className="Reviews_Flex">
            <div className="Reviews_Content">
              {content?.length > 260 ? (
                <span>
                  {content?.slice(0, 260)}...{" "}
                  <span className="Reviews_LoadMore">
                    <MdExpandMore />
                  </span>
                </span>
              ) : (
                content
              )}
              {idUser === id ? (
                <div className="Reviews_Buttons">
                  <div className="Button_Delete">
                    <span>
                      <AiFillDelete />
                    </span>
                    Delete
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewItem;
