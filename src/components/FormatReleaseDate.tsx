import React from "react";

interface IOwnProps {
  release: string | number;
}

const FormatReleaseDate: React.FC<IOwnProps> = ({ release }) => {
  const formatDate = (release: string | number) => {
    const options = { year: "numeric", month: "long" } as const;
    const date = new Date(release);
    return date.toLocaleDateString("en-US", options);
  };
  return <div>{formatDate(release ? release : "")}</div>;
};

export default FormatReleaseDate;
