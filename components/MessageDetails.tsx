import { useEffect } from "react";
import { Modal, Box, Typography } from "@mui/material";

interface MessageRatingProps {
  messageDetails: Object;
  setMessageDetails: Function;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  cursor: "pointer",
};

const MessageDetails = ({
  messageDetails,
  setMessageDetails,
}: MessageRatingProps) => {
  const handleClose = () => {
    setMessageDetails({
      selected: "false",
      data: {
        message: null,
        likes: null,
        dislikes: null,
        date: null,
      },
    });
  };

  return (
    <Modal
      keepMounted
      open={messageDetails["selected"] === true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography>{messageDetails["data"]["message"]}</Typography>
        <Typography>Likes: {messageDetails["data"]["likes"]}</Typography>
        <Typography>Dislikes: {messageDetails["data"]["dislikes"]}</Typography>
        <Typography>Date: {messageDetails["data"]["date"]}</Typography>
      </Box>
    </Modal>
  );
};

export default MessageDetails;
