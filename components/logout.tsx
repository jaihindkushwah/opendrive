import { cn } from "@/lib/utils";
import { userService } from "@/services/user.service";

export interface LogoutBtnProps
  extends React.HTMLAttributes<HTMLButtonElement> {}


export const LogoutBtn: React.FC<LogoutBtnProps> = ({ children,className,...props }) => {
  const logout = async () => {
    try {
      const data = await userService.logout();
      window.history.go(0);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      {...props}
      className={cn(
        "bg-slate-200 text-black px-3 py-1 cursor-pointer",
        className
      )}
      onClick={() => logout()}
    >
      {children ?? "Logout"} 
    </button>
  );
};
