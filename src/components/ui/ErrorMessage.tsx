interface ErrorMessageProps {
    message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    return <div className='grow flex justify-center items-center'>
        <p className='text-[#404040] text-xl'>{message}</p>
    </div>
}