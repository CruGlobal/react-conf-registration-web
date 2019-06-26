import React, { Component } from "react";
import styled from "@emotion/styled";
import Calendar from "react-calendar";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import UUIDController from "../../../Controllers/uuidcontroller";
const UUID = new UUIDController();
let newID = UUID.createUUID();

export default class dateQuestion extends Component {
  state = {
    valueChanged: false,
    answerBlock: {
      amount: 0,
      blockId: "",
      id: "",
      registrantId: "",
      value: ""
    },
    showModal: false,

    date: new Date()
  };

  componentDidMount() {
    this.setState({
      blockData: this.props.blockData
    });
    this.timer = setInterval(() => {
      if (this.state.valueChanged) {
        this.getCurrentRegistration(
          `https://api.stage.eventregistrationtool.com/eventhub-api/rest/answers/${
            this.state.answerBlock.id
          }`,
          localStorage.getItem("crsToken")
        );
      }
    }, 15000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentWillReceiveProps() {
    if (this.props.answer) {
      this.setState({
        answerBlock: this.props.answer
      });
    } else {
      this.setState({
        valueChanged: true,
        answerBlock: {
          ...this.state.answerBlock,
          blockId: this.props.blockData.id,
          id: newID,
          registrantId: this.props.currentUser[0].id,
          value: moment(this.state.date).format("YYYY-MM-D")
        }
      });
    }
  }

  onChange = date =>
    this.setState({
      valueChanged: true,
      date: date,
      answerBlock: {
        ...this.state.answerBlock,
        value: moment(date).format("YYYY-MM-D")
      }
    });

  changeShow(newShow) {
    this.setState({
      showModal: newShow
    });
  }

  getCurrentRegistration = (url, authToken) => {
    this.setState({
      valueChanged: false
    });
    return fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `${authToken}`
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(this.state.answerBlock)
    });
  };

  render() {
    return (
      <QuestionContainer>
        <Modal
          show={this.state.showModal}
          onHide={() => this.changeShow(false)}
        >
          <ModalBody>
            <Calendar onChange={this.onChange} value={this.state.date} />
          </ModalBody>
        </Modal>
        <Prompt>{this.props.blockData.title}</Prompt>
        <InputContainer onClick={() => this.changeShow(true)}>
          <CalendarButton>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </CalendarButton>
          <CalendarInput
            type="text"
            placeholder="Select a date..."
            value={moment(this.state.answerBlock.value).format("MMM D, YYYY")}
            readOnly={true}
          />
        </InputContainer>
      </QuestionContainer>
    );
  }
}

const ModalBody = styled(Modal.Body)`
  margin: 0 auto;
`;

const QuestionContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const CalendarButton = styled.span`
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CalendarInput = styled.input`
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  width: 100%;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  color: #555;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Prompt = styled.p`
  font-size: 14px;
  color: #333;
  font-weight: 700;
  margin: 0;
`;
