interface StatProps {
  numbers: string;
  description: string;
  className?: string;
}

const Stat: React.FC<StatProps> = ({numbers, description, className =''}) => {
  return (
    <div className={`bg-background-secondary rounded-lg border border-border p-4 flex flex-col text-center ${className}`}>
      <h3 className="text-[24px] font-bold">{numbers}</h3>
      <p className="text-sm text-txt"> {description} </p>
    </div>
  );
};

export default Stat;
