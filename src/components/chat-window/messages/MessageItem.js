import React, { memo } from "react";
import ProfileAvatar from "../../ProfileAvatar";
import TimeAgo from "timeago-react";
import ProfileInfoBtnModal from "./ProfileInfoBtnModal";
import PresenceDot from "../../PresenceDot";
import { useCurrentRoom } from "../../../context/current-room.context";
import { auth } from "../../../misc/firebase";
import { Button } from "rsuite";
import { useHover, useMediaQuery } from "../../../misc/custom-hooks";
import IconBtnControl from "./IconBtnControl";

const MessageItem = ({ message, handleAdmin, handleLike }) => {
  const { author, createdAt, text, likes, likeCount } = message;

  const [selfRef, isHoverd] = useHover();

  const isMobile = useMediaQuery("(max-width: 992px)");

  const isAdmin = useCurrentRoom((v) => v.isAdmin);
  const admins = useCurrentRoom((v) => v.admins);

  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;

  const canShowIcons = isMobile || isHoverd;

  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);

  return (
    <li
      className={`padded mb-1 cursor-pointer ${isHoverd ? "bg-black-02" : ""} `}
      ref={selfRef}
    >
      <div className="d-flex align-items-center font-bolder mb-1">
        <PresenceDot uid={author.uid} />
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />
        {/* <span className="ml-2">{author.name}</span> */}
        <ProfileInfoBtnModal
          profile={author}
          appearance="link"
          className="p-0 ml-1 text-black"
        >
          {canGrantAdmin && (
            <Button block onClick={() => handleAdmin(author.uid)} color="blue">
              {isMsgAuthorAdmin
                ? "Remove admin permission"
                : "Give admin permission in this room"}
            </Button>
          )}
        </ProfileInfoBtnModal>
        <TimeAgo datetime={createdAt} className="ml-2" />
        <IconBtnControl
          {...(isLiked ? { color: "red" } : {})}
          isVisible={canShowIcons}
          iconName="heart"
          tooltip="Like the message"
          onClick={() => handleLike(message.id)}
          badgeContent={likeCount}
        />
      </div>
      <span className="word-break-all">{text}</span>
      <div></div>
    </li>
  );
};

export default memo(MessageItem);
