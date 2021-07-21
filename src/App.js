import React, { Component } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Navbar,
  Container,
  Modal,
  Image,
} from "react-bootstrap";
import axios from "axios";
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "today",
      title: "Today",
      newsData: [],
      showFilterModal: false,
    };
  }

  componentDidMount = async () => {
    await this.getNews(this.state.type);
  };

  getNews = async (ntype) => {
    await axios
      .post("http://127.0.0.1:5000/getNews", { type: ntype })
      .then((response) => {
        console.log(response.data);
        this.setState({
          newsData: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setType = (ntype) => {
    this.setState(
      {
        type: ntype,
      },
      () => {
        this.getNews(this.state.type);
      }
    );
  };

  render() {
    return (
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Navbar expand="lg" variant="light" bg="dark">
              <Container>
                <Navbar.Brand href="http://localhost:3000/" style={{ color: "white" }}>
                  KOKRU Clone
                </Navbar.Brand>
              </Container>
            </Navbar>
          </Col>
        </Row>
        <br />
        <Row style={{ marginLeft: 50 }}>
          <Col xs={9} sm={9} md={9} lg={9}>
            <h3>{this.state.title} News</h3>
          </Col>
          <Col xs={1} sm={1} md={1} lg={1}></Col>
          <Col xs={1} sm={1} md={1} lg={1}></Col>
          <Col xs={1} sm={1} md={1} lg={1}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log("object");
                this.setState({
                  showFilterModal: true,
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="32"
                fill="currentColor"
                class="bi bi-filter-square"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M6 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
              </svg>
            </div>
          </Col>
        </Row>
        <br />
        {this.state.newsData.length > 0 ? (
          <>
            <Row style={{ marginLeft: 50 }}>
              {this.state.newsData.map((res, index) => {
                return (
                  <Col xs={12} sm={9} md={3} lg={3}>
                    <Card
                      style={{ width: "18rem", marginBottom: 50, height: 400 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          margin: 10,
                          textAlign: "justify",
                          position: "relative",
                        }}
                      >
                        <p style={{ fontSize: 18, fontWeight: "bold" }}>
                          {res[1]}
                        </p>
                        <p>{res[2]}</p>
                        <Card.Link
                          href={res[0]}
                          style={{
                            position: "absolute",
                            right: 0,
                            top: 350,
                            color: "black",
                          }}
                        >
                          Read More
                        </Card.Link>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </>
        ) : (
          <center>
            <Card style={{ width: 500 }}>
              <Card.Body>
                <h4>No News Found</h4>
              </Card.Body>
            </Card>
          </center>
        )}

        <Modal
          show={this.state.showFilterModal}
          onHide={() => {
            this.setState({ showFilterModal: false });
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Category
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={12} sm={6} md={3} lg={3}>
                <center
                  style={{ cursor: "pointer" }}
                  onClick={async () => {
                    await this.setType("trending");
                    await this.setState({
                      title: "Trending",
                      showFilterModal: false,
                    });
                  }}
                >
                  <Image height={100} width={100} src="./assets/trending.png" />
                  <p>Trending</p>
                </center>
              </Col>
              <Col xs={12} sm={6} md={3} lg={3}>
                <center
                  style={{ cursor: "pointer" }}
                  onClick={async () => {
                    await this.setType("india");
                    await this.setState({
                      title: "National",
                      showFilterModal: false,
                    });
                  }}
                >
                  <Image height={100} width={100} src="./assets/nat.jpeg" />
                  <p>National</p>
                </center>
              </Col>
              <Col xs={12} sm={6} md={3} lg={3}>
                <center
                  style={{ cursor: "pointer" }}
                  onClick={async () => {
                    await this.setType("tamil+nadu");
                    await this.setState({
                      title: "State",
                      showFilterModal: false,
                    });
                  }}
                >
                  <Image height={100} width={100} src="./assets/state.png" />
                  <p>State</p>
                </center>
              </Col>
              <Col xs={12} sm={6} md={3} lg={3}>
                <center
                  style={{ cursor: "pointer" }}
                  onClick={async () => {
                    await this.setType("international");
                    await this.setState({
                      title: "International",
                      showFilterModal: false,
                    });
                  }}
                >
                  <Image height={100} width={100} src="./assets/inter.jpg" />
                  <p>International</p>
                </center>
              </Col>
              <Col xs={12} sm={6} md={3} lg={3}>
                <center
                  style={{ cursor: "pointer" }}
                  onClick={async () => {
                    await this.setType("finance");
                    await this.setState({
                      title: "Finance",
                      showFilterModal: false,
                    });
                  }}
                >
                  <Image height={100} width={100} src="./assets/fin.jpg" />
                  <p>Finance</p>
                </center>
              </Col>
              <Col xs={12} sm={6} md={3} lg={3}>
                <center
                  style={{ cursor: "pointer" }}
                  onClick={async () => {
                    await this.setType("business");
                    await this.setState({
                      title: "Business",
                      showFilterModal: false,
                    });
                  }}
                >
                  <Image height={100} width={100} src="./assets/bus.jpg" />
                  <p>Business</p>
                </center>
              </Col>
              <Col xs={12} sm={6} md={3} lg={3}>
                <center
                  style={{ cursor: "pointer" }}
                  onClick={async () => {
                    await this.setType("sports");
                    await this.setState({
                      title: "Sports",
                      showFilterModal: false,
                    });
                  }}
                >
                  <Image height={100} width={100} src="./assets/spo.jpg" />
                  <p>Sports</p>
                </center>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                this.setState({
                  showFilterModal: false,
                });
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
