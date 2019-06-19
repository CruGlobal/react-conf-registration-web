import React from "react";
import styled from "@emotion/styled";

const content = {
  title: "Text Test Question",
  default: "Enter Answer"
};

export default class TextAreaQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerBlock: {
        blockId: "",
        id: "",
        registrantId: "",
        value: ""
      }
    };
  }

  componentDidMount() {
    this.setState({
      blockData: this.props.blockData
    });
  }

  componentWillReceiveProps() {
    if (this.props.answer) {
      this.setState({
        answerBlock: this.props.answer
      });
    }
  }

  handleChange = event => {
    this.setState({
      answerBlock: {
        ...this.state.answerBlock,
        value: event.target.value
      }
    });
  };

  render() {
    return (
      <QuestionContainer>
        <Title>{this.props.blockData.title}</Title>
        <Line
          type="text"
          value={this.state.answerBlock.value}
          placeholder={content.default}
          onChange={this.handleChange}
        />
      </QuestionContainer>
    );
  }
}

const QuestionContainer = styled.div`
  background: white;
  display: flex;
  flex-direciton: row;
  flex-wrap: wrap;
  font-family: sans-serif;
  font-size: 14px;
  margin-bottom: 15px;
`;

const Title = styled.div`
  margin-bottom: 5px;
  width: 100%;
  font-weight: 700;
`;

const Line = styled.textarea`
  margin-bottom: 1em;
  padding: 6px 12px;
  width: 100%;
  border-radius: 4px;
  border-width: 1px;
  border-color: rgb(204, 204, 204);
`;
