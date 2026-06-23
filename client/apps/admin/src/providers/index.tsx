import { Toast } from "@repo/ui/toast";
import { ReactQueryProvider } from "./react-query";
import { ToastList, toastManager } from "./toast";

type Props = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <>
      <Toast.Provider toastManager={toastManager}>
        <Toast.Portal>
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Toast.Viewport>
            <ToastList />
          </Toast.Viewport>
        </Toast.Portal>
      </Toast.Provider>
    </>
  );
};
