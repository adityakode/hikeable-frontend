import { useRouter } from "next/router";
import { useEffect, useRef, useState, forwardRef } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import Link from "next/link";
import Image from "next/image";
import { CldImage, CldUploadButton } from "next-cloudinary";
import axios from "axios";
import { Trail } from "../global";
import styles from "../styles/singletrail.module.css";
import { Likes } from "../components/Likes";
import { CompletedTrails } from "../components/CompletedTrails";
import { Weather } from "../components/Weather";
import { useAuthContext } from "../components/context/UseAuthContext";
import { TrailMap } from "../components";
import MessageForm from "../components/MessageForm";
import SingleProduct from "../components/photoGallery";
import PhotoGallery from "../components/photoGallery";
import Mountain2 from "../public/mountain_2.svg";
import { Box, Container } from "@mui/material";
import { Button } from "@mui/joy";
import { Typography } from "@mui/joy";
import { LocationOn, Straighten, Speed, CameraAlt } from "@mui/icons-material";
import { flexbox } from "@mui/system";

const _ = require("lodash");

const difficultyObj = {
  1: "Easy",
  2: "Moderate",
  3: "Hard",
};

type CurrentPositionObject = {
  latitude: number;
  longitude: number;
};

const SingleTrail = ({ imageLoader }) => {
  const router = useRouter();
  const [trail, setTrail] = useState<Trail | undefined>(undefined);
  const { user, userId } = useAuthContext();
  const [currentPosition, setCurrentPosition] = useState<
    CurrentPositionObject[]
  >([]);

  // const userNameTag =useRef(JSON.stringify(user?.displayName))
  const userNameTag = user?.displayName;
  const trailName = trail?.name;
  // console.log ("testId =",trailName)
  // const trailId =useRef(trail?.id)
  const trailId = trail?.id.toString();
  // console.log ("trail = ",trail, "trailId =",trailId)
  // console.log (userNameTag)

  useEffect(() => {
    if (router.query.trail !== undefined) {
      setTrail(JSON.parse(router.query.trail as string));
    } else {
      return;
    }
  }, []);

  return (
    trail && (
      <Container sx={{ mb: 5 }}>
        <Button
          variant="soft"
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>
        <BrowserView>
          <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ mb: 2 }}>
                <img
                  src={trail.photo_url}
                  alt={trail.name}
                  className={styles.img__wrapper}
                />
              </Box>
              <Container>
                <Button
                  variant="soft"
                  size="sm"
                  aria-label={"Upload photo for this trail"}
                  sx={{ fontWeight: 600, backgroundColor: "pink", mr: 1 }}
                  component="a"
                >
                  <CldUploadButton
                    className={styles.btn__cloudinary}
                    uploadPreset={
                      process.env.NEXT_PUBLIC_CLOUDINARY_UPPLOAD_PRESET
                    }
                    onUpload={function (error, result, widget) {
                      console.log(
                        "error =",
                        error,
                        "result =",
                        result,
                        "widget =",
                        widget
                      );
                    }}
                    options={{
                      folder: trail.name,
                      tags: [trail.id, userNameTag],
                    }}
                  />
                </Button>
                <Link
                  className={styles.card__link}
                  href={{
                    pathname: "/trailphotos",
                    query: {
                      id: trailId,
                      name: trailName,
                    },
                  }}
                  passHref
                >
                  <Button
                    variant="soft"
                    size="lg"
                    aria-label={`View ${trail.name} trail`}
                    sx={{ fontWeight: 600, backgroundColor: "pink" }}
                    component="a"
                  >
                    View all photos in this trail
                  </Button>
                </Link>
              </Container>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: "auto",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Mountain2 />
                <Typography sx={{ fontSize: "5vw", ml: 3 }}>
                  {trail.name}
                </Typography>
              </Box>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Typography
                  startDecorator={<LocationOn />}
                  sx={{ fontSize: "2.5vw" }}
                >
                  {_.capitalize(trail.prefecture)}
                </Typography>
                <Typography
                  startDecorator={<Straighten />}
                  sx={{ fontSize: "2.5vw" }}
                >
                  {`${Number(trail.length).toString()} km`}
                </Typography>
                <Typography
                  sx={{ fontSize: "2.5vw" }}
                  startDecorator={<Speed />}
                >
                  {difficultyObj[trail.difficulty]}
                </Typography>
              </Container>
              <Container
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Likes userID={userId} trailID={trail.id} />
                <CompletedTrails userID={userId} trailID={trail.id} />
              </Container>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          ></Box>
        </BrowserView>
        <MobileView>
          <div className={styles.container__top__mobile}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Mountain2 />
              <Typography sx={{ fontSize: "7vw", fontWeight: "600", ml: 3 }}>
                {trail.name}
              </Typography>
            </Box>

            <img
              src={trail.photo_url}
              alt={trail.name}
              className={styles.img__wrapper}
            />
            <Container sx={{ display: "flex", flexDirection: "column" }}>
              <Button
                variant="soft"
                size="sm"
                aria-label={"Upload photo for this trail"}
                sx={{ fontWeight: 600, backgroundColor: "pink", mr: 1 }}
                component="a"
              >
                <CldUploadButton
                  className={styles.btn__cloudinary}
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPPLOAD_PRESET
                  }
                  onUpload={function (error, result, widget) {
                    console.log(
                      "error =",
                      error,
                      "result =",
                      result,
                      "widget =",
                      widget
                    );
                  }}
                  options={{
                    folder: trail.name,
                    tags: [trail.id, userNameTag],
                  }}
                />
              </Button>
              <Link
                className={styles.card__link}
                href={{
                  pathname: "/trailphotos",
                  query: {
                    id: trailId,
                    name: trailName,
                  },
                }}
                passHref
              >
                <Button
                  variant="soft"
                  size="lg"
                  aria-label={`View ${trail.name} trail`}
                  sx={{ fontWeight: 600, backgroundColor: "pink" }}
                  component="a"
                >
                  View all photos in this trail
                </Button>
              </Link>
            </Container>
          </div>
          <Box
            sx={{
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ fontSize: "3vw" }}
              startDecorator={<LocationOn />}
            >
              {_.capitalize(trail.prefecture)}
            </Typography>
            <Typography
              sx={{ fontSize: "3vw" }}
              startDecorator={<Straighten />}
            >{`${Number(trail.length).toString()} km`}</Typography>
            <Typography startDecorator={<Speed />} sx={{ fontSize: "3vw" }}>
              {difficultyObj[trail.difficulty]}
            </Typography>
            <Likes userID={userId} trailID={trail.id} />
            <CompletedTrails userID={userId} trailID={trail.id} />
          </Box>
        </MobileView>
        <Weather lat={trail.latitude} lon={trail.longitude} name={trail.name} />

        <TrailMap
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition}
          lat={trail.latitude}
          lon={trail.longitude}
          trailID={trail.id}
        />
        <MessageForm
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition}
          userID={userId}
          trailID={trail.id}
        />

        <Box
          sx={{
            flexDirection: "column",
            width: "40%",
            border: "solid",
            borderRadius: "4px",
            m: 1,
            p: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>Tips for Trails</Typography>
            <Typography>Add Tips</Typography>
          </Box>
          <Box
            sx={{
              marginTop: "1",
              border: "solid",
              borderRadius: "4px",
            }}
          >
            <Typography>From Haruna</Typography>
            <Typography>
              Stone stairs, and very slippery while and after raining!
            </Typography>
          </Box>
        </Box>
      </Container>
    )
  );
};

export default SingleTrail;
