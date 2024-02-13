import React, { useEffect, useState } from "react";
import "./App.css";

const useTick = (freq: number, enabled: boolean = true) => {
    const [tick, setTick] = useState(0);

    useEffect(() => {
        let timer: number;
        if (enabled) {
            timer = setTimeout(() => {
                setTick((tick + 1));
            }, freq);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [tick, enabled]);

    return tick
}

const ClippingDot: React.FC<{ freq?: number; delay?: number; hide: number }> = ({
  freq = 600,
  delay = 0,
    hide
}) => {
  const [delayTerminate, setDelayTerminate] = useState(false);
  const tick = useTick(freq, delayTerminate);
  const relativeTick = tick % 5;

  useEffect(() => {
    if (!delayTerminate) {
      setTimeout(() => setDelayTerminate(true), delay);
    }
  }, [tick]);

  if (!delayTerminate || tick >= hide) {
    return null;
  }

  const dot1Displayed = relativeTick === 0 || relativeTick === 1 || relativeTick === 2;
  const dot2Displayed = relativeTick === 1 || relativeTick === 2 || relativeTick === 3;
  const dot3Displayed = relativeTick === 2 || relativeTick === 3 || relativeTick === 4;

  return (
    <>
      <span style={{ opacity: dot1Displayed ? 1 : 0 }}>.</span>
      <span style={{ opacity: dot2Displayed ? 1 : 0 }}>.</span>
      <span style={{ opacity: dot3Displayed ? 1 : 0 }}>.</span>
    </>
  );
};

const getDisplayedText = (text: string, tick: number) => {
        return text.slice(0,tick)
}

const ProgressiveDisplay: React.FC<{ text: string }> = ({text}) => {
  const tick =  useTick(60);
  const displayedText = getDisplayedText(text, tick);

  return <>{displayedText}</>;
};

export const App = () => {
  const tick = useTick(500);
  const content = ['Connecting', 'Securing transmission', 'Applying inbound interferences'];

  return (
    <div className="App">
      <code>
        <pre>
            <p>
                <ProgressiveDisplay text="Connecting" />
                <ClippingDot delay={("Connecting".length + 1) * 60} hide={6} />
            </p>
            {tick > 3 ? <p>
                <ProgressiveDisplay text="Securing transmission" />
                <ClippingDot delay={("Securing transmission".length + 1) * 60} hide={3} />
            </p> : null}
            {tick > 8 ? <p>
                <ProgressiveDisplay text="Segfaut. Have you tried turning it off and on again?" />
                <ClippingDot delay={("Applying inbound interferences".length + 1) * 60} hide={3} />
            </p> : null}
            {tick > 18 ? <p>
                <ProgressiveDisplay text="Knock knock Neo" />
                <ClippingDot delay={("Applying inbound interferences".length + 1) * 60} hide={3} />
            </p> : null}
            {tick > 25 ? <p>
                <ProgressiveDisplay text="I am root" />
                <ClippingDot delay={("Applying inbound interferences".length + 1) * 60} hide={30000} />
            </p> : null}
        </pre>
      </code>
    </div>
  );
};
