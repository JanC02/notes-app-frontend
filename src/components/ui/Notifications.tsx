import { useSelector } from "react-redux";
import type { RootState } from "../../store/store.ts";

export default function Notifications() {
    const notifications = useSelector((state: RootState) => state.notification.notifications)

    return <>
        {
            notifications.length > 0 && <ul className='z-1000 fixed right-1/2 translate-x-1/2 bottom-4 max-w-[calc(100%-2rem)] lg:right-4 lg:bottom-4 lg:translate-x-0 flex flex-col gap-y-2'>
                {
                    notifications.map((notification) => (
                        <li className="animate-entrance text-[#f7f7f7] p-3 rounded-md w-75 min-h-7 text-sm bg-emerald-500" key={notification.id}>{notification.message}</li>
                    ))
                }
            </ul>
        }
    </>
}