import { FirebaseError } from "firebase/app";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collections, storage } from "@/lib/firebase";
import { useToast } from "@chakra-ui/react";

function useUpdateProfile(uid: string, url: string) {
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState<string | File>(url);
  const navigate = useNavigate();
  const toast = useToast();

  const updateProfile = async (username: string, bio: string) => {
    setLoading(true);
    try {
      let avatar;
      if (file instanceof File) {
        // save file to firebase storage
        const fileRef = ref(storage, "avatars/" + uid);
        await uploadBytes(fileRef, file);
        avatar = await getDownloadURL(fileRef);
      } else {
        avatar = file;
      }

      // update user details
      await updateDoc(doc(collections.user, uid), { avatar, username, bio });

      toast({
        title: "Profile updated successfully",
        status: "success",
      });

      // reload page
      navigate(0);
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast({
          title: "Failed to update profile",
          status: "error",
          description: error.code,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile,
    setFile,
    isLoading,
    fileURL: typeof file === "string" ? file : URL.createObjectURL(file),
  };
}

export default useUpdateProfile;
