import useProtect from "../hooks/useProtect"
const Profile = () => {
  useProtect();
  return (
    <div>
      Profile Page
    </div>
  )
}

export default Profile
