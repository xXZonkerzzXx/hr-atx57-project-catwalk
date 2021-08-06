import React, { useState, useEffect } from 'react';
import { Rating, Box } from '@material-ui/core';
import axios from 'axios';
import config from '../../config.js';
import { Modal, ModalBody, CloseButton, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';


const WriteReviewForm = function (props) {
  const [validated, setValidated] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [hover, setHover] = useState(0);
  const [showModal, setShowModal] = useState(props.showWriteReview);
  const [recommended, setRecommended] = useState(false);
  const [charRating, setCharRating] = useState({});
  const [reviewSummary, setReviewSummary] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [files, setFiles] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      headers: config,
      baseURL: "https://app-hrsei-api.herokuapp.com/api/fec2/hratx/",
    };
    var newReviewData = {
      product_id: props.currentItemId,
      rating: ratingValue,
      summary: reviewSummary,
      body: reviewBody,
      recommend: recommended,
      name: nickname,
      email: email,
      photos: files,
      characteristics: charRating
    }
    axios.post('/reviews', newReviewData, data)
      .then((response) => {
        console.log('Review posted');
      })
      .catch((err) => {
        console.log(typeof newReviewData.recommend);
        console.error(err);
      })
  };

  useEffect(() => {
    setShowModal(props.showWriteReview);
  });
  const labels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good',
    5: 'Great'
  };

  const getFiles = (obj) => {
    var files = [];
    for (var index in obj) {
      if (Number(index) <= obj.length - 1) {
        files.push(obj[index].name);
      }
    }
    return files;
  }

  const ProductChars = Object.keys(props.characteristics);

  return (
    <Modal show={showModal}>
      <ModalHeader>
        Write a new review
        <CloseButton onClick={props.onCloseClick}>X</CloseButton>
      </ModalHeader>
      <ModalBody>

        <Form validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group as={Col} required={true}>
                <Rating
                  style={{display: 'inline-block'}}
                  name="new-review-rating"
                  size="large"
                  precision={1}
                  onClick={(event) => {
                    setRatingValue(Number(event.target.value));
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}

                /> {ratingValue !== null && <Box style={{display: 'inline-block'}}ml={2}>{labels[hover !== -1 ? hover : ratingValue]}</Box>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>
                Do you recommended this product?
                </Form.Label>
                <Form.Check
                  type="radio"
                  label="yes"
                  name="recommended"
                  value={true}
                  onChange={() => {
                    setRecommended(true);
                  }}
                />
                <Form.Check
                  type="radio"
                  label="no"
                  name="recommended"
                  value={false}
                  onClick={(event) => {
                    setRecommended(false);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row id="new-review-product-characteristics">
            {ProductChars.map((char, i) => {
              return (
                <Col key={i}>
                  <Form.Group>
                    <Form.Label>
                      {char}
                    </Form.Label>
                    {props.chars[char].map((propChar, index) => {
                      return (
                        <Form.Check
                          key={index}
                          type="radio"
                          label={propChar.label}
                          name={char}
                          value={(index + 1)}
                          onChange={(event) => {
                            var characteristicId = (props.characteristics[char].id);
                            console.log(typeof characteristicId)
                            setCharRating({ ...charRating, [characteristicId]: Number(event.target.value)});
                          }}
                        />
                      );
                    })}
                    <br></br>
                  </Form.Group>
                </Col>
              );
            }
            )}
          </Row>
          <Row>
            <Form.Label>
              Review Summary
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Example: Best purchase ever!"
              maxLength="60"
              onChange={(event) => {
                setReviewSummary(event.target.value);
              }}
            />
          </Row>
          <Row>
            <Form.Label>
              Review Body
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Why did you like the product or not?"
              maxLength="1000"
              minLength="50"
              onChange={(event) => {
                setReviewBody(event.target.value);
              }}
            />
          </Row>
          <Row>
            <Form.Label>
              Upload Photos of your product
            </Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(event) => {
                console.log(event)
                setFiles(getFiles(event.target.files))
              }}
              />
          </Row>
          <Row>
            <Form.Label>
              Nickname
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Example: jackson11!"
              maxLength="60"
              onChange={(event) => {
                setNickname(event.target.value);
              }}
            />
          </Row>
          <Row>
            <Form.Label>
              Email Address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Example: jackson11@email.com"
              maxLength="60"
              onChange={(event) => {
                if (event.target.validity.valid) {
                  setEmail(event.target.value);
                }
              }}
            />
          </Row>
          <Row>
            <Button variant="outline-dark" type='submit'>Submit your review</Button>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default WriteReviewForm;
