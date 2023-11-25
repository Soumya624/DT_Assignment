import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Background from "./Images/background.png";

function Home() {
  const [comicText, setComicText] = useState(Array(10).fill(""));
  const [comicPanels, setComicPanels] = useState(Array(10).fill(null));

  const API_URL =
    "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";
  const API_KEY =
    "VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM";

  const handleTextChange = (index, value) => {
    const newText = [...comicText];
    newText[index] = value;
    setComicText(newText);
  };

  const generateComic = async () => {
    try {
      const images = await Promise.all(
        comicText.map((text) =>
          queryAPI({
            inputs: text,
          })
        )
      );

      setComicPanels(images);
    } catch (error) {
      console.error(error);
    }
  };

  const queryAPI = async (payload) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Accept: "image/png",
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const imageBlob = await response.blob();
      return URL.createObjectURL(imageBlob);
    } catch (error) {
      throw error;
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div style={{ fontFamily: "verdana" }}>
      <Navbar className="my-2" dark style={{ margin: "0" }}>
        <NavbarBrand href="/">
          <img
            alt="logo"
            src="dashtoon_i2.png"
            style={{
              height: 40,
              width: 40,
            }}
          />
          &nbsp;&nbsp;<b>Dashtoon</b>
        </NavbarBrand>
      </Navbar>
      <Row style={{ padding: "3% 5%", alignItems: "center" }}>
        <Col md={6} style={{ color: "white", padding: "10%" }}>
          <h1 style={{ fontWeight: "bold", textAlign: "left" }}>
            The World's Best Comics Have a New Home
          </h1>
          <br />
          <p style={{ color: "white", textAlign: "left", fontSize: "12px" }}>
            No more waiting for weeks, daily new episodes
          </p>
        </Col>
        <Col md={6}>
          <img
            src="dashtoon_i1.png"
            style={{ width: "75%" }}
            alt="Comic Image"
          />
        </Col>
      </Row>
      <Row
        style={{
          marginTop: "9%",
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <Col md={7} style={{ padding: "0% 6% 1% 6%" }}>
          <center>
            <br />
            <h3 style={{ margin: "3% 0%" }}>Text to Comics</h3>
            <p style={{ textAlign: "justify", fontSize: "12px" }}>
              You're just a click away from creating the next big sensation like
              Naruto, One Piece, or Pokemon. Simply input the details and click
              to generate a ten-panel comic strip!
            </p>
          </center>
          <br />
          <Form>
            <Row>
              {comicText.map((text, index) => (
                <Col key={index} md={6}>
                  <FormGroup>
                    <Input
                      placeholder={`Enter Text for Panel ${index + 1}`}
                      name={`comicText${index}`}
                      id={`comicText${index}`}
                      value={text}
                      onChange={(e) => handleTextChange(index, e.target.value)}
                      style={{
                        borderRadius: "7px",
                        height: "45px",
                        fontSize: "13px",
                      }}
                    />
                  </FormGroup>
                </Col>
              ))}
            </Row>
            <br />
            <Button
              color="dark"
              outline
              onClick={generateComic}
              style={{
                borderRadius: "20px",
                width: "50%",
                fontSize: "12px",
                marginBottom: "8px",
              }}
            >
              Generate Comics
            </Button>
          </Form>
        </Col>
        <Col
          md={5}
          style={{
            position: "relative",
            overflow: "hidden",
            height: "100%",
            margin: "0",
            padding: "0",
          }}
        >
          <img
            src={Background}
            alt="Background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "grayscale(80%)",
              margin: "0",
              padding: "0",
              display: "block",
            }}
          />
        </Col>
      </Row>
      <Row style={{ padding: "4%" }}>
        {comicPanels.some((panel) => panel !== null) && (
          <div>
            <br />
            <br />
            <h4 style={{ color: "white", fontWeight: "bold" }}>
              Generated Comics
            </h4>
            <p
              style={{
                fontSize: "12px",
                textAlign: "justify",
                color: "white",
                textAlign: "center",
              }}
            >
              Sit back, relax and let our comics transport you to a universe of
              boundless discovery
            </p>
            <br />
            <br />
            <Slider {...settings}>
              {comicPanels.map((panel, index) => (
                <div key={index}>
                  <img
                    src={panel}
                    alt={`Panel ${index + 1}`}
                    style={{ width: "100%", filter: "grayscale(50%)" }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </Row>
      <br />
      <br />
      <br />
      <center>
        <h4 style={{ color: "white" }}>
          'In comic strips, the person on the left always speaks first'
        </h4>
        <p style={{ fontStyle: "italic", color: "lightgray" }}>George Carlin</p>
      </center>
      <br />
      <br />
      <br />
      <Row
        style={{
          padding: "1%",
          fontSize: "12px",
          backgroundColor: "white",
          borderTop: "0.3px solid white",
        }}
      >
        <center>© 2023 Soumya Tarafder. All right reserved</center>
      </Row>
    </div>
  );
}

export default Home;