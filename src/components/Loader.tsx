export default function Loader() {
  return (
    <>
      <style>
        {`
        .container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: var(--uib-size);
          height: var(--uib-size);
        }

        .dot {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          height: 100%;
        }

        .dot::before {
          content: '';
          display: block;
          height: calc(var(--uib-size) * 0.22);
          width: calc(var(--uib-size) * 0.22);
          border-radius: 50%;
          background-color: var(--uib-color);
        }

        .dot:nth-child(1) {
          animation: leapFrog var(--uib-speed) ease infinite;
        }

        .dot:nth-child(2) {
          transform: translateX(calc(var(--uib-size) * 0.4));
          animation: leapFrog var(--uib-speed) ease calc(var(--uib-speed) / -1.5)
            infinite;
        }

        .dot:nth-child(3) {
          transform: translateX(calc(var(--uib-size) * 0.8)) rotate(0deg);
          animation: leapFrog var(--uib-speed) ease calc(var(--uib-speed) / -3) infinite;
        }

        @keyframes leapFrog {
          0% {
            transform: translateX(0) rotate(0deg);
          }

          33.333% {
            transform: translateX(0) rotate(180deg);
          }

          66.666% {
            transform: translateX(calc(var(--uib-size) * -0.4)) rotate(180deg);
          }

          99.999% {
            transform: translateX(calc(var(--uib-size) * -0.8)) rotate(180deg);
          }

          100% {
            transform: translateX(0) rotate(0deg);
          }
        }
        `}
      </style>
      <div
        class={"container"}
        style={{
          "--uib-size": 40 + "px",
          "--uib-color": "black",
          "--uib-speed": 2.5 + "s",
        }}
      >
        <div class={"dot"} />
        <div class={"dot"} />
        <div class={"dot"} />
      </div>
    </>
  )
}
