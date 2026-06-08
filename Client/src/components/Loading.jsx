import { ThreeDot } from "react-loading-indicators";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="text-center loading-overlay">
      <ThreeDot
        variant="bounce"
        color="#cc3131"
        size="small"
        text={message}
        textColor="#cc3131"
      />
    </div>
  );
};
export default Loading;
