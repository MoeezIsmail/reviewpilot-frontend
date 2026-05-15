import styled, { css } from 'styled-components';

const dark = {
    base: '#06061a',
    c1:  'rgb(99,102,241)',
    c2:  'rgb(79,70,229)',
    c3:  'rgb(129,120,255)',
    c4:  'rgb(139,92,246)',
    c5:  'rgb(59,130,246)',
    c6:  'rgb(168,85,247)',
    c7:  'rgb(124,58,237)',
    c8:  'rgb(109,40,217)',
    c9:  'rgb(147,51,234)',
    c10: 'rgb(196,181,253)',
    c11: 'rgb(167,139,250)',
    c12: 'rgb(109,110,252)',
};

const light = {
    base: '#f0eeff',
    c1:  'rgba(99,102,241,0.6)',
    c2:  'rgba(79,70,229,0.55)',
    c3:  'rgba(129,120,255,0.55)',
    c4:  'rgba(139,92,246,0.55)',
    c5:  'rgba(59,130,246,0.5)',
    c6:  'rgba(168,85,247,0.55)',
    c7:  'rgba(124,58,237,0.55)',
    c8:  'rgba(109,40,217,0.5)',
    c9:  'rgba(147,51,234,0.5)',
    c10: 'rgba(196,181,253,0.6)',
    c11: 'rgba(167,139,250,0.6)',
    c12: 'rgba(109,110,252,0.55)',
};

const patternCss = (c) => css`
    background: ${c.base};
    background-image:
        radial-gradient(4px 100px at 0px 235px,   ${c.c1},  #0000),
        radial-gradient(4px 100px at 300px 235px, ${c.c2},  #0000),
        radial-gradient(1.5px 1.5px at 150px 117.5px, ${c.c3} 100%, #0000 150%),

        radial-gradient(4px 100px at 0px 252px,   ${c.c4},  #0000),
        radial-gradient(4px 100px at 300px 252px, ${c.c5},  #0000),
        radial-gradient(1.5px 1.5px at 150px 126px,   ${c.c6} 100%, #0000 150%),

        radial-gradient(4px 100px at 0px 150px,   ${c.c1},  #0000),
        radial-gradient(4px 100px at 300px 150px, ${c.c4},  #0000),
        radial-gradient(1.5px 1.5px at 150px 75px,    ${c.c12} 100%, #0000 150%),

        radial-gradient(4px 100px at 0px 253px,   ${c.c7},  #0000),
        radial-gradient(4px 100px at 300px 253px, ${c.c2},  #0000),
        radial-gradient(1.5px 1.5px at 150px 126.5px, ${c.c1} 100%, #0000 150%),

        radial-gradient(4px 100px at 0px 204px,   ${c.c9},  #0000),
        radial-gradient(4px 100px at 300px 204px, ${c.c4},  #0000),
        radial-gradient(1.5px 1.5px at 150px 102px,   ${c.c3} 100%, #0000 150%),

        radial-gradient(4px 100px at 0px 134px,   ${c.c1},  #0000),
        radial-gradient(4px 100px at 300px 134px, ${c.c8},  #0000),
        radial-gradient(1.5px 1.5px at 150px 67px,    ${c.c6} 100%, #0000 150%),

        radial-gradient(4px 100px at 0px 179px,   ${c.c1},  #0000),
        radial-gradient(4px 100px at 300px 179px, ${c.c5},  #0000),
        radial-gradient(1.5px 1.5px at 150px 89.5px,  ${c.c4} 100%, #0000 150%),

        radial-gradient(4px 100px at 0px 299px,   ${c.c2},  #0000),
        radial-gradient(4px 100px at 300px 299px, ${c.c3},  #0000),
        radial-gradient(1.5px 1.5px at 150px 149.5px, ${c.c1} 100%, #0000 150%),

        radial-gradient(4px 100px at 0px 215px,   ${c.c6},  #0000),
        radial-gradient(4px 100px at 300px 215px, ${c.c4},  #0000),
        radial-gradient(1.5px 1.5px at 150px 107.5px, ${c.c3} 100%, #0000 150%),

        radial-gradient(4px 100px at 0px 281px,   ${c.c10}, #0000),
        radial-gradient(4px 100px at 300px 281px, ${c.c2},  #0000),
        radial-gradient(1.5px 1.5px at 150px 140.5px, ${c.c1} 100%, #0000 150%),

        radial-gradient(4px 100px at 0px 158px,   ${c.c1},  #0000),
        radial-gradient(4px 100px at 300px 158px, ${c.c4},  #0000),
        radial-gradient(1.5px 1.5px at 150px 79px,    ${c.c6} 100%, #0000 150%),

        radial-gradient(4px 100px at 0px 210px,   ${c.c1},  #0000),
        radial-gradient(4px 100px at 300px 210px, ${c.c11}, #0000),
        radial-gradient(1.5px 1.5px at 150px 105px,   ${c.c3} 100%, #0000 150%);
`;

