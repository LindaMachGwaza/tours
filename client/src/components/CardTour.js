//import components
import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeTour } from "../redux/features/tourSlice";

//Function to display the tours. They will be displayed in a card format layout
//Used MDB ui to style the components
const CardTour = ({
  imageFile,
  description,
  title,
  tags,
  _id,
  name,
  likes,
}) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.result?._id || user?.result?.googleId;

  const dispatch = useDispatch();
  //Display first 45 characters of the tour description then allow user to click option to see more for further info
  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + " ...";
    }
    return str;
  };
//Function to allow user to like the tours and update number of likes in db and ui as well
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
        {/*SHow number of users who like a specific tour when mouse is hovered on the button if likes are more than 2 */}
          <MDBIcon fas icon="thumbs-up" />
          &nbsp;
          {likes.length > 2 ? (
            <MDBTooltip
              tag="a"
              title={`You and ${likes.length - 1} other people like`}
            >
              {likes.length} Likes
              {/*Show that current logged in user has already liked a tour */}
            </MDBTooltip>
          ) : (
            `${likes.length} Like${likes.length > 1 ? "s" : ""}`
          )}
        </>
      ) : (
        <>
        {/*User can only like a tour once */}
          <MDBIcon far icon="thumbs-up" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon="thumbs-up" />
        &nbsp;Like
      </>
    );
  };
//On click of the tumbs up icon the likes increase and update
  const handleLike = () => {
    dispatch(likeTour({ _id }));
  };

  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        {/*return and show the tours with the name of the poster or owner shown on the top left */}
        {/*Only a logged in user can like a tour. Inform user to login if not */}
        <div className="top-left">{name}</div>
        <div>
        <span className="text-start tag-card">
          {tags.map((tag) => (
            <Link to={`/tours/tag/${tag}`}> #{tag}</Link>
          ))}
          <MDBBtn
            style={{ float: "right" }}
            tag="a"
            color="none"
            onClick={!user?.result ? null : handleLike}
          >
            {!user?.result ? (
              <MDBTooltip title="Please login to like tour" tag="a">
                <Likes />
              </MDBTooltip>
            ) : (
              <Likes />
            )}
          </MDBBtn>
        </span>
        </div>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(description)}
            <Link to={`/tour/${_id}`}>...Read More</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardTour;

//Sources used include HyperionDev notes, previous tasks, Google, Stackoverflow, Github, YouTube and Google console
