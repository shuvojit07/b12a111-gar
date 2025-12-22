import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Garments Tracker</title>
    </Helmet>
  );
};

export default PageTitle;
