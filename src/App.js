import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { useState } from 'react';
import MultipleSelect from './DropDown';


const API_KEY ="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"

const communicationTones = [
  'Friendly and Approachable',
  'Respectful and Formal',
  'Professional and Businesslike',
  'Collaborative and Open',
  'Appreciative and Grateful',
  'Assertive and Confident',
  'Empathetic and Understanding',
  'Problem-Solving and Solution-Oriented',
  'Positive and Enthusiastic',
  'Humble and Open to Feedback',
  'Responsible and Accountable',
  'Time-Sensitive and Organized',
  'Adaptive and Flexible',
  'Ethical and Honest',
  'Inquisitive and Eager to Learn'
];

const letterWritingStyles = [
  'Formal',
  'Informal',
  'Professional',
  'Casual',
  'Business',
  'Personal',
  'Friendly',
  'Official',
  'Persuasive',
  'Respectful',
  'Direct',
  'Polite',
  'Thank You',
  'Apology',
  'Complaint',
  'Request',
  'Recommendation',
  'Introduction',
  'Acknowledgment',
  'Congratulatory'
];


function App() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [tone, setTone] = useState('')
  const [style, setStyle] = useState('');console.log(tone,"i am tone")
  const onSubmit = async() => {
    setLoading(true)
    const response = await aiApicall();
    console.log(response, "onsubmit")
    setResult(response.choices[0]?.message?.content)
    setLoading(false)
  };
  const aiApicall = async() => {
    const request = `${input}, in a ${tone} tone and in a ${style} manner.`;
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        { role: "system", content: "I'm a Student using ChatGPT for learning" },
        { role: "user", content: request },
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });
    return response.json()
  }
  const pressKey = (key) => {
    if(key == 'Enter'){
      onSubmit()
    }
  }
  return (
    <Container>
    <SectionLeft className="left-section">
    <Header>Letter Generator</Header>
        <Subheader>Enter your text below:</Subheader>
        {/* <Input onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>pressKey(e.key)} type="text" placeholder="Type your text here" /> */}
        <div class="form-group form-ripple">
          <small class="form-text">Describe your letter.</small>
        </div>
        <div class="form-group mt-4" >
          <textarea style={{width:"100%", height:"100px"}} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>pressKey(e.key)} class="form-control" id="maxlength2" placeholder="My limited textarea" maxlength="250"></textarea>
        </div>
        <div style={{display:'flex'}}>
          <MultipleSelect label={'Tone'} options={communicationTones} onSelect={setTone}/>
          <MultipleSelect label={'Style'} options={letterWritingStyles} onSelect={setStyle}/>
        </div>
        <button onClick={()=>onSubmit()}>on click</button>
    </SectionLeft>
    <Section className="right-section">
      <RightContent>
        <RightParagraph>
          {loading?"Loading...":result}
        </RightParagraph>
      </RightContent>
    </Section>
  </Container>
  );
}

const RightContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const RightParagraph = styled.p`
  white-space: pre-line;
  font-size: 16px;
`;
const Container = styled.div`
  display: flex;
  height: 100vh;
  @media (max-width: 768px) {
    flex-direction: column; 
  }
`;

const SectionLeft = styled.div`
  flex: 1;
  /* background-color: #959595; */
  @media (max-width: 768px) {
    flex: none; 
    width: 100%;
  }
`;

const Section = styled.div`
  flex: 1;
  overflow-y: auto;
  @media (max-width: 768px) {
    flex: none; 
    width: 100%; 
  }
`;

const Header = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Subheader = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;
const Input = styled.input`
  width: -webkit-fill-available;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;


export default App;
