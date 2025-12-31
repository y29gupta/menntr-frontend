type FormHeaderProps = {
  title: string;
  onBack: () => void;
};

const FormHeader = ({ title, onBack }: FormHeaderProps) => {
  return (
    <div className="flex flex-col flex-shrink-0 gap-2">
      <button
        onClick={onBack}
        type="button"
        className="text-sm flex items-center gap-2 font-medium text-gray-600 hover:text-gray-900"
      >
        <span>
          <img src="/Go-back.svg" alt="goback" />
        </span>
        Go back
      </button>

      <h2 className="text-base sm:text-lg font-bold text-[#1A2C50]">{title}</h2>
    </div>
  );
};

export default FormHeader;
