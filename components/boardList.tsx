import SearchUi from "./searchUi";
import FavUi from "./favUi";
import BoardUi from "./boardUi";

interface BoardListProps {
  query: {
    search?: string;
    favorites?: string;
  };
}
const BoardList = ({ query }: BoardListProps) => {
  const data: any[] = [];
  if (!data.length && query.search) return <div><SearchUi /></div>;
  if (!data.length && query.favorites) return <div><FavUi /></div>;
  if (!data.length) return <div><BoardUi /></div>;

  return <div>{JSON.stringify(data)}</div>; 
};

export default BoardList;

