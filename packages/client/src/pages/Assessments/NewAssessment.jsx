import React from 'react';
import { useForm } from 'react-hook-form';
import { Badge, Button, Col, Form, Row } from 'react-bootstrap';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const onSubmit = async (data) => {
    const score = Object.values(data.question).reduce((acc, val) => acc + parseInt(val), 0);
    const riskLevel = score > 3 ? `High` : score >= 2 ? `Medium` : `Low`;

    const currentTime = new Date().toISOString();

    const payload = {
      catDateOfBirth: data.catDOB,
      catName: data.catName,
      createdAt: currentTime,
      instrumentType: `Cat Behavioral Instrument`,
      riskLevel,
      score,
      updatedAt: currentTime,
    };
    // await console.log(payload);
    await AssessmentService.submit({ assessment: payload });
  };

  const { formState, handleSubmit, register } = useForm({
    defaultValues: {
      catDOB: `2025-05-02`,
      catName: `Tom`,
      question: {
        q1: `1`,
        q2: `0`,
        q3: `1`,
        q4: `0`,
        q5: `1`,
      },
    },
  });

  const { errors, isValid } = formState;
  // console.log(errors, `errors`);

  return (
    <div className="container mt-4">
      <h3>Cat Assessment Form</h3>
      <Form onSubmit={handleSubmit(onSubmit)} >
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="form-label" htmlFor="instrumentName">Instrument Name </Form.Label>
          <Col sm="10">
            <Form.Control type="text" id="instrumentName" value="Cat Behavioral Instrument" readOnly />
          </Col>
        </Form.Group>
        <h5>Cat Details</h5>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="form-label" htmlFor="catName" >Cat Name*</Form.Label>
          <Col sm="10">
            <Form.Control type="text" id="catName" {...register(`catName`, { required: `Cat Name is required` })} />
          </Col>
          <Form.Control.Feedback type="invalid">{errors.catName?.message}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="form-label" htmlFor="catDOB" >
            Cat DOB*
          </Form.Label>
          <Col sm="10">
            <Form.Control
              id="catDOB"
              type="date"
              {...register(`catDOB`, { required: `Date of Birth is required` })}
            />
          </Col>
          <p>{errors.catDOB?.message}</p>
        </Form.Group>

        <h5>Question & Responses</h5>
        <Form.Group className="mb-3">
          <Form.Check.Label
            htmlFor="question1">
            1. Is your cat has previous contact with the cat judicial system*
          </Form.Check.Label>
          <div className="ms-2 mt-1">
            <Form.Check
              inline
              label="No"
              id="question1-No"
              type="radio"
              value="0"
              {...register(`question.q1`, { required: `choose any of the options` })
              } />
            <Form.Check
              id="question1-Yes"
              type="radio"
              value="1"
              inline
              label="Yes"
              {...register(`question.q1`, { required: `choose any of the options` })}
            />
          </div>
          {/* <p>{errors.question?.q1.message}</p> */}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="question2">2. Does your cat has physical altercations with other cats*</Form.Label>
          <div className="ms-2">
            <Form.Check
              inline
              label="0-3 altercations"
              id="question2"
              type="radio"
              value="0"
              {...register(`question.q2`, { required: `choose any of the options` })}
            />
            <Form.Check
              inline
              label="3+ altercations"
              id="question2"
              type="radio"
              value="1"
              {...register(`question.q2`, { required: `choose any of the options` })}
            />
          </div>
        </Form.Group>
        {/* <p>{errors.question?.q2?.message}</p> */}

        <Form.Group className="mb-3">
          <Form.Label htmlFor="question3">
            3. Does your cat has physical altercations with owner (scratching,biting, etc..,)*
          </Form.Label>
          <div className="ms-2">
            <Form.Check
              inline
              label="10+ altercations"
              id="question3"
              type="radio"
              value="1"
              {...register(`question.q3`, { required: `choose any of the options` })}
            />
            <Form.Check
              inline
              label="0-10 altercations"
              id="question3"
              type="radio"
              value="0"
              {...register(`question.q3`, { required: `choose any of the options` })}
            />
          </div>
        </Form.Group>
        {/* <p>{errors.question?.q3?.message}</p> */}

        <Form.Group className="mb-3">
          <Form.Label htmlFor="question4">4. Is your cat playful with dogs*</Form.Label>
          <div className="ms-2">
            <Form.Check
              inline
              label="No"
              id="question4"
              type="radio"
              value="1"
              {...register(`question.q4`, { required: `choose any of the options` })} />
            <Form.Check
              inline
              label="Yes"
              id="question4"
              type="radio"
              value="0"
              {...register(`question.q4`, { required: `choose any of the options` })} />
          </div>
        </Form.Group>
        {/* <p>{errors.question?.q4?.message}</p> */}

        <Form.Group className="mb-3">
          <Form.Label htmlFor="question5">5. Does your cat hisses at strangers*</Form.Label>
          <div className="ms-2">
            <Form.Check
              inline
              label="Yes"
              id="question5"
              type="radio"
              value="1" {...register(`question.q5`, { required: `choose any of the options` })} />
            <Form.Check
              inline
              label="No"
              id="question5"
              type="radio"
              value="0" {...register(`question.q5`, { required: `choose any of the options` })} />
          </div>
        </Form.Group>
        {/* <p>{errors.question?.q5?.message}</p>
 */}
        <Button variant="primary" disabled={!isValid} type="submit" >Submit</Button>
      </Form>
    </div>
  );
};
