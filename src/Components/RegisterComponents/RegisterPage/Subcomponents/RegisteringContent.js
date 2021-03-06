import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import BackButton from "./BackButton";
import ContinueButton from "./ContinueButton";
import AddressQuestion from "../../QuestionsComponents/addressQuestion";
import CampusQuestion from "../../QuestionsComponents/campusQuestion";
import CheckboxQuestion from "../../QuestionsComponents/checkboxQuestion";
import DateQuestion from "../../QuestionsComponents/dateQuestion";
import EmailQuestion from "../../QuestionsComponents/emailQuestion";
import GenderQuestion from "../../QuestionsComponents/genderQuestion";
import NameQuestion from "../../QuestionsComponents/nameQuestion";
import PhoneQuestion from "../../QuestionsComponents/PhoneQuestion";
import RadioQuestion from "../../QuestionsComponents/radioQuestion";
import SelectQuestion from "../../QuestionsComponents/selectQuestion";
import TextAreaQuestion from "../../QuestionsComponents/textAreaQuestion";
import TextQuestion from "../../QuestionsComponents/textQuestion";
import YearQuestion from "../../QuestionsComponents/yearQuestion";
import NumberQuestion from "../../QuestionsComponents/NumberQuestion";
import ParagraphContent from "../../QuestionsComponents/ParagraphContent";

const RegisteringContent = ({
  pageData,
  match,
  currentData,
  history,
  conference
}) => {
  const [hasLoaded, changeHasLoaded] = useState(false);

  useEffect(() => {
    if (conference.name !== null) {
      document.title = `${
        conference.name
      } - Register | Event Registration Tool`;
    }
  }, [conference.name]);

  useEffect(() => {
    changeHasLoaded(true);
  }, [currentData, hasLoaded, pageData]);

  const filterCurrentRegistrant = currentData => {
    const data = currentData.registrants.filter(
      registrant => registrant.id === match.params.regID
    );

    return data;
  };

  const renderAnswerBlocks = (blocks, currentData) => {
    if (currentData.primaryRegistrantId !== "") {
      const currentUser = filterCurrentRegistrant(currentData);

      const answerValue = currentUser[0].answers.filter(
        answer => answer.blockId === blocks.id
      );

      switch (blocks.type) {
        case "nameQuestion":
          return (
            <NameQuestion
              key={blocks.id}
              blockData={blocks}
              answer={answerValue[0]}
              currentUser={currentUser}
            />
          );
        case "emailQuestion":
          return (
            <EmailQuestion
              key={blocks.id}
              blockData={blocks}
              answer={answerValue[0]}
              currentUser={currentUser}
            />
          );

        case "addressQuestion":
          return (
            <AddressQuestion
              key={blocks.id}
              blockData={blocks}
              answer={answerValue[0]}
              currentUser={currentUser}
            />
          );
        case "campusQuestion":
          return (
            <CampusQuestion
              key={blocks.id}
              blockData={blocks}
              answer={answerValue[0]}
              currentUser={currentUser}
            />
          );
        case "checkboxQuestion":
          return (
            <CheckboxQuestion
              key={blocks.id}
              blockData={blocks}
              answer={answerValue[0]}
              currentUser={currentUser}
            />
          );
        case "dateQuestion":
          return (
            <DateQuestion
              key={blocks.id}
              blockData={blocks}
              answer={answerValue[0]}
              currentUser={currentUser}
            />
          );
        case "genderQuestion":
          return (
            <GenderQuestion
              key={blocks.id}
              blockData={blocks}
              answer={answerValue[0]}
              currentUser={currentUser}
            />
          );
        case "numberQuestion":
          return (
            <NumberQuestion
              key={blocks.id}
              blockData={blocks}
              answer={answerValue[0]}
              currentUser={currentUser}
            />
          );
        case "phoneQuestion":
          return (
            <PhoneQuestion
              key={blocks.id}
              blockData={blocks}
              answer={answerValue[0]}
              currentUser={currentUser}
            />
          );
        case "radioQuestion":
          return (
            <RadioQuestion
              key={blocks.id}
              blockData={blocks}
              answer={answerValue[0]}
              currentUser={currentUser}
            />
          );
        case "selectQuestion":
          return (
            <SelectQuestion
              key={blocks.id}
              blockData={blocks}
              answer={answerValue[0]}
              currentUser={currentUser}
            />
          );
        case "textareaQuestion":
          return (
            <TextAreaQuestion
              key={blocks.id}
              blockData={blocks}
              answer={answerValue[0]}
              currentUser={currentUser}
            />
          );
        case "textQuestion":
          return (
            <TextQuestion
              key={blocks.id}
              blockData={blocks}
              answer={answerValue[0]}
              currentUser={currentUser}
            />
          );
        case "yearInSchoolQuestion":
          return (
            <YearQuestion
              key={blocks.id}
              blockData={blocks}
              answer={answerValue[0]}
              currentUser={currentUser}
            />
          );
        case "paragraphContent":
          return <ParagraphContent key={blocks.id} blockData={blocks} />;
        default:
          return <div key={blocks.id} />;
      }
    }
  };

  return match.params.pageID === pageData.id ? (
    <div>
      <TitleContainer>
        <WelcomeTitle>{pageData.title}</WelcomeTitle>
      </TitleContainer>
      <form>
        {pageData.blocks.map(answerBlock =>
          renderAnswerBlocks(answerBlock, currentData)
        )}
      </form>
      <ButtonContainer>
        <BackButton history={history} match={match} conference={conference} />
        <ContinueButton
          history={history}
          match={match}
          conference={conference}
        />
      </ButtonContainer>
    </div>
  ) : null;
};

export default RegisteringContent;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const WelcomeTitle = styled.h2`
  color: #00a651;
  font-size: 28px;
  margin-top: 5px;
`;

const TitleContainer = styled.div`
  border-bottom: 2px solid #e9e9e9;
  padding-bottom: 4px;
  margin-bottom: 22px;
`;
