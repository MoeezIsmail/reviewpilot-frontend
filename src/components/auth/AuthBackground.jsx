import styled from 'styled-components';

const StyledWrapper = styled.div`
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    background: ${props => props.$isDark ? '#03030d' : '#f4f0ff'};
    transition: background 0.6s;

    .orb {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        will-change: transform;
    }

    .orb-1 {
        width: 950px;
        height: 950px;
        top: -300px;
        left: -200px;
        background: ${props => props.$isDark
            ? 'radial-gradient(circle at 35% 35%, rgba(99,102,241,0.5) 0%, rgba(79,70,229,0.22) 35%, transparent 65%)'
            : 'radial-gradient(circle at 35% 35%, rgba(99,102,241,0.3) 0%, rgba(79,70,229,0.12) 40%, transparent 65%)'};
        filter: blur(72px);
        animation: orbFloat1 24s ease-in-out infinite;
    }

    .orb-2 {
        width: 780px;
        height: 780px;
        bottom: -230px;
        right: -170px;
        background: ${props => props.$isDark
            ? 'radial-gradient(circle at 55% 55%, rgba(168,85,247,0.55) 0%, rgba(139,92,246,0.24) 35%, transparent 65%)'
            : 'radial-gradient(circle at 55% 55%, rgba(168,85,247,0.22) 0%, rgba(139,92,246,0.1) 35%, transparent 65%)'};
        filter: blur(68px);
        animation: orbFloat2 30s ease-in-out infinite;
    }

    .orb-3 {
        width: 580px;
        height: 580px;
        top: 22%;
        right: 12%;
        background: ${props => props.$isDark
            ? 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(37,99,235,0.15) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)'};
        filter: blur(80px);
        animation: orbFloat3 20s ease-in-out infinite;
    }

    .orb-4 {
        width: 480px;
        height: 480px;
        top: 58%;
        left: 18%;
        background: ${props => props.$isDark
            ? 'radial-gradient(circle, rgba(192,132,252,0.35) 0%, rgba(147,51,234,0.14) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(192,132,252,0.16) 0%, transparent 70%)'};
        filter: blur(62px);
        animation: orbFloat4 27s ease-in-out infinite;
    }

    .grid {
        position: absolute;
        inset: 0;
        background-image:
            linear-gradient(${props => props.$isDark ? 'rgba(99,102,241,0.055)' : 'rgba(99,102,241,0.075)'} 1px, transparent 1px),
            linear-gradient(90deg, ${props => props.$isDark ? 'rgba(99,102,241,0.055)' : 'rgba(99,102,241,0.075)'} 1px, transparent 1px);
        background-size: 72px 72px;
        mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 15%, transparent 100%);
    }

    .vignette {
        position: absolute;
        inset: 0;
        background: ${props => props.$isDark
            ? 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(3,3,13,0.6) 100%)'
            : 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(244,240,255,0.45) 100%)'};
    }

    @keyframes orbFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25%       { transform: translate(75px, 55px) scale(1.06); }
        50%       { transform: translate(115px, 95px) scale(1.12); }
        75%       { transform: translate(55px, 135px) scale(1.05); }
    }

    @keyframes orbFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33%       { transform: translate(-95px, -75px) scale(1.09); }
        66%       { transform: translate(-55px, -115px) scale(1.04); }
    }

    @keyframes orbFloat3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50%       { transform: translate(-65px, 75px) scale(1.1); }
    }

    @keyframes orbFloat4 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50%       { transform: translate(75px, -65px) scale(1.14); }
    }
`;

const AuthBackground = ({ isDark }) => (
    <StyledWrapper $isDark={isDark}>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="grid" />
        <div className="vignette" />
    </StyledWrapper>
);

export default AuthBackground;
