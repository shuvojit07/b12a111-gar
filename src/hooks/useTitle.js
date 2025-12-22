import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Garments Tracker`;
  }, [title]);
};

export default useTitle;
