import RestaurantCard from "./RestaurantCard";
import { useEffect, useState, useContext } from "react";
import Shimmer from "./Shimmer";
//import restaurantList from "../utils/mockData"
import Header from "./Header";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
const Body = () => {
  const [listofRestaurants, setListofRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    console.log("use effect is called");
    
  });
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&collection=83667"
    );
    const json = await data.json();

    setListofRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return (
      <>
        <h1>I Think You Are Offline!!!</h1>
        <h2>Please Check Your Internet Connection</h2>
      </>
    );

    const{loggedInUser,setUserName}=useContext(UserContext);

  if (listofRestaurants?.length === 0) {
    return <Shimmer />;
  }
  return (
    <div className="body">
      <div className="filter flex items-center">
        <div className="Sear">
          <input
            type="text"
            className="ml-8 border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />

          <button
            className="px-4 py-1 bg-green-500 m-4 rounded-2xl"
            onClick={() => {
              console.log(searchText);
              console.log(listofRestaurants);
              const filteredRestaurant = listofRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div>
          <button
            className="m-12 px-4 py-1 bg-gray-300"
            onClick={() => {
              const filteredlist = listofRestaurants.filter(
                (res) => res.info.avgRating > 4
              );
              setFilteredRestaurant(filteredlist);
              console.log(listofRestaurants);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div>
          <label>UserName : </label>
          <input
           value={loggedInUser}
           className="border border-black p-2" onChange={
            (e)=>setUserName(e.target.value)
            }/>
        </div>
      </div>
      <div className="restaurant-list flex flex-wrap">
        {filteredRestaurant.map((restaurant) => {
          return (
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
            >
              <RestaurantCard resData={restaurant} />)
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Body;
