import useRestaurantMenu from '../utils/useRestaurantMenu.js';
import RestaurantCategory from './RestaurantCategory.js';
import  Shimmer  from './Shimmer.js';
import { useParams } from "react-router-dom";
import {useState} from "react";


const RestaurantMenu = () => {
  const{resId}=useParams();
  const resInfo=useRestaurantMenu(resId);
  const[showIndex,setShowIndex]=useState(0)

  
      if (resInfo === null) {
        return <Shimmer />;
      }
    console.log(resInfo);  

  const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info;
  const  {itemCards}  =
  resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
  console.log(itemCards);
  console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  console.log(categories);
   
     
   

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(",")} - {costForTwoMessage}
      </p>
      {categories.map((category,index) => (
        <RestaurantCategory
          key={category?.card?.card.name}
          data={category?.card?.card}
          showItems={index === showIndex ? true:false}
          setShowIndex={()=>setShowIndex(index)}
        />
      ))}
      <h3>Menu</h3>
    </div>
  );
};

export default RestaurantMenu;
