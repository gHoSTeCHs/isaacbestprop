interface AchievementProp {
    title: string;
    descrpition: string;
}

const AchievementComponent: React.FC<AchievementProp> = ({title, descrpition}) => {
  return (
    <div className="bg-background-secondary p-1 rounded-lg"> 
        <div className="bg-background-primary flex flex-col gap-4 border border-border p-4 rounded-lg">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm text-txt">{descrpition}</p>
    </div>
    </div>
    
  )
}

export default AchievementComponent