import QuestionCard from "../components/QuestionCard";
import "../styles/Questions.css";
import Food from "../images/Food.jpg";
import BottomNavigation from "../components/BottomNavigation";
import Appbar from "../components/Appbar";
import { useStateContex } from "../store/StateProvider";


function Questions() {
  const { darkMode } = useStateContex()
  return (
    <div className={` questions ${darkMode && "questionsDark"}`}>
      <Appbar /> 

      <div className="ques__category">
        <div className="ques__cateBtn">
          <p>All</p>
        </div>
        <div className="ques__cateBtn">
          <p>Pscychology</p>
        </div>
        <div className="ques__cateBtn">
          <p>Electrical Engineering</p>
        </div>
        <div className="ques__cateBtn">
          <p>Finance</p>
        </div>
        <div className="ques__cateBtn">
          <p>Finance</p>
        </div>
        <div className="ques__cateBtn">
          <p>Physics</p>
        </div>
        <div className="ques__cateBtn">
          <p>Python</p>
        </div>
        <div className="ques__cateBtn">
          <p>Chemistry</p>
        </div>
        <div className="ques__cateBtn">
          <p>Health</p>
        </div>
        <div className="ques__cateBtn">
          <p>Marketing</p>
        </div>
      </div>
      <div className="questions__body">
        
        <QuestionCard
          answersBox
          answer
          noOfAnswer={2}
          noOfShare={3}
          noOfFollow={6}
          question="Why are sex-linked diseases more
                    prevalent in males than in females"
          groupName="Genetics"
          timestamp="2 min ago"
          image={Food}
        />
        <QuestionCard
          answersBox
          answer
          noOfAnswer={2}
          noOfShare={3}
          noOfFollow={6}
          question="Why are sex-linked diseases more
                    prevalent in males than in females"
          groupName="Genetics"
          timestamp="2 min ago"
          image={Food}
        />
        <QuestionCard
          answersBox
          answer
          noOfAnswer={2}
          noOfShare={3}
          noOfFollow={6}
          question="Why are sex-linked diseases more
                    prevalent in males than in females"
          groupName="Genetics"
          timestamp="2 min ago"
          image={Food}
        />
        <QuestionCard
          answersBox
          answer
          noOfAnswer={2}
          noOfShare={3}
          noOfFollow={6}
          question="Why are sex-linked diseases more
                    prevalent in males than in females"
          groupName="Genetics"
          timestamp="2 min ago"
          image={Food}
        />
        <QuestionCard
          answersBox
          answer
          noOfAnswer={2}
          noOfShare={3}
          noOfFollow={6}
          question="Why are sex-linked diseases more
                    prevalent in males than in females"
          groupName="Genetics"
          timestamp="2 min ago"
          image={Food}
        />
        <QuestionCard
          answersBox
          answer
          noOfAnswer={2}
          noOfShare={3}
          noOfFollow={6}
          question="Why are sex-linked diseases more
                    prevalent in males than in females"
          groupName="Genetics"
          timestamp="2 min ago"
          image={Food}
        />
        <QuestionCard
          answersBox
          answer
          noOfAnswer={2}
          noOfShare={3}
          noOfFollow={6}
          question="Why are sex-linked diseases more
                    prevalent in males than in females"
          groupName="Genetics"
          timestamp="2 min ago"
          image={Food}
        />
        <QuestionCard
          answersBox
          answer
          noOfAnswer={2}
          noOfShare={3}
          noOfFollow={6}
          question="Why are sex-linked diseases more
                    prevalent in males than in females"
          groupName="Genetics"
          timestamp="2 min ago"
          image={Food}
        />

      </div>
      <BottomNavigation />
    </div>
  );
}

export default Questions;
