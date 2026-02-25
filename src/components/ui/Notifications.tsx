import { useSelector } from "react-redux";
import type { RootState } from "../../store/store.ts";

export default function Notifications() {
    const notifications = useSelector((state: RootState) => state.notification.notifications)

    return <>
        {
            notifications.length > 0 && <ul className='z-1000 fixed right-1/2 translate-x-1/2 bottom-0 w-full max-w-[calc(100%-2rem)] lg:max-w-100 lg:right-4 lg:translate-x-0 flex flex-col gap-y-2'>
                {
                    notifications.map((notification) => (
                        <li className={`animate-entrance text-[#f7f7f7] p-3 rounded-md w-full min-h-7 text-sm ${notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`} key={notification.id}>{notification.message}</li>
                    ))
                }
            </ul>
        }
    </>
}