"use client";
type questionProps = {
  question: String;
  ans: String;
};

const QuestionDropdown = (props: questionProps) => {
  const { question, ans } = props;
  return (
    <div className="collapse collapse-arrow bg-slate-800/80 rounded-none w-full">
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title text-2xl font-bold text-primary">
        {question}
      </div>
      <div className="collapse-content text-white bg-slate-900/30 p-4">
        <p>{ans}</p>
      </div>
    </div>
  );
};

export default QuestionDropdown;
