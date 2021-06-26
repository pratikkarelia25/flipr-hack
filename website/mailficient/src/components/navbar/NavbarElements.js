import styled from 'styled-components'
import{Link as LinkR} from 'react-router-dom'

export const Nav = styled.nav`
background: #000;
height: 80px;
margin-top: -80px;
display: flex;
justify-content: centre;
align-items:center;
font-size: 1rem;
position:sticky;
top: 0;
z-index: 10;

@media screen and (max-width: 960px){
    transition: 0.8s all ease;
}
`
export const NavbarContainer= styled.div`
display: flex;
justify-content: centre;
height: 80px;
z-index: 10;
width: 100%;
padding: 0 24px;
max-width: 1100px;
`
export const NavLogo