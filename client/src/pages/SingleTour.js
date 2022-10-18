//import components
import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { getRelatedTours, getTour } from "../redux/features/tourSlice";
import RelatedTours from "../components/RelatedTours";
//import DisqusThread from "../components/DisqusThread";

//Function to display a single tour and it's details
// Used MDB ui to style the components
const SingleTour = () => {
  const dispatch = useDispatch();
  const { tour, relatedTours } = useSelector((state) => ({ ...state.tour }));
  const { id } = useParams();
  const navigate = useNavigate();
  const tags = tour?.tags;

  //Show related tours
  useEffect(() => {
    tags && dispatch(getRelatedTours(tags));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  //Get a single tour that user selects
  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      <MDBContainer>
        <MDBCard className="mb-3 mt-2">
          <MDBCardImage
            position="top"
            style={{ width: "100%", maxHeight: "600px" }}
            src={tour.imageFile}
            alt={tour.title}
          />
          <MDBCardBody>
            <MDBBtn
              tag="a"
              color="none"
              style={{ float: "left", color: "#000" }}
              onClick={() => navigate("/")}
            >
              {/*On click of the arrow user is directed to previous page */}
              <MDBIcon
                fas
                size="lg"
                icon="long-arrow-alt-left"
                style={{ float: "left" }}
              />
            </MDBBtn>
            <h3>{tour.title}</h3>
            <span>
              <p className="text-start tourName">Created By: {tour.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {tour && tour.tags && tour.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
            {/*Display date when tour was created */}
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(tour.createdAt).fromNow()}
              </small>
            </MDBCardText>
            {/*Show tour description */}
            <MDBCardText className="lead mb-0 text-start">
              {tour.description}
            </MDBCardText>
          </MDBCardBody>
          {/*Show tours with the same tags */}
          <RelatedTours relatedTours={relatedTours} tourId={id} />
        </MDBCard>
        {/*Used disqus to allow users to comment on a post */}
        {/*<DisqusThread id={id}  path={`/tour/${id}`}/> */}
      </MDBContainer>
    </>
  );
};

export default SingleTour;

//Sources used include HyperionDev notes, previous tasks, Google, Stackoverflow, Github, YouTube and Google console

