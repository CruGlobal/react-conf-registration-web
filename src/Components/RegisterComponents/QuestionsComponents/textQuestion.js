import React from "react";
import styled from "@emotion/styled";

export default class TextQuestion extends React.Component {
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
          placeholder="Enter Answer"
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

const Line = styled.input`
  margin-bottom: 1em;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
