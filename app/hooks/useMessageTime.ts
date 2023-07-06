import { useEffect, useState } from "react";
import { format } from "date-fns";

export const useMessageTime = (createdAt: Date | string) => {
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    if (createdAt) {
      const formatted = format(new Date(createdAt), "p");
      setFormattedTime(formatted);
    }
  }, [createdAt]);

  return formattedTime;
};
export default useMessageTime;
