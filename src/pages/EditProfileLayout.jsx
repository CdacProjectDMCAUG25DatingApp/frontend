import Sidebar from "../Components/Sidebar";
import { useSelector } from "react-redux";
import { ProfileView } from "./ProfileView";

const EditProfileLayout = () => {
  const userDetails = useSelector((s) => s.userDetails.data);
  const photos = useSelector((s) => s.photos.data);
  const detailsReady = userDetails && Object.keys(userDetails).length > 0;
  const photosReady = photos && photos.length > 0;

  if (!detailsReady || !photosReady) {
    return (
      <div className="p-5 text-light fs-4">
        Loading profile…
      </div>
    );
  }

  return (
    <div className="d-flex" style={{ height: "100vh", width: "100%" }}>
      <Sidebar />

      <div className="flex-grow-1 overflow-auto p-4">
        <ProfileView
          editable={true}
          dataObj={userDetails}
          photos={photos}
        />
      </div>
    </div>
  );
};

export default EditProfileLayout;
