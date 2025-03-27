import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function useProtect() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (!currentUser) {
      navigate("/sign-in");
    }
  }, []);

  return currentUser;
}
