import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicketsAsync } from "../../redux/tickets/ticketsSlice";
import Navbar from "../everyWhere/Navbar";
import SearchMenu from "./SearchMenu";
import Company from "./Company";
import Loading from "../everyWhere/Loading";
function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTicketsAsync());
  }, [dispatch]);
  const data = useSelector((state) => state.tickets.loading);
  console.log(data);
  return (
    <div>
      <Navbar />
      {data === true ? (
        <Loading />
      ) : (
        <div>
          <SearchMenu />
          <Company />
        </div>
      )}
    </div>
  );
}

export default Home;
