import { useEffect } from 'react';
import { gsap } from 'gsap';

const TerminalCursor = () => {
  useEffect(() => {
    const cursor = document.getElementById('cursor-block');
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.05 });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.05 });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', onMove);

    // Blink
    const blink = gsap.to(cursor, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: 'steps(1)',
    });

    // Hover states
    const actionEls = document.querySelectorAll('button, a, [data-cursor="action"]');
    const inputEls = document.querySelectorAll('input, textarea, [data-cursor="input"]');
    const numberEls = document.querySelectorAll('[data-cursor="number"]');

    const onActionEnter = () => {
      blink.pause();
      gsap.to(cursor, { width: 20, opacity: 1, duration: 0.12 });
    };
    const onActionLeave = () => {
      blink.play();
      gsap.to(cursor, { width: 10, duration: 0.12 });
    };
    const onInputEnter = () => {
      blink.pause();
      gsap.to(cursor, { height: 2, width: 2, opacity: 1, duration: 0.12 });
    };
    const onInputLeave = () => {
      blink.play();
      gsap.to(cursor, { height: 18, width: 10, duration: 0.12 });
    };
    const onNumberEnter = () => {
      gsap.to(cursor, { backgroundColor: 'hsl(267 78% 72%)', duration: 0.12 });
    };
    const onNumberLeave = () => {
      gsap.to(cursor, { backgroundColor: 'hsl(82 95% 58%)', duration: 0.12 });
    };

    actionEls.forEach(el => {
      el.addEventListener('mouseenter', onActionEnter);
      el.addEventListener('mouseleave', onActionLeave);
    });
    inputEls.forEach(el => {
      el.addEventListener('mouseenter', onInputEnter);
      el.addEventListener('mouseleave', onInputLeave);
    });
    numberEls.forEach(el => {
      el.addEventListener('mouseenter', onNumberEnter);
      el.addEventListener('mouseleave', onNumberLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      blink.kill();
      actionEls.forEach(el => {
        el.removeEventListener('mouseenter', onActionEnter);
        el.removeEventListener('mouseleave', onActionLeave);
      });
      inputEls.forEach(el => {
        el.removeEventListener('mouseenter', onInputEnter);
        el.removeEventListener('mouseleave', onInputLeave);
      });
      numberEls.forEach(el => {
        el.removeEventListener('mouseenter', onNumberEnter);
        el.removeEventListener('mouseleave', onNumberLeave);
      });
    };
  }, []);

  return (
    <div
      id="cursor-block"
      style={{
        position: 'fixed',
        width: 10,
        height: 18,
        background: 'hsl(82 95% 58%)',
        borderRadius: 1,
        pointerEvents: 'none',
        zIndex: 9998,
        transform: 'translate(-50%, -50%)',
        top: 0,
        left: 0,
      }}
    />
  );
};

export default TerminalCursor;
