import { useState } from "react";

const useClickState = () => {
    const [imageClicked, setImageClicked] = useState(false);
    const [textClicked, setTextClicked] = useState(true);
    const [pollClicked, setPollClicked] = useState(false);
    const [linkClicked, setLinkClicked] = useState(false);
    const [questionClicked, setQuestionClicked] = useState(false);

    const toggleTextClick = () => {
        setImageClicked(false);
        setTextClicked(true);
        setPollClicked(false);
        setLinkClicked(false);
        setQuestionClicked(false);
      };
      const toggleImageClick = () => {
        setImageClicked(true);
        setTextClicked(false);
        setPollClicked(false);
        setLinkClicked(false);
        setQuestionClicked(false);
      };
      const togglePollClick = () => {
        setImageClicked(false);
        setTextClicked(false);
        setPollClicked(true);
        setLinkClicked(false);
        setQuestionClicked(false);
      };
      const toggleQuestionClick = () => {
        setImageClicked(false);
        setTextClicked(false);
        setPollClicked(false);
        setLinkClicked(false);
        setQuestionClicked(true);
      };
      const toggleLinkClick = () => {
        setImageClicked(false);
        setTextClicked(false);
        setPollClicked(false);
        setLinkClicked(true);
        setQuestionClicked(false);
      };

    return {
        toggleLinkClick,
        togglePollClick,
        toggleImageClick,
        toggleQuestionClick,
        toggleTextClick,
        imageClicked,
        pollClicked,
        questionClicked,
        linkClicked,
        textClicked
    };
};

export default useClickState ;