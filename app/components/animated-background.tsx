const AnimatedBackground = () => {
  return (
    <svg className="h-full w-full absolute top-0" viewBox="0 0 100 100">
      <defs>
        <radialGradient
          id="Gradient1"
          cx="50%"
          cy="50%"
          fx="0%"
          fy="50%"
          r=".5"
        >
          <animate
            attributeName="fx"
            dur="34s"
            values="0%;10%;0%"
            repeatCount="indefinite"
          ></animate>
          <stop offset="0%" stopColor="rgba(255, 218, 185, 0.5)"></stop>
          <stop offset="90%" stopColor="rgba(255, 182, 193, 0.1)"></stop>
          <stop offset="100%" stopColor="rgba(255, 182, 193, 0)"></stop>
        </radialGradient>
        <radialGradient
          id="Gradient2"
          cx="50%"
          cy="50%"
          fx="0%"
          fy="50%"
          r=".5"
        >
          <animate
            attributeName="fx"
            dur="30s"
            values="0%;10%;0%"
            repeatCount="indefinite"
          ></animate>
          <stop offset="0%" stopColor="rgba(129, 202, 227, 0.5)"></stop>
          <stop offset="100%" stopColor="rgba(129, 202, 227, 0)"></stop>
        </radialGradient>
        <radialGradient
          id="Gradient3"
          cx="50%"
          cy="50%"
          fx="0%"
          fy="50%"
          r=".5"
        >
          <animate
            attributeName="fx"
            dur="27s"
            values="0%;100%;0%"
            repeatCount="indefinite"
          ></animate>
          <stop offset="0%" stopColor="rgba(234, 144, 251, 0.5)"></stop>
          <stop offset="100%" stopColor="rgba(234, 144, 251, 0)"></stop>
        </radialGradient>
      </defs>
      <rect
        x="13.744%"
        y="1.18473%"
        width="100%"
        height="100%"
        fill="url(#Gradient1)"
      >
        <animate
          attributeName="x"
          dur="20s"
          values="25%;0%;25%"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          dur="21s"
          values="0%;25%;0%"
          repeatCount="indefinite"
        ></animate>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="7s"
          repeatCount="indefinite"
        ></animateTransform>
      </rect>
      <rect
        x="-2.17916%"
        y="35.4267%"
        width="100%"
        height="100%"
        fill="url(#Gradient2)"
      >
        <animate
          attributeName="x"
          dur="23s"
          values="-25%;0%;-25%"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          dur="24s"
          values="0%;50%;0%"
          repeatCount="indefinite"
        ></animate>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="12s"
          repeatCount="indefinite"
        ></animateTransform>
      </rect>
      <rect
        x="9.00483%"
        y="14.5733%"
        width="100%"
        height="100%"
        fill="url(#Gradient3)"
      >
        <animate
          attributeName="x"
          dur="25s"
          values="0%;25%;50%;0%"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          dur="12s"
          values="0%;25%;0%;-25%;0%"
          repeatCount="indefinite"
        ></animate>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360 50 50"
          to="0 50 50"
          dur="9s"
          repeatCount="indefinite"
        ></animateTransform>
      </rect>
    </svg>
  );
};

export default AnimatedBackground;
