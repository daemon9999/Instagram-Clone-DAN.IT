import { useSelector } from "react-redux";
import { RootState } from "src/store";


export const useAddPost = () => useSelector((state: RootState) => state.addPost)