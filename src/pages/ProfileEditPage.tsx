import Header from "../components/Header/Header";
import ProfileHeader from "../components/Profile/ProfileHeader";
import Modal from "react-modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileEdit from "../components/Profile/ProfileEdit/ProfileEdit";

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/profile");
  };
  return (
    <>
      <Header />
      <ProfileHeader />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Avatar Modal"
        style={{
          content: { backgroundColor: "black" },
          overlay: { zIndex: "1000" },
        }}
      >
        <ProfileEdit closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default ProfileEditPage;
