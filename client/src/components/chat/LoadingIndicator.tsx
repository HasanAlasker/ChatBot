import { RandomPhrase } from "@/constants/loadingPhrases";
import { BeatLoader } from "react-spinners";

export default function LoadingIndicator() {
  return (
    <div className="flex gap-2 items-center mt-5 loadingMsg">
      {RandomPhrase()} <BeatLoader size={7} />
    </div>
  );
}
