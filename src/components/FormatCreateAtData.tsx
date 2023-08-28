interface IOwnProps {
  created_at: string | number;
}

const ReviewsDateCreate: React.FC<IOwnProps> = ({ created_at }) => {
  function formatReadableDate(created_at: string | number) {
    if (typeof created_at === "string") {
      return new Date(created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (typeof created_at === "number") {
      return new Date(created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return null;
    }
  }
  return <div>{formatReadableDate(created_at)}</div>;
};

export default ReviewsDateCreate;