const StyledWrapper = styled.div`
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden;

    .pattern {
        position: absolute;
        inset: 0;
        transition: background 0.4s;
        background: ${props => props.$isDark ? dark.base : light.base};
    }

    .pattern::before {
        content: "";
        position: absolute;
        inset: -145%;
        rotate: -45deg;
        ${props => patternCss(props.$isDark ? dark : light)}
        background-size:
            300px 235px, 300px 235px, 300px 235px,
            300px 252px, 300px 252px, 300px 252px,
            300px 150px, 300px 150px, 300px 150px,
            300px 253px, 300px 253px, 300px 253px,
            300px 204px, 300px 204px, 300px 204px,
            300px 134px, 300px 134px, 300px 134px,
            300px 179px, 300px 179px, 300px 179px,
            300px 299px, 300px 299px, 300px 299px,
            300px 215px, 300px 215px, 300px 215px,
            300px 281px, 300px 281px, 300px 281px,
            300px 158px, 300px 158px, 300px 158px,
            300px 210px, 300px 210px, 300px 210px;
        animation: authPattern 150s linear infinite;
    }

    @keyframes authPattern {
        0% {
            background-position:
                0px 220px,    3px 220px,    151.5px 337.5px,
                25px 24px,    28px 24px,    176.5px 150px,
                50px 16px,    53px 16px,    201.5px 91px,
                75px 224px,   78px 224px,   226.5px 350.5px,
                100px 19px,   103px 19px,   251.5px 121px,
                125px 120px,  128px 120px,  276.5px 187px,
                150px 31px,   153px 31px,   301.5px 120.5px,
                175px 235px,  178px 235px,  326.5px 384.5px,
                200px 121px,  203px 121px,  351.5px 228.5px,
                225px 224px,  228px 224px,  376.5px 364.5px,
                250px 26px,   253px 26px,   401.5px 105px,
                275px 75px,   278px 75px,   426.5px 180px;
        }
        to {
            background-position:
                0px 6800px,    3px 6800px,    151.5px 6917.5px,
                25px 13632px,  28px 13632px,  176.5px 13758px,
                50px 5416px,   53px 5416px,   201.5px 5491px,
                75px 17175px,  78px 17175px,  226.5px 17301.5px,
                100px 5119px,  103px 5119px,  251.5px 5221px,
                125px 8428px,  128px 8428px,  276.5px 8495px,
                150px 9876px,  153px 9876px,  301.5px 9965.5px,
                175px 13391px, 178px 13391px, 326.5px 13540.5px,
                200px 14741px, 203px 14741px, 351.5px 14848.5px,
                225px 18770px, 228px 18770px, 376.5px 18910.5px,
                250px 5082px,  253px 5082px,  401.5px 5161px,
                275px 6375px,  278px 6375px,  426.5px 6480px;
        }
    }
`;

const AuthBackground = ({ isDark }) => (
    <StyledWrapper $isDark={isDark}>
        <div className="pattern" />
    </StyledWrapper>
);

export default AuthBackground;
