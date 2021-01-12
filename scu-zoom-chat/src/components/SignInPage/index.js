import AnonSignIn from '../AnonSignIn';
import GoogleSignIn from '../GoogleSignIn';
import withRouter from 'react-router'
import { withFirebase } from '../../api/Firebase';

const SignInPage =({firebase,setUsername,roomId,props})=>{

    if(firebase.user){
        props.history.push('/'+roomId);
    }

    return(
        <>
        <GoogleSignIn />
        <AnonSignIn setUsername={setUsername}/>
        </>
    )


}

export default withFirebase(SignInPage)