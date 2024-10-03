import styled from "styled-components";

import avatar from "../../assets/images/avatar.png"


const ProfileImg = () => {

    return(
        <ProfileImgStyled>
            <img src={avatar} alt="profile" />

        </ProfileImgStyled>
    );
}

const ProfileImgStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 24px;
    top: 12px;
    z-index: 10000;

    img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }
`;

export default ProfileImg;