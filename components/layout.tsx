import Sidebar from './sidebar'
// import Topbar from './topbar';
import styled from '@emotion/styled';

const MainWrapper = styled.div`
    background-color: #A8B0C9;
    width: 100%;
    height: 100vh; 
`

const SidebarStyled = styled(Sidebar)`
    float: left;
    width: 300px;
    height: 100vh;
    background: #EBF0F7;
`

const ContentAreaStyled = styled.div`
   float: left;
    width: calc(100% - 300px);
    height: 100vh;
    background: #FBFCFD;
`


export default ({children}:any) => {
    return (
        <div>
            <MainWrapper>
                <SidebarStyled />
                <ContentAreaStyled>{children}</ContentAreaStyled>
            </MainWrapper>   
        </div>
    )

}