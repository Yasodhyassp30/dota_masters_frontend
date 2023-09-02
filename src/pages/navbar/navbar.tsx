import { Home,SportsEsports,AccountCircle,List} from "@mui/icons-material";
import { Button } from "@mui/material";
import { useLocation } from 'react-router-dom';

export default function Navbar() {
    const buttonStyles = {
        marginTop: '1rem',
        color: 'white',
        borderRadius: '50%',
        height: '4rem',
        width: '4rem',
        fontSize: '0.4rem',
        flexDirection: 'column',
      };
      const location = useLocation();
      const buttons = [
        { icon: <SportsEsports />, label: 'predictor', path: '/dashboard' },
        { icon: <Home />, label: 'Hero Picker', path: '/hero-picker' },
        { icon: <List />, label: 'Matches', path: '/matches' },
        { icon: <AccountCircle />, label: 'User', path: '/user' },
      ];
      
      return (
        <div style={{
          height: '100%',
          width: '5rem',
        }}>
        <div style={{
                height: '100%',
                width: '5rem',
                backgroundColor: '	#5A5A5A',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
              }}>
          {buttons.map((button) => (
            <Button key={button.label} sx={{
              ...buttonStyles,
              backgroundColor: button.path === location.pathname ? 'black' : '',
            }} >
              {button.icon}
              {button.label}
            </Button>
          ))}
        </div>
        </div>
      )
}
