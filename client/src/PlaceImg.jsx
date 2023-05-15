export default function PlaceImg ({place, index=0,className=null}) {
    if(!place.photos?.length){
        return "";
    }
    if (!className) {
        className = "object-cover border border-gray-300 rounded-xl";
    }
    return(
            <img
              className={className}
              src={"http://localhost:4000/uploads/" + place.photos[0]}
              alt=""
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
        
    )
}