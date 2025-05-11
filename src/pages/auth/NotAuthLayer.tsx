import {useOutlet} from "react-router";
import './NotAuthLayer.css'

export function NotAuthLayer() {
    const outlet = useOutlet()
    return <div className='auth-container'><div className='form-container'>{outlet}</div></div>
}