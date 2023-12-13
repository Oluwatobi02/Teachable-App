import blueLogo from '../images/teachable-logo-blue.png';
import orangeLogo from '../images/teachable-logo-orange.png';


const Nav = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => {
 
    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }

  return (
    <nav>
        <div className="logo-container">
            <img className="logo" src={minimal ? orangeLogo : blueLogo} alt="Logo" />
        </div>

        {!authToken && !minimal && <button 
        className="nav-button" 
        onClick={handleClick}
        disabled={showModal}>Log in</button>}
    </nav>
  )
}

export default Nav;