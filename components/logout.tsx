import { cn } from "@/lib/utils";
import { userService } from "@/services/user/service";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export interface LogoutBtnProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export const LogoutBtn: React.FC<LogoutBtnProps> = ({
  children,
  className,
  ...props
}) => {
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
    <Button
      variant="outline"
      {...props}
      className={cn("cursor-pointer", className)}
      onClick={() => logout()}
    >
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  );
};
