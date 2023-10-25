type questionProps = {
  question: String;
  ans: String;
};

const QuestionDropdown = (props: questionProps) => {
  const { question, ans } = props;
  return (
    <details className="collapse collapse-arrow rounded-none w-full">
      <summary className="collapse-title text-2xl font-bold text-primary bg-slate-900/80 ">
        {question}
      </summary>
      <div className="collapse-content text-white bg-slate-800/80  p-4">
        <p className="max-w-lg">{ans}</p>
      </div>
    </details>
  );
};

export default QuestionDropdown;
