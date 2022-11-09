import { BsMapFill, BsFillPuzzleFill } from "react-icons/bs";
import { BiLike, BiCog } from "react-icons/bi";
import TilesetCard from "../card/TilesetCard";
import Sidebar from "../sidebar/Sidebar";
// import MapCard from "../card/MapCard";
import { React, useState, useEffect } from "react";
import TSSCard from "../card/TSSCard";
import ProfileEditModal from "./ProfileEditModal";
import { Navigate, useLocation } from "react-router-dom";
// import { isRouteErrorResponse } from "react-router-dom";
import Axios from "axios";
const ProfileScreen = (props) => {
  const [modalOpen, setProfileModal] = useState(false);

  const user = props.user;
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  var [userTilesets, setUserTilesets] = useState([]);
  const [userPfp, setPfp] = useState(
    "https://maptilefiles.blob.core.windows.net/maptile-profile-images/" +
    user._id +
    "?=" +
    Math.random().toString().substring(2)
  );

  const updatePfp = (newImage) => {
    console.log(newImage);
    setPfp(newImage + "?=" + Math.random().toString().substring(2));
  };

  useEffect(() => {
    const getTilesets = async () => {
      setLoading(true);
      var response = await Axios.get(
        "https://maptile1.herokuapp.com/tileset/getUser/" + user._id
      );
      setUserTilesets(response.data.usertilesets);
      setLoading(false);
    };
    getTilesets();
  }, []);

  console.log(userTilesets);
  return user ? (
    <div>
      {!loading && (
        <div class="grid grid-cols-12 grid-rows-10 gap-4 ">
          <Sidebar setTheUser={props.setTheUser} />

          <div class="col-start-2 col-span-2 row-start-3 text-white text-center ">
            <div class="text-3xl mb-8 text-center"> {user.userName}</div>

            <img
              style={{ borderRadius: 400 / 4 }}
              class="w-full h-3/4 object-cover object-center border-2 border-maptile-green"
              src={userPfp}
              alt="blog"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                updatePfp(
                  "https://www.colorado.edu/today/sites/default/files/styles/medium/public/article-image/liu_s-photo.jpg?itok=l-mJPK65"
                );
              }}
            />
            <div className="bg-maptile-background-mid p2.5 rounded-xl w-full">
              <div class="mt-5 text-left ml-2">{user.bio}</div>
            </div>

            <button
              className="mt-5 flex flex-row p-2 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl"
              onClick={() => setProfileModal(true)}
            >
              <BiCog />
              <div className="ml-2 mt-[-4px]"> Settings </div>
            </button>
          </div>

          <div class="col-start-5 row-start-3 mt-20 text-6xl justify-self-center text-white">
            <BsMapFill />
            {user.maps.length} Maps
          </div>
          <div class="col-start-7 row-start-3 mt-20 text-6xl justify-self-center text-white">
            <BsFillPuzzleFill />
            {user.tilesets.length} Tilesets
          </div>
          <div class="col-start-9 row-start-3 mt-20 text-6xl justify-self-center text-white">
            <BiLike />
            {user.likes} Likes
          </div>

          <div class="mt-20 grid grid-cols-4 col-span-10 col-start-2 row-start-4 gap-5">
            {userTilesets.length !== 0 ?
              userTilesets.map((obj, index) => (
                <TilesetCard
                  tilename={obj.name}
                  description={obj.description}
                  owner={obj.owner}
                />
              )) : <div> No tilesets</div>
            }
          </div>

          <ProfileEditModal
            user={props.user}
            modalOpen={modalOpen}
            setProfileModal={setProfileModal}
            updateUser={props.setTheUser}
            updatePfp={updatePfp}
          />
        </div>
      )}
    </div>
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default ProfileScreen;
