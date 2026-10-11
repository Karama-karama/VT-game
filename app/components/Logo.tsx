interface LogoProps {
  className?: string;
}
export function Logo({ className = "" }: LogoProps){
    return (
        <div className={`flex items-center justify-center h-[42px] w-[42px] bg-accent-foreground rounded-md ${className}`}>
            <span className="font-bold text-xl text-[#F1BE48]"> VT</span>
        </div>
    )
}           
       