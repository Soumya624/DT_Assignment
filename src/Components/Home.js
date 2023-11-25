import { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Navbar,
  NavbarBrand,
} from "reactstrap";
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

  return (
    <div>
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
          <p style={{ color: "white", textAlign: "left" }}>
            No more waiting for weeks, daily new episodes
          </p>
        </Col>
        <Col md={6}>
          <img src="dashtoon_i1.png" style={{ width: "75%" }} />
        </Col>
      </Row>
      <Row
        style={{
          marginTop: "12%",
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <Col md={7} style={{ padding: "0% 6% 1% 6%" }}>
          <center>
            <br />
            <h3 style={{ margin: "3% 0%" }}>Text to Comics</h3>
            <p style={{ textAlign: "justify", fontSize: "15px" }}>
              You're just a click away from creating the next big sensation like
              Naruto, One Piece or Pokemon. Simply input the details and click
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
                        borderRadius: "10px",
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
              style={{ borderRadius: "20px", width: "50%" }}
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
      <Row style={{ marginTop: "12%" }}></Row>
      {/*
      {comicPanels.some((panel) => panel !== null) && (
        <div>
          <h2>Generated Comic</h2>
          <Row>
            {comicPanels.map((panel, index) => (
              <Col key={index} md={6}>
                <img
                  src={panel}
                  alt={`Panel ${index + 1}`}
                  style={{ width: "100%" }}
                />
              </Col>
            ))}
          </Row>
        </div>
      )} */}
    </div>
  );
}

export default Home;
